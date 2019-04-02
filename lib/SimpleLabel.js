"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRenderHtml = require("react-render-html");

var _reactRenderHtml2 = _interopRequireDefault(_reactRenderHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleLabel = function (_Component) {
  _inherits(SimpleLabel, _Component);

  function SimpleLabel(props) {
    _classCallCheck(this, SimpleLabel);

    var _this = _possibleConstructorReturn(this, (SimpleLabel.__proto__ || Object.getPrototypeOf(SimpleLabel)).call(this, props));

    _this.state = {
      label: ""
    };
    return _this;
  }

  _createClass(SimpleLabel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          title = _props.schema.title,
          name = _props.name;


      this.setState({
        label: title ? title : name
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props$uiSchema$simpl = this.props.uiSchema.simpleLabel;
      _props$uiSchema$simpl = _props$uiSchema$simpl === undefined ? {} : _props$uiSchema$simpl;
      var styles = _props$uiSchema$simpl.styles,
          _props$uiSchema$simpl2 = _props$uiSchema$simpl.classNames,
          classNames = _props$uiSchema$simpl2 === undefined ? "simpleLabel" : _props$uiSchema$simpl2;

      return _react2.default.createElement(
        "span",
        { className: classNames, style: styles },
        (0, _reactRenderHtml2.default)(this.state.label)
      );
    }
  }]);

  return SimpleLabel;
}(_react.Component);

exports.default = SimpleLabel;