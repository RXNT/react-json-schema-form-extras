import selectn from "selectn";

/* global encounterTemplateV2User */
export function search(url, query, optionsMapping) {
  let user = JSON.parse(encounterTemplateV2User);
  let authObj = {
    DoctorCompanyId: user.DoctorCompanyId,
    Token: user.AppLoginTokens[0].Token,
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
