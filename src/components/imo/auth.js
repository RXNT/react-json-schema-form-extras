const ApplicationName = "EHR";
const URL = "/PMV2API/billing/authentication/AuthenticateExternalUser";
const SESSION_STORAGE_IMO_AUTH = "RxNT_IMO_SESSION_STORAGE_AUTH";

function credentials() {
  let ExternalDoctorCompanyId = `${window.parent.encounterTemplateV2User
    .DoctorCompanyId}`;
  let ExternalAppLoginId = `${window.parent.encounterTemplateV2EncounterInfo
    .LoggedInUserId}`;
  return {
    ApplicationName,
    ExternalDoctorCompanyId,
    ExternalAppLoginId,
  };
}

function authenticate() {
  let authReqBody = credentials();
  let req = new Request(URL, {
    method: "POST",
    headers: {
      RequestInfo: "####",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authReqBody),
  });
  return fetch(req).then(res => res.json());
}

function parseAuthObject(jsonData) {
  let authObj = {
    Token: jsonData.Login.AppLoginTokens[0].Token,
    Signature: jsonData.Login.AppLoginInfoes[0].Signature,
    DoctorCompanyId: jsonData.Login.DoctorCompanyId,
  };
  return authObj;
}

export default function auth() {
  if (sessionStorage && sessionStorage.getItem(SESSION_STORAGE_IMO_AUTH)) {
    let authObj = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_IMO_AUTH));
    return Promise.resolve(authObj);
  }
  return authenticate()
    .then(parseAuthObject)
    .then(authObj => {
      sessionStorage.setItem(SESSION_STORAGE_IMO_AUTH, JSON.stringify(authObj));
      return authObj;
    });
}
