const POSITION_KEY = "_position";

const DEFAULT_TABLE_CONF = {
  cellEdit: {
    mode: "click",
    blurToSave: true,
  },
  options: {},
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
  if (table.keyField === undefined || table.keyField === POSITION_KEY) {
    table.keyField = POSITION_KEY;
    formData = addPosition(formData);
  }

  let tableConf = Object.assign(
    {
      data: formData,
    },
    DEFAULT_TABLE_CONF,
    table
  );

  tableConf.cellEdit.afterSaveCell = afterSaveCell;
  tableConf.options.afterDeleteRow = afterDeleteRow;

  return tableConf;
}
