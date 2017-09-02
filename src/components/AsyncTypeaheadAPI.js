import selectn from "selectn";

export function search(url, query, optionsMapping) {
  let authObj = {
    DoctorCompanyId: window.encounterTemplateV2User.DoctorCompanyId,
    Token: window.encounterTemplateV2User.AppLoginTokens[0].Token,
  };

  let body = Object.assign(authObj, { Name: query });
  return fetch(url, {
    method: "POST",
    headers: {
      RequestInfo: `TestUser#TestPass#${authObj.DoctorCompanyId}##${authObj.Token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(resp => resp.json())
    .then(json => (optionsMapping ? selectn(optionsMapping, json) : json));
}
