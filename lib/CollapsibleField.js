"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("react-jsonschema-form/lib/utils");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollapseMenuAction = function (_Component) {
  _inherits(CollapseMenuAction, _Component);

  function CollapseMenuAction() {
    _classCallCheck(this, CollapseMenuAction);

    return _possibleConstructorReturn(this, (CollapseMenuAction.__proto__ || Object.getPrototypeOf(CollapseMenuAction)).apply(this, arguments));
  }

  _createClass(CollapseMenuAction, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          action = _props.action,
          _props$allActions = _props.allActions,
          allActions = _props$allActions === undefined ? {} : _props$allActions;

      if (!action) {
        return null;
      }
      if (typeof action === "string") {
        return _react2.default.createElement(
          "div",
          null,
          action
        );
      } else if ((typeof action === "undefined" ? "undefined" : _typeof(action)) === "object") {
        var _Component2 = allActions[action.component];
        if (!_Component2) {
          console.error("Can't find " + action.component + " in formContext.allActions");
          return _react2.default.createElement(
            "h2",
            { className: "warning bg-error", style: { color: "red" } },
            "Can't find ",
            _react2.default.createElement(
              "b",
              null,
              action.component
            ),
            " in ",
            _react2.default.createElement(
              "b",
              null,
              "formContext"
            ),
            ".",
            _react2.default.createElement(
              "b",
              null,
              "allActions"
            )
          );
        }
        return _react2.default.createElement(_Component2, action.props);
      }
    }
  }]);

  return CollapseMenuAction;
}(_react.Component);

function CollapseMenu(props) {
  var _props$uiSchema$colla = props.uiSchema.collapse,
      _props$uiSchema$colla2 = _props$uiSchema$colla.icon;
  _props$uiSchema$colla2 = _props$uiSchema$colla2 === undefined ? {} : _props$uiSchema$colla2;
  var _props$uiSchema$colla3 = _props$uiSchema$colla2.enabled,
      enabled = _props$uiSchema$colla3 === undefined ? "glyphicon glyphicon-chevron-down" : _props$uiSchema$colla3,
      _props$uiSchema$colla4 = _props$uiSchema$colla2.disabled,
      disabled = _props$uiSchema$colla4 === undefined ? "glyphicon glyphicon-chevron-right" : _props$uiSchema$colla4,
      _props$uiSchema$colla5 = _props$uiSchema$colla2.add,
      add = _props$uiSchema$colla5 === undefined ? "glyphicon glyphicon-plus-sign" : _props$uiSchema$colla5,
      _props$uiSchema$colla6 = _props$uiSchema$colla.separate,
      separate = _props$uiSchema$colla6 === undefined ? true : _props$uiSchema$colla6,
      addTo = _props$uiSchema$colla.addTo,
      _props$uiSchema$colla7 = _props$uiSchema$colla.wrapClassName,
      wrapClassName = _props$uiSchema$colla7 === undefined ? "lead" : _props$uiSchema$colla7,
      _props$uiSchema$colla8 = _props$uiSchema$colla.actions,
      actions = _props$uiSchema$colla8 === undefined ? [] : _props$uiSchema$colla8,
      _props$uiSchema$colla9 = _props$uiSchema$colla.classNames,
      classNames = _props$uiSchema$colla9 === undefined ? "collapsibleHeading" : _props$uiSchema$colla9,
      _props$uiSchema$colla10 = _props$uiSchema$colla.collapseDivStyles;
  _props$uiSchema$colla10 = _props$uiSchema$colla10 === undefined ? {} : _props$uiSchema$colla10;
  var _props$uiSchema$colla11 = _props$uiSchema$colla10.textColor,
      textColor = _props$uiSchema$colla11 === undefined ? "white" : _props$uiSchema$colla11,
      _props$uiSchema$colla12 = _props$uiSchema$colla10.background,
      background = _props$uiSchema$colla12 === undefined ? "linear-gradient(to right, #0472B6, white)" : _props$uiSchema$colla12,
      _props$uiSchema$colla13 = _props$uiSchema$colla10.collapseGlyphColor,
      collapseGlyphColor = _props$uiSchema$colla13 === undefined ? "white" : _props$uiSchema$colla13,
      _props$uiSchema$colla14 = _props$uiSchema$colla10.addGlyphColor,
      addGlyphColor = _props$uiSchema$colla14 === undefined ? "white" : _props$uiSchema$colla14,
      _props$uiSchema$colla15 = _props$uiSchema$colla10.padding,
      padding = _props$uiSchema$colla15 === undefined ? "14px" : _props$uiSchema$colla15,
      _props$uiSchema$colla16 = _props$uiSchema$colla10.margin,
      margin = _props$uiSchema$colla16 === undefined ? "" : _props$uiSchema$colla16,
      _props$uiSchema$colla17 = _props$uiSchema$colla10.marginLeft,
      marginLeft = _props$uiSchema$colla17 === undefined ? "-5px" : _props$uiSchema$colla17,
      _props$uiSchema$colla18 = _props$uiSchema$colla10.marginBottom,
      marginBottom = _props$uiSchema$colla18 === undefined ? "5px" : _props$uiSchema$colla18,
      _props$uiSchema$colla19 = _props$uiSchema$colla10.zIndex,
      zIndex = _props$uiSchema$colla19 === undefined ? -1 : _props$uiSchema$colla19,
      _props$uiSchema$colla20 = _props$uiSchema$colla10.divCursor,
      divCursor = _props$uiSchema$colla20 === undefined ? "pointer" : _props$uiSchema$colla20,
      _props$uiSchema$colla21 = _props$uiSchema$colla10.addCursor,
      addCursor = _props$uiSchema$colla21 === undefined ? "copy" : _props$uiSchema$colla21,
      _props$formContext = props.formContext,
      formContext = _props$formContext === undefined ? {} : _props$formContext,
      onChange = props.onChange,
      onAdd = props.onAdd,
      title = props.title,
      name = props.name,
      collapsed = props.collapsed;


  var handleAdd = function handleAdd(event) {
    event.stopPropagation();
    onAdd(event);
  };

  return _react2.default.createElement(
    "div",
    { className: "" + wrapClassName },
    _react2.default.createElement(
      "div",
      {
        className: classNames,
        onClick: onChange,
        style: {
          padding: padding,
          margin: margin,
          marginLeft: marginLeft,
          marginBottom: marginBottom,
          zIndex: zIndex,
          cursor: divCursor,
          background: background
        } },
      _react2.default.createElement(
        "span",
        { style: { color: textColor } },
        title || name
      ),
      "\xA0",
      addTo && _react2.default.createElement(
        "a",
        {
          onClick: handleAdd,
          style: { color: addGlyphColor, cursor: addCursor } },
        _react2.default.createElement("i", { style: { cursor: addCursor }, className: add })
      ),
      _react2.default.createElement(
        "a",
        null,
        _react2.default.createElement("i", {
          style: { color: collapseGlyphColor },
          className: collapsed ? disabled : enabled
        })
      ),
      actions.map(function (action, i) {
        return _react2.default.createElement(CollapseMenuAction, {
          key: i,
          action: action,
          allActions: formContext.allActions
        });
      })
    ),
    separate && _react2.default.createElement("hr", null)
  );
}

var CollapseLegend = function (_Component3) {
  _inherits(CollapseLegend, _Component3);

  function CollapseLegend() {
    _classCallCheck(this, CollapseLegend);

    return _possibleConstructorReturn(this, (CollapseLegend.__proto__ || Object.getPrototypeOf(CollapseLegend)).apply(this, arguments));
  }

  _createClass(CollapseLegend, [{
    key: "render",
    value: function render() {
      var _props2 = this.props,
          legend = _props2.uiSchema.collapse.legend,
          _props2$formContext = _props2.formContext;
      _props2$formContext = _props2$formContext === undefined ? {} : _props2$formContext;
      var _props2$formContext$l = _props2$formContext.legends,
          legends = _props2$formContext$l === undefined ? {} : _props2$formContext$l;

      if (!legend) {
        return null;
      }
      if (typeof legend === "string") {
        return _react2.default.createElement(
          "div",
          null,
          legend
        );
      } else if ((typeof legend === "undefined" ? "undefined" : _typeof(legend)) === "object") {
        var _Component4 = legends[legend.component];
        if (!_Component4) {
          console.error("Can't find " + legend.components + " in formContext.legends");
          return _react2.default.createElement(
            "h2",
            { className: "warning bg-error", style: { color: "red" } },
            "Can't find ",
            _react2.default.createElement(
              "b",
              null,
              legend.component
            ),
            " in ",
            _react2.default.createElement(
              "b",
              null,
              "formContext"
            ),
            ".",
            _react2.default.createElement(
              "b",
              null,
              "legends"
            )
          );
        }
        return _react2.default.createElement(_Component4, legend.props);
      }
      return _react2.default.createElement(
        "div",
        null,
        "I'm a legend"
      );
    }
  }]);

  return CollapseLegend;
}(_react.Component);

var CollapsibleField = function (_Component5) {
  _inherits(CollapsibleField, _Component5);

  function CollapsibleField(props) {
    _classCallCheck(this, CollapsibleField);

    var _this3 = _possibleConstructorReturn(this, (CollapsibleField.__proto__ || Object.getPrototypeOf(CollapsibleField)).call(this, props));

    _this3.appendToArray = function () {
      var formData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var newVal = arguments[1];
      var _this3$props$uiSchema = _this3.props.uiSchema.collapse;
      _this3$props$uiSchema = _this3$props$uiSchema === undefined ? {} : _this3$props$uiSchema;
      var _this3$props$uiSchema2 = _this3$props$uiSchema.addToBottom,
          addToBottom = _this3$props$uiSchema2 === undefined ? true : _this3$props$uiSchema2;

      if (formData.some(function (v) {
        return (0, _utils.deepEquals)(v, newVal);
      })) {
        return formData;
      } else {
        // newVal can be either array or a single element, concat flattens value
        if (addToBottom) {
          return formData.concat(newVal);
        } else {
          return [newVal].concat(formData);
        }
      }
    };

    _this3.doAdd = function (field, formData, newVal) {
      if (field === "self") {
        _this3.props.onChange(_this3.appendToArray(formData, newVal));
      } else {
        var fieldVal = _this3.appendToArray(formData[field], newVal);
        var change = Object.assign({}, formData, _defineProperty({}, field, fieldVal));
        _this3.props.onChange(change);
      }
    };

    _this3.handleAdd = function () {
      _this3.setState({ collapsed: false });
      _this3.forceUpdate(function () {
        var _this3$props = _this3.props,
            schema = _this3$props.schema,
            uiSchema = _this3$props.uiSchema,
            formData = _this3$props.formData,
            fields = _this3$props.registry.fields;
        var _uiSchema$collapse = uiSchema.collapse,
            addTo = _uiSchema$collapse.addTo,
            addElement = _uiSchema$collapse.addElement;


        var fieldSchema = addTo === "self" ? schema.items : schema.properties ? schema.properties[addTo] ? schema.properties[addTo].items : null : null;
        if (!fieldSchema) {
          return false;
        }
        var fieldUiSchema = addTo === "self" ? uiSchema : uiSchema[addTo];

        if (addElement) {
          if (typeof addElement === "function") {
            var onSubmit = function onSubmit(newVal) {
              _this3.setState({ AddElement: undefined });
              _this3.doAdd(addTo, formData, newVal);
            };
            var AddElement = addElement(fieldSchema, fieldUiSchema, onSubmit);
            _this3.setState({ AddElement: AddElement });
          } else {
            var FieldElement = fields[addElement];
            var onBlur = function onBlur(newVal) {
              _this3.setState({ AddElement: undefined });
              _this3.doAdd(addTo, formData, newVal);
            };
            var _AddElement = function _AddElement() {
              return _react2.default.createElement(FieldElement, {
                schema: fieldSchema,
                uiSchema: fieldUiSchema,
                onChange: function onChange(formData) {
                  onBlur(formData);
                }
              });
            };
            _this3.setState({ AddElement: _AddElement });
          }
        } else {
          var newVal = (0, _utils.getDefaultFormState)(fieldSchema, {});
          _this3.doAdd(addTo, formData, newVal);
        }
      });
    };

    _this3.handleCollapsed = function () {
      _this3.setState(function (state) {
        return { collapsed: !state.collapsed };
      });
    };

    var _props$uiSchema$colla22 = props.uiSchema.collapse;
    _props$uiSchema$colla22 = _props$uiSchema$colla22 === undefined ? {} : _props$uiSchema$colla22;
    var _props$uiSchema$colla23 = _props$uiSchema$colla22.collapsed,
        collapsed = _props$uiSchema$colla23 === undefined ? true : _props$uiSchema$colla23;


    _this3.state = { collapsed: collapsed };
    return _this3;
  }

  _createClass(CollapsibleField, [{
    key: "render",
    value: function render() {
      var _props3 = this.props,
          title = _props3.schema.title,
          uiSchema = _props3.uiSchema,
          fields = _props3.registry.fields,
          _props3$idSchema = _props3.idSchema;
      _props3$idSchema = _props3$idSchema === undefined ? {} : _props3$idSchema;
      var $id = _props3$idSchema.$id,
          name = _props3.name,
          formContext = _props3.formContext;
      var _state = this.state,
          collapsed = _state.collapsed,
          AddElement = _state.AddElement;
      var field = uiSchema.collapse.field;

      var CollapseElement = fields[field];
      // uischema retains the value form the state
      uiSchema.collapse.collapsed = this.state.collapsed;

      title = uiSchema["ui:title"] ? uiSchema["ui:title"] : title ? title : name;
      var customizedId = collapsed ? $id : undefined;
      return _react2.default.createElement(
        "div",
        { id: customizedId },
        _react2.default.createElement(CollapseMenu, {
          title: title,
          uiSchema: uiSchema,
          collapsed: collapsed,
          formContext: formContext,
          onAdd: this.handleAdd,
          onChange: this.handleCollapsed
        }),
        _react2.default.createElement(
          "div",
          { className: "form-group" },
          AddElement && _react2.default.createElement(AddElement, null),
          !collapsed && _react2.default.createElement(CollapseLegend, this.props),
          !collapsed && _react2.default.createElement(CollapseElement, this.props)
        )
      );
    }
  }]);

  return CollapsibleField;
}(_react.Component);

CollapsibleField.propTypes = {
  uiSchema: _propTypes2.default.shape({
    collapse: _propTypes2.default.shape({
      field: _propTypes2.default.string.isRequired,
      icon: _propTypes2.default.shape({
        enabled: _propTypes2.default.string,
        disabled: _propTypes2.default.string,
        add: _propTypes2.default.string
      }),
      separate: _propTypes2.default.boolean,
      addTo: _propTypes2.default.string,
      addElement: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.string]),
      legend: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
        component: _propTypes2.default.string.isRequired,
        props: _propTypes2.default.object
      })]),
      actions: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        component: _propTypes2.default.string.isRequired,
        props: _propTypes2.default.object
      })),
      wrapClassName: _propTypes2.default.string
    }).isRequired
  }).isRequired,
  registry: _propTypes2.default.shape({
    fields: _propTypes2.default.object.isRequired
  }).isRequired
};

exports.default = CollapsibleField;