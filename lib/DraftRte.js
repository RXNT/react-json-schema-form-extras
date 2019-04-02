"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _draftJs = require("draft-js");

var _reactDraftWysiwyg = require("react-draft-wysiwyg");

var _draftjsToHtml = require("draftjs-to-html");

var _draftjsToHtml2 = _interopRequireDefault(_draftjsToHtml);

var _htmlToDraftjs = require("html-to-draftjs");

var _htmlToDraftjs2 = _interopRequireDefault(_htmlToDraftjs);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Label = require("./Label");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debounce = require("lodash.debounce");

var DraftRTE = function (_Component) {
  _inherits(DraftRTE, _Component);

  /**
   * 
   * @param {*} props 
   * Currently only supports HTML
   */
  function DraftRTE(props) {
    _classCallCheck(this, DraftRTE);

    var _this = _possibleConstructorReturn(this, (DraftRTE.__proto__ || Object.getPrototypeOf(DraftRTE)).call(this, props));

    _initialiseProps.call(_this);

    var _props$formData = props.formData,
        formData = _props$formData === undefined ? "" : _props$formData,
        uiSchema = props.uiSchema;

    var autoFocus = uiSchema["ui:autofocus"] ? uiSchema["ui:autofocus"] : false;

    // Initializing the editor state (ref: https://jpuri.github.io/react-draft-wysiwyg/#/docs)
    var blocksFromHtml = (0, _htmlToDraftjs2.default)(formData);
    var contentBlocks = blocksFromHtml.contentBlocks,
        entityMap = blocksFromHtml.entityMap;

    var contentState = _draftJs.ContentState.createFromBlockArray(contentBlocks, entityMap);

    var editorState = null;

    if (autoFocus) {
      editorState = _draftJs.EditorState.moveFocusToEnd(_draftJs.EditorState.createWithContent(contentState));
    } else {
      editorState = _draftJs.EditorState.createWithContent(contentState);
    }

    _this.state = {
      editorState: editorState
    };
    return _this;
  }
  /**
   * updates formData by calling parent's onChange function with current html content
   */


  /**
   * handles editor's onChange
   * handles logic to update form data based on props supplied to the component
   */
  //will only be executed if debounce is present

  /**
   * handles the logic to update formData on blur
   */


  _createClass(DraftRTE, [{
    key: "render",


    /**
     * react render function
     */
    value: function render() {
      var editorState = this.state.editorState;
      var _props = this.props,
          draftRte = _props.uiSchema.draftRte,
          _props$idSchema = _props.idSchema;
      _props$idSchema = _props$idSchema === undefined ? {} : _props$idSchema;
      var $id = _props$idSchema.$id;


      return _react2.default.createElement(
        "div",
        { id: $id },
        _react2.default.createElement(_Label.DefaultLabel, this.props),
        _react2.default.createElement(_reactDraftWysiwyg.Editor, _extends({
          wrapperClassName: "draftRte-wrapper",
          editorClassName: "draftRte-editor",
          editorState: editorState,
          onEditorStateChange: this.onEditorStateChange,
          onBlur: this.handleBlur,
          editorRef: this.setEditorReference,
          spellCheck: true,
          handlePastedText: function handlePastedText() {
            return false;
          }
        }, draftRte))
      );
    }
  }]);

  return DraftRTE;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateFormData = function () {
    var onChange = _this2.props.onChange;
    var editorState = _this2.state.editorState; //eslint-disable-line

    if (onChange) {
      onChange((0, _draftjsToHtml2.default)((0, _draftJs.convertToRaw)(_this2.state.editorState.getCurrentContent())));
    }
  };

  this.onEditorStateChange = function (editorState) {
    var _props$uiSchema = _this2.props.uiSchema,
        _props$uiSchema$updat = _props$uiSchema.updateOnBlur,
        updateOnBlur = _props$uiSchema$updat === undefined ? false : _props$uiSchema$updat,
        _props$uiSchema$draft = _props$uiSchema.draftRte;
    _props$uiSchema$draft = _props$uiSchema$draft === undefined ? {} : _props$uiSchema$draft;
    var _props$uiSchema$draft2 = _props$uiSchema$draft.debounce;
    _props$uiSchema$draft2 = _props$uiSchema$draft2 === undefined ? {} : _props$uiSchema$draft2;
    var interval = _props$uiSchema$draft2.interval,
        _props$uiSchema$draft3 = _props$uiSchema$draft2.shouldDebounce,
        shouldDebounce = _props$uiSchema$draft3 === undefined ? false : _props$uiSchema$draft3;

    _this2.setState({ editorState: editorState }, function () {
      !updateOnBlur && !shouldDebounce && _this2.updateFormData();
      if (shouldDebounce && interval) {
        _this2.handleDebounce();
      }
    });
  };

  this.handleDebounce = this.props.uiSchema.draftRte ? this.props.uiSchema.draftRte.debounce ? debounce(this.updateFormData, this.props.uiSchema.draftRte.debounce.interval) : function () {} : function () {};

  this.handleBlur = function () {
    var _props$uiSchema$updat2 = _this2.props.uiSchema.updateOnBlur,
        updateOnBlur = _props$uiSchema$updat2 === undefined ? false : _props$uiSchema$updat2;

    if (updateOnBlur) {
      _this2.updateFormData();
    }
  };

  this.setEditorReference = function (ref) {
    var autoFocus = _this2.props.uiSchema["ui:autofocus"] ? _this2.props.uiSchema["ui:autofocus"] : false;
    ref && autoFocus && ref.focus();
  };
};

exports.default = DraftRTE;


DraftRTE.propTypes = {
  uiSchema: _propTypes2.default.shape({
    updateOnBlur: _propTypes2.default.bool,
    draftRte: _propTypes2.default.object
  })
};