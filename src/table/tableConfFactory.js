import { deepCopy } from "../utils";

const POSITION_KEY = "_position";

const DEFAULT_TABLE_CONF = {
  cellEdit: {
    mode: "click",
    blurToSave: true
  },
  options: {},
  handleConfirmDeleteRow: next => next()
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
  afterDeleteRow,
  highlightAfterDelete,
  handleRowSelect,
  handleAllRowSelect,
  myRowExpand,
  isRowExpandable,
  expandColumnComponent,
  selectedItems
) {
  let { keyField = POSITION_KEY } = table;
  if (keyField === POSITION_KEY) {
    formData = addPosition(formData);
  }

  if (selectedItems) {
    table.selectRow = {
      ...table.selectRow,
      mode: "checkbox",
      selected: selectedItems,
      onSelect: handleRowSelect,
      onSelectAll: handleAllRowSelect,
      onSelectRow: { fieldToUpdate: "picked" },
      onSelectAllRow: { fieldToUpdate: "picked" }
    };
  }

  let tableConf = Object.assign(
    { data: formData },
    deepCopy(DEFAULT_TABLE_CONF),
    table,
    { keyField }
  );
  tableConf.cellEdit.afterSaveCell = afterSaveCell;
  tableConf.options.afterDeleteRow = afterDeleteRow;
  tableConf.trClassName = highlightAfterDelete;

  if (tableConf.selectRow && tableConf.selectRow.onSelectRow) {
    tableConf.selectRow.onSelect = handleRowSelect;
  }

  if (tableConf.selectRow && tableConf.selectRow.onSelectAllRow) {
    tableConf.selectRow.onSelectAll = handleAllRowSelect;
  }

  let { isTableExpandable = false, allowOneRowExpanding = true } = table;
  if (isTableExpandable) {
    tableConf.options.onlyOneExpanding = allowOneRowExpanding;
    tableConf.expandComponent = myRowExpand;
    tableConf.expandableRow = isRowExpandable;
    tableConf.expandColumnOptions = {
      expandColumnVisible: isTableExpandable,
      expandColumnComponent: expandColumnComponent
    };
  }

  return tableConf;
}
