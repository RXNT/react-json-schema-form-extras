"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPosition = addPosition;
exports.removePosition = removePosition;
exports.default = tableConfFrom;

var _utils = require("../utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var POSITION_KEY = "_position";

var DEFAULT_TABLE_CONF = {
  cellEdit: {
    mode: "click",
    blurToSave: true
  },
  options: {},
  keyBoardNav: {
    enterToEdit: true
  },
  handleConfirmDeleteRow: function handleConfirmDeleteRow(next) {
    return next();
  }
};

function addPosition(data) {
  return data.map(function (el, i) {
    return Object.assign({}, el, _defineProperty({}, POSITION_KEY, i));
  });
}

function removePosition(data) {
  if (Array.isArray(data)) {
    return data.map(function (el) {
      return removePosition(el);
    });
  } else {
    var dataCopy = Object.assign({}, data);
    delete dataCopy[POSITION_KEY];
    return dataCopy;
  }
}

function tableConfFrom(_ref) {
  var _ref$table = _ref.table,
      table = _ref$table === undefined ? {} : _ref$table;
  var formData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var afterSaveCell = arguments[2];
  var afterDeleteRow = arguments[3];
  var highlightAfterDelete = arguments[4];
  var handleRowSelect = arguments[5];
  var handleAllRowSelect = arguments[6];
  var _table$keyField = table.keyField,
      keyField = _table$keyField === undefined ? POSITION_KEY : _table$keyField;

  if (keyField === POSITION_KEY) {
    formData = addPosition(formData);
  }

  var tableConf = Object.assign({ data: formData }, (0, _utils.deepCopy)(DEFAULT_TABLE_CONF), table, { keyField: keyField });

  tableConf.cellEdit.afterSaveCell = afterSaveCell;
  tableConf.options.afterDeleteRow = afterDeleteRow;
  tableConf.trClassName = highlightAfterDelete;
  if (tableConf.selectRow !== undefined && tableConf.selectRow.onSelectRow !== undefined) {
    tableConf.selectRow.onSelect = handleRowSelect;
  }
  if (tableConf.selectRow !== undefined && tableConf.selectRow.onSelectAllRow !== undefined) {
    tableConf.selectRow.onSelectAll = handleAllRowSelect;
  }

  return tableConf;
}