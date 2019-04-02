"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function altInputField(props) {
  var _props$uiSchema = props.uiSchema,
      defInput = _props$uiSchema.defInput,
      altInput = _props$uiSchema.altInput,
      _props$uiSchema$altIn = _props$uiSchema.altInputSeparator,
      altInputSeparator = _props$uiSchema$altIn === undefined ? "" : _props$uiSchema$altIn,
      fields = props.registry.fields,
      _props$idSchema = props.idSchema;
  _props$idSchema = _props$idSchema === undefined ? {} : _props$idSchema;
  var $id = _props$idSchema.$id;


  var DefInput = fields[defInput];
  var AltInput = fields[altInput];

  var noBorder = {
    border: "0",
    boxShadow: "none"
  };
  return _react2.default.createElement(
    "div",
    { className: "row", id: $id },
    _react2.default.createElement(
      "div",
      { className: "col-md-5" },
      _react2.default.createElement(DefInput, props)
    ),
    _react2.default.createElement(
      "div",
      { className: "col-md-2 text-center" },
      _react2.default.createElement(
        "div",
        { className: "form-control", style: noBorder },
        altInputSeparator
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "col-md-5" },
      _react2.default.createElement(AltInput, props)
    )
  );
}

altInputField.propTypes = {
  uiSchema: _propTypes2.default.shape({
    defInput: _propTypes2.default.string.isRequired,
    altInput: _propTypes2.default.string.isRequired,
    altInputSeparator: _propTypes2.default.string
  })
};

exports.default = altInputField;