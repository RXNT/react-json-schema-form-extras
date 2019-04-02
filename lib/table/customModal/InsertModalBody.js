"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Editor = require("react-bootstrap-table/lib/Editor");

var _Editor2 = _interopRequireDefault(_Editor);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/display-name: 0 */


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

var InsertModalBody = function (_Component) {
  _inherits(InsertModalBody, _Component);

  function InsertModalBody() {
    _classCallCheck(this, InsertModalBody);

    return _possibleConstructorReturn(this, (InsertModalBody.__proto__ || Object.getPrototypeOf(InsertModalBody)).apply(this, arguments));
  }

  _createClass(InsertModalBody, [{
    key: "getFieldValue",
    value: function getFieldValue() {
      var _this2 = this;

      var newRow = {};
      var schema = this.props.schema;

      this.props.columns.forEach(function (column, i) {
        var fieldSchema = schema.items.properties[column.field];
        var inputVal = void 0;
        if (column.autoValue) {
          // when you want same auto generate value and not allow edit, example ID field
          var time = new Date().getTime();
          inputVal = typeof column.autoValue === "function" ? column.autoValue() : "autovalue-" + time;
        } else if (column.hiddenOnInsert || !column.field) {
          inputVal = "";
        } else {
          var dom = _this2.refs[column.field];
          inputVal = dom ? dom.value : undefined;

          if (column.editable && column.editable.type === "checkbox") {
            var values = inputVal.split(":");
            inputVal = dom.checked ? values[0] : values[1];
          } else if (column.customInsertEditor) {
            inputVal = inputVal || dom.getFieldValue();
          }
        }
        var convertedField = convertFields(inputVal, fieldSchema ? fieldSchema : {});
        if (convertedField && convertedField !== "") {
          newRow[column.field] = convertedField;
        }
      }, this);

      return newRow;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          columns = _props.columns,
          validateState = _props.validateState,
          ignoreEditable = _props.ignoreEditable;

      return _react2.default.createElement(
        "div",
        { className: "modal-body" },
        columns.map(function (column, i) {
          var editable = column.editable,
              format = column.format,
              field = column.field,
              name = column.name,
              autoValue = column.autoValue,
              hiddenOnInsert = column.hiddenOnInsert,
              customInsertEditor = column.customInsertEditor;


          if (!column.name) {
            return;
          }

          var attr = {
            ref: field,
            placeholder: editable.placeholder ? editable.placeholder : name
          };
          var fieldElement = void 0;
          var defaultValue = editable.defaultValue || undefined;
          if (customInsertEditor) {
            var getElement = customInsertEditor.getElement;

            fieldElement = getElement(column, attr, "form-control", ignoreEditable, defaultValue);
          }

          // fieldElement = false, means to use default editor when enable custom editor
          // Becasuse some users want to have default editor based on some condition.
          if (!customInsertEditor || fieldElement === false) {
            fieldElement = (0, _Editor2.default)(editable, attr, format, "", defaultValue, ignoreEditable);
          }

          if (autoValue || hiddenOnInsert || !column.field) {
            // when you want same auto generate value
            // and not allow edit, for example ID field
            return null;
          }
          var errorStyle = {};
          if (_this3.props.errorFields.includes(field)) {
            errorStyle = {
              border: "1px solid red"
            };
          }
          var error = validateState[field] ? _react2.default.createElement(
            "span",
            { className: "help-block bg-danger" },
            validateState[field]
          ) : null;

          return _react2.default.createElement(
            "div",
            { className: "form-group", key: field },
            _react2.default.createElement(
              "label",
              null,
              name
            ),
            _react2.default.createElement(
              "span",
              { className: "help-block bg-danger", style: errorStyle },
              fieldElement
            ),
            error
          );
        })
      );
    }
  }]);

  return InsertModalBody;
}(_react.Component);

InsertModalBody.propTypes = {
  columns: _propTypes2.default.array,
  validateState: _propTypes2.default.object,
  ignoreEditable: _propTypes2.default.bool
};

InsertModalBody.defaultProps = {
  validateState: {},
  ignoreEditable: false
};

exports.default = InsertModalBody;