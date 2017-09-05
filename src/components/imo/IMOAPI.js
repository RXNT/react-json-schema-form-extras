import selectn from "selectn";
/* global encounterTemplateV2User, encounterTemplateV2EncounterInfo */

const ApplicationName = "EHR";
const URL = "/PMV2API/billing/authentication/AuthenticateExternalUser";
const SESSION_STORAGE_IMO_AUTH = "RxNT_IMO_SESSION_STORAGE_AUTH";

function credentials() {
  let ExternalDoctorCompanyId = `${encounterTemplateV2User.DoctorCompanyId}`;
  let ExternalAppLoginId = `${encounterTemplateV2EncounterInfo.LoggedInUserId}`;
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
    return this.auth.then(authObj => {
      let body = Object.assign({}, authObj, queryObj);
      return fetch(url, {
        method: "POST",
        headers: {
          RequestInfo: `TestUser#TestPass#${authObj.DoctorCompanyId}#${authObj.Signature}#${authObj.Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    });
  };

  search = (query, { url, root, mapping }) => {
    return this.singAndFetch(url, { SearchQuery: query })
      .then(resp => resp.json())
      .then(json => this.parseOption(json, root, mapping));
  };

  searchDetails = (code, { url, root, mapping }) => {
    return this.singAndFetch(url, { LexicalItemCode: code })
      .then(resp => resp.json())
      .then(json => {
        let options = this.parseOption(json, root, mapping);
        let modifiers = this.parseModifiers(json);
        return { options, modifiers };
      });
  };
}
