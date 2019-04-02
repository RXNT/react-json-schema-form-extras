"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrapTable = require("react-bootstrap-table");

var _tableConfFactory = require("./tableConfFactory");

var _tableConfFactory2 = _interopRequireDefault(_tableConfFactory);

var _columnHeadersFactory = require("./columnHeadersFactory");

var _columnHeadersFactory2 = _interopRequireDefault(_columnHeadersFactory);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _InsertModal = require("./customModal/InsertModal");

var _InsertModal2 = _interopRequireDefault(_InsertModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function convertFields(cellValue, _ref) {
  var type = _ref.type,
      format = _ref.format,
      def = _ref.default;

  if (cellValue === undefined) {
    return cellValue;
  }

  if (type === "boolean") {
    return cellValue === "true";
  } else if (type === "number") {
    return cellValue !== undefined && cellValue != "" ? parseFloat(cellValue) : "";
  } else if (type === "string" && format === "date-time") {
    if (cellValue === "") {
      return def;
    } else {
      var date = new Date(cellValue);
      return date.toISOString();
    }
  } else if (type === "string" && format === "date") {
    if (cellValue === "") {
      return def;
    } else {
      var _date = (0, _moment2.default)(cellValue).format("YYYY-MM-DD");
      return _date;
    }
  }
  return cellValue;
}
function isEquivalentObject(a, b) {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent

  return true;
}

var TableField = function (_Component) {
  _inherits(TableField, _Component);

  function TableField(props) {
    _classCallCheck(this, TableField);

    var _this = _possibleConstructorReturn(this, (TableField.__proto__ || Object.getPrototypeOf(TableField)).call(this, props));

    _this.createCustomModal = function (onModalClose, onSave, columns, validateState, ignoreEditable) {
      var _this$props = _this.props,
          formData = _this$props.formData,
          schema = _this$props.schema,
          uiSchema = _this$props.uiSchema,
          onChange = _this$props.onChange,
          registry = _this$props.registry;

      var attr = {
        onModalClose: onModalClose,
        onSave: onSave,
        columns: columns,
        validateState: validateState,
        ignoreEditable: ignoreEditable,
        formData: formData,
        onChange: onChange,
        schema: schema,
        uiSchema: uiSchema,
        registry: registry,
        version: "1"
      };
      return _react2.default.createElement(_InsertModal2.default, attr);
    };

    _this.handleCellSave = _this.handleCellSave.bind(_this);
    _this.handleRowsDelete = _this.handleRowsDelete.bind(_this);
    _this.handleDeletedRow = _this.handleDeletedRow.bind(_this);
    _this.handleRowSelect = _this.handleRowSelect.bind(_this);
    _this.handleAllRowSelect = _this.handleAllRowSelect.bind(_this);
    return _this;
  }

  _createClass(TableField, [{
    key: "handleDeletedRow",
    value: function handleDeletedRow(row, rowIdx, c) {
      var _props$schema$items$d = this.props.schema.items.defaultFilterKey,
          defaultFilterKey = _props$schema$items$d === undefined ? undefined : _props$schema$items$d;
      var rightActions = this.props.uiSchema.table.rightActions;


      var highlightRow = "";
      if (rightActions) {
        var classAfterAction = rightActions.map(function (rightAction) {
          if (rightAction.action === "update") {
            var _rightAction$actionCo = rightAction.actionConfiguration.actionCompletedClassName,
                actionCompletedClassName = _rightAction$actionCo === undefined ? false : _rightAction$actionCo;

            return actionCompletedClassName;
          }
          return undefined;
        });
        if (!row[defaultFilterKey] && row[defaultFilterKey] !== undefined) {
          highlightRow = classAfterAction;
        }
      }
      return highlightRow;
    }
  }, {
    key: "handleCellSave",
    value: function handleCellSave(updRow, cellName, cellValue) {
      var _tableConf = this.tableConf,
          keyField = _tableConf.keyField,
          data = _tableConf.data;

      var fieldSchema = this.props.schema.items.properties[cellName];
      updRow[cellName] = convertFields(cellValue, fieldSchema);
      // Small hack to support object returned from async autocomplete
      // Don't judge me too hard
      if (cellValue && cellValue[cellName]) {
        Object.assign(updRow, cellValue);
      }

      var targetKey = updRow[keyField];
      var updTable = data.map(function (row) {
        return row[keyField] === targetKey ? updRow : row;
      });

      /* Number field Validation => if Number is Undefined Or Empty, it should removed from the FormData */
      var type = fieldSchema.type;

      if (type === "number") {
        Object.keys(updTable[targetKey]).map(function (column) {
          if (column === cellName && updTable[targetKey][column] === undefined || updTable[targetKey][column] === "") {
            delete updTable[targetKey][column];
          }
        });
      }
      /* end Number Filed validation  */
      this.props.onChange((0, _tableConfFactory.removePosition)(updTable));
    }
  }, {
    key: "handleRowsDelete",
    value: function handleRowsDelete(removedKeys) {
      var _tableConf2 = this.tableConf,
          keyField = _tableConf2.keyField,
          data = _tableConf2.data;


      var filteredRows = data.filter(function (row) {
        var rowKey = row[keyField];
        return !removedKeys.includes(rowKey);
      });

      this.props.onChange((0, _tableConfFactory.removePosition)(filteredRows));
    }
  }, {
    key: "handleRowSelect",
    value: function handleRowSelect(row, isSelected, e) {
      var _tableConf3 = this.tableConf,
          data = _tableConf3.data,
          _tableConf3$selectRow = _tableConf3.selectRow.onSelectRow.fieldToUpdate,
          fieldToUpdate = _tableConf3$selectRow === undefined ? "picked" : _tableConf3$selectRow;

      var filteredRows = (data || []).map(function (item) {
        if (!isSelected && item[fieldToUpdate] !== undefined) {
          if (isEquivalentObject(item, row)) {
            delete item[fieldToUpdate];
          }
        } else if (isEquivalentObject(item, row)) {
          item[fieldToUpdate] = isSelected;
        }
        return item;
      });
      this.props.onChange(filteredRows);
    }
  }, {
    key: "handleAllRowSelect",
    value: function handleAllRowSelect(isSelected, rows, e) {
      var _tableConf4 = this.tableConf,
          data = _tableConf4.data,
          _tableConf4$selectRow = _tableConf4.selectRow.onSelectAllRow.fieldToUpdate,
          fieldToUpdate = _tableConf4$selectRow === undefined ? "picked" : _tableConf4$selectRow;


      var filteredRows = (rows || []).map(function (item) {
        if (!isSelected && item[fieldToUpdate] !== undefined) {
          delete item[fieldToUpdate];
        } else {
          item[fieldToUpdate] = isSelected;
        }
        return item;
      });
      this.props.onChange(filteredRows);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _nextProps$uiSchema$t = nextProps.uiSchema.table;
      _nextProps$uiSchema$t = _nextProps$uiSchema$t === undefined ? {} : _nextProps$uiSchema$t;
      var focusOnAdd = _nextProps$uiSchema$t.focusOnAdd;


      this.adding = focusOnAdd !== undefined && nextProps.formData && this.props.formData && nextProps.formData.length > this.props.formData.length;
    }
    // adds current date to default for table schema

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.adding) {
        var _props$uiSchema$table = this.props.uiSchema.table,
            focusOnAdd = _props$uiSchema$table.focusOnAdd,
            focusRowIndex = _props$uiSchema$table.focusRowIndex;


        var body = this.refs.table.refs.body ? this.refs.table.refs.body : this.refs.table.body;
        if (!body || !body.handleEditCell) {
          console.error("Can't find body in the table");
          return;
        }
        body.handleEditCell(focusRowIndex ? focusRowIndex : this.props.formData.length, focusOnAdd);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          uiSchema = _props.uiSchema,
          schema = _props.schema,
          formData = _props.formData,
          fields = _props.registry.fields,
          _props$idSchema = _props.idSchema;
      _props$idSchema = _props$idSchema === undefined ? {} : _props$idSchema;
      var $id = _props$idSchema.$id,
          onChange = _props.onChange;


      this.tableConf = (0, _tableConfFactory2.default)(uiSchema, formData, this.handleCellSave, this.handleRowsDelete, this.handleDeletedRow, this.handleRowSelect, this.handleAllRowSelect);
      this.tableConf.options.insertModal = this.createCustomModal;

      this.tableConf.cellEdit.beforeSaveCell = this.beforeSaveCell;
      var columns = (0, _columnHeadersFactory2.default)(schema, uiSchema, fields, formData, onChange);

      return _react2.default.createElement(
        "div",
        { id: $id },
        _react2.default.createElement(
          _reactBootstrapTable.BootstrapTable,
          _extends({}, this.tableConf, { ref: "table" }),
          columns.map(function (column, i) {
            return _react2.default.createElement(
              _reactBootstrapTable.TableHeaderColumn,
              _extends({ key: i }, column),
              column.displayName
            );
          })
        )
      );
    }
  }]);

  return TableField;
}(_react.Component);

exports.default = TableField;