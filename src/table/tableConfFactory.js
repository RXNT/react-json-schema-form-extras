import { deepCopy } from "../utils";

const POSITION_KEY = "_position";

const DEFAULT_TABLE_CONF = {
  cellEdit: {
    mode: "click",
    blurToSave: true,
  },
  options: {},
  keyBoardNav: {
    enterToEdit: true
  },
  handleConfirmDeleteRow: next => next(),
};

export function addPosition(data) {
  return data.map((el, i) => Object.assign({}, el, { [POSITION_KEY]: i }));
}

export function removePosition(data) {
  if (Array.isArray(data)) {
    return data.map(el => removePosition(el));
  } else {
    let dataCopy = Object.assign({}, data);
    delete dataCopy[POSITION_KEY];
    return dataCopy;
  }
}

export default function tableConfFrom(
  { table = {} },
  formData = [],
  afterSaveCell,
  afterDeleteRow
) {
  let { keyField = POSITION_KEY } = table;
  if (keyField === POSITION_KEY) {
    formData = addPosition(formData);
  }

  let tableConf = Object.assign(
    { data: formData },
    deepCopy(DEFAULT_TABLE_CONF),
    table,
    { keyField }
  );

  tableConf.cellEdit.afterSaveCell = afterSaveCell;
  tableConf.options.afterDeleteRow = afterDeleteRow;

  return tableConf;
}
