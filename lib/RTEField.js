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

var _reactRte = require("react-rte");

var _reactRte2 = _interopRequireDefault(_reactRte);

var _Label = require("./Label");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_FORMAT = "html";

var RTEField = function (_Component) {
  _inherits(RTEField, _Component);

  function RTEField(props) {
    _classCallCheck(this, RTEField);

    var _this = _possibleConstructorReturn(this, (RTEField.__proto__ || Object.getPrototypeOf(RTEField)).call(this, props));

    _initialiseProps.call(_this);

    var _props$formData = props.formData,
        formData = _props$formData === undefined ? "" : _props$formData,
        _props$uiSchema$rte = props.uiSchema.rte;
    _props$uiSchema$rte = _props$uiSchema$rte === undefined ? {} : _props$uiSchema$rte;
    var _props$uiSchema$rte$f = _props$uiSchema$rte.format,
        format = _props$uiSchema$rte$f === undefined ? DEFAULT_FORMAT : _props$uiSchema$rte$f;


    _this.state = {
      value: _reactRte2.default.createValueFromString(formData, format)
    };
    return _this;
  }

  _createClass(RTEField, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          rte = _props.uiSchema.rte,
          _props$idSchema = _props.idSchema;
      _props$idSchema = _props$idSchema === undefined ? {} : _props$idSchema;
      var $id = _props$idSchema.$id;

      var autoFocus = this.props.uiSchema["ui:autofocus"];

      return _react2.default.createElement(
        "div",
        { id: $id },
        _react2.default.createElement(_Label.DefaultLabel, this.props),
        _react2.default.createElement(_reactRte2.default, _extends({
          onBlur: this.handleBlur
        }, rte, {
          autoFocus: autoFocus,
          value: this.state.value,
          onChange: this.handleChange
        }))
      );
    }
  }]);

  return RTEField;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateFormData = function () {
    var _props2 = _this2.props,
        _props2$uiSchema$rte = _props2.uiSchema.rte;
    _props2$uiSchema$rte = _props2$uiSchema$rte === undefined ? {} : _props2$uiSchema$rte;
    var _props2$uiSchema$rte$ = _props2$uiSchema$rte.format,
        format = _props2$uiSchema$rte$ === undefined ? DEFAULT_FORMAT : _props2$uiSchema$rte$,
        onChange = _props2.onChange;
    var value = _this2.state.value;

    if (onChange) {
      onChange(value.toString(format));
    }
  };

  this.handleChange = function (value) {
    var _props$uiSchema$updat = _this2.props.uiSchema.updateOnBlur,
        updateOnBlur = _props$uiSchema$updat === undefined ? false : _props$uiSchema$updat;

    _this2.setState({ value: value }, function () {
      return !updateOnBlur && _this2.updateFormData();
    });
  };

  this.handleBlur = function () {
    var _props$uiSchema$updat2 = _this2.props.uiSchema.updateOnBlur,
        updateOnBlur = _props$uiSchema$updat2 === undefined ? false : _props$uiSchema$updat2;

    if (updateOnBlur) {
      _this2.updateFormData();
    }
  };
};

exports.default = RTEField;


RTEField.propTypes = {
  uiSchema: _propTypes2.default.shape({
    updateOnBlur: _propTypes2.default.bool,
    rte: _propTypes2.default.shape({
      format: _propTypes2.default.string
    })
  })
};