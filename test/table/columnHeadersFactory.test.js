import { overrideColDataFormat } from "../../src/table/columnHeadersFactory";

test("Create override function", () => {
  let colConf = {
    dataField: "drug",
    dataFormat: "drugName",
  };
  overrideColDataFormat(colConf);

  let dataF = colConf.dataFormat;
  expect(dataF({}, { drug: { drugName: "Ibuprophen" } })).toEqual("Ibuprophen");
  expect(dataF({}, { drug: { drugName: "Asprin" } })).toEqual("Asprin");
});
