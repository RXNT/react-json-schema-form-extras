import tableConfFrom from "../../src/table/tableConfFactory";

test("configuration do not overlap", () => {
  let fConf = tableConfFrom({}, [], "first conf save", "first conf delete");
  let sConf = tableConfFrom({}, [], "second conf save", "second conf delete");

  expect(fConf).not.toEqual(sConf);
  expect(fConf.cellEdit.afterSaveCell).toEqual("first conf save");
  expect(fConf.options.afterDeleteRow).toEqual("first conf delete");

  expect(sConf.cellEdit.afterSaveCell).toEqual("second conf save");
  expect(sConf.options.afterDeleteRow).toEqual("second conf delete");
});
