import selectn from "selectn";
/* global encounterTemplateV2User, encounterTemplateV2EncounterInfo */

const ApplicationName = "EHR";
const URL = "/PMV2API/billing/authentication/AuthenticateExternalUser";
const SESSION_STORAGE_IMO_AUTH = "RxNT_IMO_SESSION_STORAGE_AUTH";

function credentials() {
  let user = JSON.parse(encounterTemplateV2User);
  let encInfo = JSON.parse(encounterTemplateV2EncounterInfo);
  let ExternalDoctorCompanyId = `${user.DoctorCompanyId}`;
  let ExternalAppLoginId = `${encInfo.LoggedInUserId}`;
  return {
    ApplicationName,
    ExternalDoctorCompanyId,
    ExternalAppLoginId,
  };
}

function parseAuthObject(jsonData) {
  let authObj = {
    Token: jsonData.Login.AppLoginTokens[0].Token,
    Signature: jsonData.Login.AppLoginInfoes[0].Signature,
    DoctorCompanyId: jsonData.Login.DoctorCompanyId,
  };
  return authObj;
}

function doAuth() {
  let authReqBody = credentials();
  let req = new Request(URL, {
    method: "POST",
    headers: {
      RequestInfo: "####",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authReqBody),
  });
  return fetch(req)
    .then(res => res.json())
    .then(parseAuthObject);
}

function auth() {
  if (sessionStorage && sessionStorage.getItem(SESSION_STORAGE_IMO_AUTH)) {
    let authObj = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_IMO_AUTH));
    return Promise.resolve(authObj);
  }
  return doAuth().then(authObj => {
    sessionStorage.setItem(SESSION_STORAGE_IMO_AUTH, JSON.stringify(authObj));
    return authObj;
  });
}

function cleanAuth() {
  sessionStorage.removeItem(SESSION_STORAGE_IMO_AUTH);
}

const SEARCH_MAPPING = {
  description: "title",
  icd10: "ICD10CM_CODE",
  icd10Description: "ICD10CM_TITLE",
  icd9: "kndg_code",
  snomed: "SCT_CONCEPT_ID",
  query: "code",
};

const DETAILS_MAPPING = {
  description: "HPCTitle",
  icd10: "ICD10Code",
  icd10Description: "ICD10Title",
  icd9: "ICD9Code",
  snomed: "SNOMEDCTCode",
  query: "code",
};

export default class IMOAPI {
  constructor() {
    this.auth = auth();
  }

  parseOption = (json, root, mapping) => {
    const isSelectable = option => option["POST_COORD_LEX_FLAG"] === "3";

    let options = selectn(root, json);
    let mappedOptions = options.map(option => {
      let mappedOption = Object.keys(mapping).reduce((agg, field) => {
        let respKey = mapping[field];
        agg[field] = option[respKey];
        return agg;
      }, {});
      mappedOption.selectable = isSelectable(option);
      mappedOption.modifiers = option.Modifiers
        ? option.Modifiers.split(",").map(m => m.trim())
        : [];
      return mappedOption;
    });
    return mappedOptions;
  };

  parseModifiers = json => {
    let modifiers = json.ModifierTypeList.map(modifier => {
      let name = modifier.tITLEField;
      let options = modifier.mODIFIERSField.map(option => {
        let code = option.mODIFIER_CODEField;
        let title = option.mODIFIER_TITLEField;
        return { code, title };
      });
      return { name, options };
    });
    return modifiers;
  };

  singAndFetch = (url, queryObj) => {
    return this.auth
      .then(authObj => {
        let body = Object.assign({}, authObj, queryObj);
        return fetch(url, {
          method: "POST",
          headers: {
            RequestInfo: `TestUser#TestPass#${authObj.DoctorCompanyId}#${authObj.Signature}#${authObj.Token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      })
      .then(resp => {
        if (resp.status === 401) {
          cleanAuth();
        }
        return resp.json();
      });
  };

  search = query => {
    return this.singAndFetch(
      "/IMOAPIServices/imo/problemit/LexicalSearchProblemIT",
      { SearchQuery: query }
    ).then(json =>
      this.parseOption(json, "IMOProblemIT.data.items", SEARCH_MAPPING)
    );
  };

  searchDetails = code => {
    return this.singAndFetch(
      "/IMOAPIServices/imo/problemit/LexicalDetailProblemIT",
      { LexicalItemCode: code }
    ).then(json => {
      let options = this.parseOption(
        json,
        "LexicalDetailList",
        DETAILS_MAPPING
      );
      let modifiers = this.parseModifiers(json);
      return { options, modifiers };
    });
  };
}
