"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompositeArrayField = function (_Component) {
  _inherits(CompositeArrayField, _Component);

  function CompositeArrayField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CompositeArrayField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CompositeArrayField.__proto__ || Object.getPrototypeOf(CompositeArrayField)).call.apply(_ref, [this].concat(args))), _this), _this.handleAdd = function (list) {
      var _this$props$formData = _this.props.formData,
          formData = _this$props$formData === undefined ? [] : _this$props$formData;

      var newTable = formData.concat((0, _utils.toArray)(list));
      _this.props.onChange(newTable);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CompositeArrayField, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          _props$uiSchema = _props.uiSchema,
          inputField = _props$uiSchema.inputField,
          arrayField = _props$uiSchema.arrayField,
          fields = _props.registry.fields,
          _props$idSchema = _props.idSchema;
      _props$idSchema = _props$idSchema === undefined ? {} : _props$idSchema;
      var $id = _props$idSchema.$id,
          _props$formData = _props.formData,
          formData = _props$formData === undefined ? [] : _props$formData;


      var inputProps = Object.assign({}, this.props, { formData: undefined, ArrayElementData: formData }); //Passing Array elements data to the input field

      var InputElement = fields[inputField];
      var ArrayElement = fields[arrayField];
      return _react2.default.createElement(
        "div",
        { id: $id },
        _react2.default.createElement(
          "div",
          { className: "form-group col-md-12" },
          _react2.default.createElement(InputElement, _extends({}, inputProps, { onChange: this.handleAdd }))
        ),
        _react2.default.createElement(
          "div",
          { className: "form-group col-md-12" },
          _react2.default.createElement(ArrayElement, this.props)
        )
      );
    }
  }]);

  return CompositeArrayField;
}(_react.Component);

CompositeArrayField.propTypes = {
  schema: _propTypes2.default.shape({
    type: _propTypes2.default.oneOf(["array"]).isRequired
  }).isRequired,
  uiSchema: _propTypes2.default.shape({
    inputField: _propTypes2.default.string.isRequired,
    arrayField: _propTypes2.default.string.isRequired
  }).isRequired,
  registry: _propTypes2.default.shape({
    fields: _propTypes2.default.object.isRequired
  }).isRequired
};

exports.default = CompositeArrayField;