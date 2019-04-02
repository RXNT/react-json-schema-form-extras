"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimePicker = function (_Component) {
  _inherits(DateTimePicker, _Component);

  function DateTimePicker(props) {
    _classCallCheck(this, DateTimePicker);

    var _this = _possibleConstructorReturn(this, (DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).call(this, props));

    _this.updateData = _this.updateData.bind(_this);
    var _this$props$formData = _this.props.formData,
        formData = _this$props$formData === undefined ? '' : _this$props$formData;

    _this.state = {
      dateTimeValue: (0, _moment2.default)(formData).format("YYYY-MM-DDTHH:mm")
    };
    return _this;
  }

  _createClass(DateTimePicker, [{
    key: "updateData",
    value: function updateData(value) {
      var onChange = this.props.onChange;

      if (value !== '') {
        this.setState({ dateTimeValue: value }); //2019-02-07T14:02
        onChange((0, _moment2.default)(value).format("YYYY-MM-DDTHH:mm"));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement("input", {
        ref: "inputRef",
        type: "datetime-local",
        style: { display: 'inline', width: '100%' },
        value: this.state.dateTimeValue,
        onChange: function onChange(e) {
          return _this2.updateData(e.currentTarget.value);
        } });
    }
  }]);

  return DateTimePicker;
}(_react.Component);

exports.default = DateTimePicker;


DateTimePicker.propTypes = {
  schema: _propTypes2.default.shape({
    format: _propTypes2.default.oneOf(["date-time"])
  })
};