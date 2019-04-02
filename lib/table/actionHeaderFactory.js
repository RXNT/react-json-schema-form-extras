"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = actionHeadersFrom;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function actionFactory(action, actionConfiguration, schema) {
  if (action === "update") {
    return function (cell, row, enumObject, rowIndex, formData, onChange) {
      var newFormData = formData.slice(0);
      if (rowIndex != undefined) {
        newFormData.map(function (value, index) {
          if (rowIndex === index) {
            var actionToApply = 0; // 0 - update(soft delete), 1 - delete(hard delete)
            var _actionConfiguration$ = actionConfiguration.mandatoryField,
                mandatoryField = _actionConfiguration$ === undefined ? undefined : _actionConfiguration$,
                _actionConfiguration$2 = actionConfiguration.fieldToUpdate,
                fieldToUpdate = _actionConfiguration$2 === undefined ? undefined : _actionConfiguration$2;


            if (mandatoryField !== undefined) {
              mandatoryField.map(function (mandatory) {
                if (value[mandatory] === undefined || value[mandatory] === "") {
                  actionToApply = 1;
                }
              });
            }
            if (actionToApply === 0) {
              // just updating the Column
              if (fieldToUpdate !== undefined) {
                var update = [];
                fieldToUpdate.map(function (fieldToUpdate) {
                  if (schema[fieldToUpdate] !== undefined) {
                    if (schema[fieldToUpdate]["type"] === "boolean") {
                      update[fieldToUpdate] = !value[fieldToUpdate];
                    } // can add separate block for each type of input
                    newFormData[index] = Object.assign({}, value, update);
                  }
                });
              }
            } else if (actionToApply === 1) {
              //Hard delete the row
              newFormData.splice(rowIndex, 1);
              onChange(newFormData);
            }
          }
        });
      }
      onChange(newFormData);
    };
  } else if (action === "delete") {
    return function (cell, row, enumObject, rowIndex, formData, onChange) {
      var newFormData = formData.slice(0);
      newFormData.splice(rowIndex, 1);
      onChange(newFormData);
    };
  } else if (action === "moveup") {
    return function (cell, row, enumObject, rowIndex, formData, onChange) {
      var newFormData = formData.slice(0);
      var temp = newFormData[rowIndex];
      if (rowIndex >= 1) {
        newFormData[rowIndex] = newFormData[rowIndex - 1];
        newFormData[rowIndex - 1] = temp;
        onChange(newFormData);
      }
    };
  } else if (action === "movedown") {
    return function (cell, row, enumObject, rowIndex, formData, onChange) {
      var newFormData = formData.slice(0);
      var temp = newFormData[rowIndex];
      if (rowIndex <= formData.length - 2) {
        newFormData[rowIndex] = newFormData[rowIndex + 1];
        newFormData[rowIndex + 1] = temp;
        onChange(newFormData);
      }
    };
  } else if (typeof action === "function") {
    return action;
  } else {
    return undefined;
  }
}

function actionColumnFrom(_ref, schema) {
  var action = _ref.action,
      icon = _ref.icon,
      text = _ref.text,
      _ref$actionConfigurat = _ref.actionConfiguration,
      actionConfiguration = _ref$actionConfigurat === undefined ? false : _ref$actionConfigurat;
  var _actionConfiguration$3 = actionConfiguration.filterField,
      filterField = _actionConfiguration$3 === undefined ? false : _actionConfiguration$3,
      _actionConfiguration$4 = actionConfiguration.actionCompletedIcon,
      actionCompletedIcon = _actionConfiguration$4 === undefined ? "" : _actionConfiguration$4;

  var handleClick = actionFactory(action, actionConfiguration, schema);
  if (!handleClick) {
    return {};
  }

  return {
    dataField: icon,
    dataFormat: function dataFormat(cell, row, enumObject, rowIndex, formData, onChange) {
      return _react2.default.createElement(
        "span",
        {
          onClick: function onClick() {
            return handleClick(cell, row, enumObject, rowIndex, formData, onChange);
          } },
        _react2.default.createElement("i", {
          className: row[filterField] || row[filterField] === undefined ? icon : actionCompletedIcon
        }),
        text
      );
    },
    editable: false
  };
}

var actionToCol = function actionToCol(formData, onChange, schema) {
  return function (actionConf) {
    var genericConf = actionColumnFrom(actionConf, schema);
    var realDataFormat = actionConf.dataFormat ? actionConf.dataFormat : genericConf.dataFormat;
    return Object.assign({}, actionConf, genericConf, {
      dataFormat: function dataFormat(cell, row, enumObject, rowIndex) {
        return realDataFormat(cell, row, enumObject, rowIndex, formData, onChange);
      }
    });
  };
};

function actionHeadersFrom(schema, uiSchema, formData, onChange) {
  var _uiSchema$table = uiSchema.table;
  _uiSchema$table = _uiSchema$table === undefined ? {} : _uiSchema$table;
  var _uiSchema$table$right = _uiSchema$table.rightActions,
      rightActions = _uiSchema$table$right === undefined ? [] : _uiSchema$table$right,
      _uiSchema$table$leftA = _uiSchema$table.leftActions,
      leftActions = _uiSchema$table$leftA === undefined ? [] : _uiSchema$table$leftA;
  var _schema$items$propert = schema.items.properties,
      properties = _schema$items$propert === undefined ? [] : _schema$items$propert;


  var rightColumns = rightActions.map(actionToCol(formData, onChange, properties));
  var leftColumns = leftActions.map(actionToCol(formData, onChange, properties));
  return { rightColumns: rightColumns, leftColumns: leftColumns };
}