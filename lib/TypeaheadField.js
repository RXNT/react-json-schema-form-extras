"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncTypeaheadField = exports.TypeaheadField = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.mapToSchema = mapToSchema;
exports.mapFromSchema = mapFromSchema;
exports.toSelected = toSelected;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrapTypeahead = require("react-bootstrap-typeahead");

var _utils = require("./utils");

var _selectn = require("selectn");

var _selectn2 = _interopRequireDefault(_selectn);

var _Label = require("./Label");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_OPTIONS = {
  required: false,
  labelKey: "name",
  minLength: 3,
  placeholder: "Search...",
  ref: "typeahead"
};

function optionToString(fields, separator) {
  return function (option) {
    return fields.map(function (field) {
      return (0, _selectn2.default)(field, option);
    }).filter(function (fieldVal) {
      return fieldVal;
    }).reduce(function (agg, fieldVal, i) {
      if (i === 0) {
        return fieldVal;
      } else {
        if (Array.isArray(separator)) {
          return "" + agg + separator[i - 1] + fieldVal;
        }
        return "" + agg + separator + fieldVal;
      }
    }, "");
  };
}

function mapLabelKey(labelKey) {
  if (Array.isArray(labelKey)) {
    return optionToString(labelKey, " ");
  } else if ((typeof labelKey === "undefined" ? "undefined" : _typeof(labelKey)) === "object" && labelKey.fields && labelKey.separator) {
    var fields = labelKey.fields,
        separator = labelKey.separator;

    return optionToString(fields, separator);
  }
  return labelKey;
}

function defaultValue(properties) {
  var defVal = Object.keys(properties).reduce(function (agg, field) {
    if (properties[field].default !== undefined) {
      agg[field] = properties[field].default;
    }
    return agg;
  }, {});
  return defVal;
}

function mapToObject(event, mapping, defVal) {
  var schemaEvent = Object.keys(mapping).reduce(function (agg, field) {
    var eventField = mapping[field];
    if ((typeof eventField === "undefined" ? "undefined" : _typeof(eventField)) === "object") {
      agg[field] = mapToObject(event, eventField, {});
    } else {
      agg[field] = (0, _selectn2.default)(eventField, event);
    }
    return agg;
  }, Object.assign({}, defVal));
  return schemaEvent;
}

function mapEvents(events, _ref, mapping) {
  var type = _ref.type,
      properties = _ref.properties,
      items = _ref.items;

  if (events.length === 0) {
    return [(0, _utils.getDefaultValueForSchema)({ type: type })];
  }
  if (!mapping || mapping === null) {
    if (type === "string") {
      return events.map(function (item) {
        return (typeof item === "undefined" ? "undefined" : _typeof(item)) === "object" ? item.label : item;
      });
    }
    return events;
  } else if (typeof mapping === "string") {
    return events.map(function (event) {
      return typeof event === "string" ? event : (0, _selectn2.default)(mapping, event);
    });
  } else if (typeof mapping === "function") {
    return events.map(function (event) {
      return mapping(event);
    });
  } else if ((typeof mapping === "undefined" ? "undefined" : _typeof(mapping)) === "object") {
    var defVal = defaultValue(properties ? properties : items && items.properties ? items.properties : {});
    var mappedEvents = events.map(function (event) {
      return mapToObject(event, mapping, defVal);
    });

    return mappedEvents;
  }
}

function mapToSchema(events, schema, mapping) {
  var schemaEvents = mapEvents(events, schema, mapping);
  return (0, _utils.isArraySchema)(schema) ? schemaEvents : schemaEvents[0];
}

function mapFromObject(data, mapping, defVal) {
  return Object.keys(mapping).reduce(function (agg, field) {
    var eventField = mapping[field];
    if ((typeof eventField === "undefined" ? "undefined" : _typeof(eventField)) === "object") {
      Object.assign(agg, mapFromObject(data[field], mapping, {}));
    } else {
      if (data[field]) {
        agg[eventField] = data[field];
      }
    }
    return agg;
  }, defVal);
}
/**
 *
 * @param {*} data
 * @param {*} mapping
 * Mapped object is converted to the object mapping takes
 */
function mapFromSchema(data, mapping) {
  if (isEmpty(data)) {
    return;
  }
  if (!mapping || mapping === null) {
    return data;
  } else if ((typeof mapping === "undefined" ? "undefined" : _typeof(mapping)) === mapping) {
    return _defineProperty({}, mapping, data);
  } else if ((typeof mapping === "undefined" ? "undefined" : _typeof(mapping)) === "object") {
    return mapFromObject(data, mapping, {});
  } else {
    return data;
  }
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function toSelected(formData, schema, mapping, options) {
  var normFormData = formData ? (0, _utils.toArray)(formData) : [];
  if ((0, _utils.isObjectSchema)(schema)) {
    return normFormData.map(function (selected) {
      return mapFromSchema(selected, mapping);
    }).filter(function (x) {
      return x !== undefined;
    });
  } else if (options && ((0, _utils.isStringSchema)(schema) || (0, _utils.isNumberSchema)(schema)) && typeof mapping === "string") {
    return normFormData.map(function (dataItem) {
      return options.find(function (option) {
        if (option[mapping] === dataItem) {
          return option;
        }
      });
    }).filter(function (x) {
      return x !== undefined;
    });
  } else if ((0, _utils.isArraySchema)(schema)) {
    return normFormData.map(function (dataItem) {
      if ((typeof mapping === "undefined" ? "undefined" : _typeof(mapping)) === "object") {
        return mapFromSchema(dataItem, mapping);
      }
      if (options) {
        return options.find(function (option) {
          if (option[mapping] === dataItem) {
            return option;
          }
        });
      } else {
        return dataItem;
      }
    }).filter(function (x) {
      return x !== undefined;
    });
  } else {
    return normFormData;
  }
}

function isFunction(functionToCheck) {
  return functionToCheck instanceof Function;
}

/*
 this is done to prevent an edge case with a typeahead wrapped inside a table that has an item selected & uses a function as a labelKey
 TODO: Need to find a better solution for this
 */
function transformLabelKey(labelKey, schema, selected) {
  if (isFunction(labelKey) && selected && selected.length > 0 && schema.type === "string" && selected.every(function (x) {
    return typeof x === "string" || x instanceof String;
  })) {
    return "";
  } else {
    return labelKey;
  }
}

var BaseTypeaheadField = function (_Component) {
  _inherits(BaseTypeaheadField, _Component);

  function BaseTypeaheadField() {
    var _ref3;

    var _temp, _this, _ret;

    _classCallCheck(this, BaseTypeaheadField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = BaseTypeaheadField.__proto__ || Object.getPrototypeOf(BaseTypeaheadField)).call.apply(_ref3, [this].concat(args))), _this), _this.handleSelectionChange = function (conf) {
      return function (events) {
        var mapping = conf.mapping,
            _conf$cleanAfterSelec = conf.cleanAfterSelection,
            cleanAfterSelection = _conf$cleanAfterSelec === undefined ? false : _conf$cleanAfterSelec;
        var schema = _this.props.schema;


        _this.setState({
          selected: events
        });

        if (events.length > 0) {
          var schemaEvents = mapToSchema(events, schema, mapping);
          _this.props.onChange(schemaEvents);
          if (cleanAfterSelection) {
            setTimeout(function () {
              if (_this.refs.typeahead) {
                _this.refs.typeahead.getInstance().clear();
              }
            }, 0);
          }
        }
      };
    }, _this.handleBlur = function () {
      var selected = _this.state.selected;


      if (selected.length === 0) {
        _this.setState({
          selected: []
        });
        if (_this.refs.typeahead) {
          _this.refs.typeahead.getInstance() && _this.refs.typeahead.getInstance().clear();
        }
        // let onChangeValue = getDefaultValueForSchema(schema);
        // remove the field if the value is empty
        _this.props.onChange(undefined);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BaseTypeaheadField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props$uiSchema$focus = this.props.uiSchema.focusOnMount,
          focusOnMount = _props$uiSchema$focus === undefined ? false : _props$uiSchema$focus;

      if (focusOnMount) {
        this.refs.typeahead.getInstance().focus();
      }
    }
  }]);

  return BaseTypeaheadField;
}(_react.Component);

function isValidFormData(data) {
  return data && !isEmpty(data);
}

var TypeaheadField = exports.TypeaheadField = function (_BaseTypeaheadField) {
  _inherits(TypeaheadField, _BaseTypeaheadField);

  function TypeaheadField(props) {
    _classCallCheck(this, TypeaheadField);

    var _this2 = _possibleConstructorReturn(this, (TypeaheadField.__proto__ || Object.getPrototypeOf(TypeaheadField)).call(this, props));

    var _this2$props = _this2.props,
        schema = _this2$props.schema,
        typeahead = _this2$props.uiSchema.typeahead,
        formData = _this2$props.formData;


    _this2.state = {
      selected: isValidFormData(formData) ? toSelected(formData, schema, typeahead.mapping, typeahead.options) : []
    };
    return _this2;
  }

  _createClass(TypeaheadField, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          typeahead = _props.uiSchema.typeahead,
          _props$idSchema = _props.idSchema;
      _props$idSchema = _props$idSchema === undefined ? {} : _props$idSchema;
      var $id = _props$idSchema.$id,
          schema = _props.schema,
          disabled = _props.disabled;


      var labelKey = mapLabelKey(typeahead.labelKey);
      // if something is already selected and is a string - removing the label key so that the labelKey function can be ignored.
      labelKey = transformLabelKey(labelKey, schema, this.state.selected);

      var typeConf = Object.assign({}, DEFAULT_OPTIONS, typeahead, {
        onChange: this.handleSelectionChange(typeahead),
        labelKey: labelKey,
        selected: this.state.selected,
        onBlur: this.handleBlur,
        disabled: disabled
      });

      return _react2.default.createElement(
        "div",
        { id: $id },
        _react2.default.createElement(_Label.DefaultLabel, this.props),
        _react2.default.createElement(_reactBootstrapTypeahead.Typeahead, typeConf)
      );
    }
  }]);

  return TypeaheadField;
}(BaseTypeaheadField);

TypeaheadField.propTypes = {
  schema: _propTypes2.default.object.isRequired,
  uiSchema: _propTypes2.default.shape({
    focusOnMount: _propTypes2.default.bool,
    typeahead: _propTypes2.default.shape({
      options: _propTypes2.default.array.isRequired,
      mapping: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string, _propTypes2.default.object]),
      cleanAfterSelection: _propTypes2.default.bool
    }).isRequired
  }).isRequired
};

var AsyncTypeaheadField = exports.AsyncTypeaheadField = function (_BaseTypeaheadField2) {
  _inherits(AsyncTypeaheadField, _BaseTypeaheadField2);

  function AsyncTypeaheadField(props) {
    _classCallCheck(this, AsyncTypeaheadField);

    var _this3 = _possibleConstructorReturn(this, (AsyncTypeaheadField.__proto__ || Object.getPrototypeOf(AsyncTypeaheadField)).call(this, props));

    _this3.handleSearch = function (query) {
      if (!query) {
        return;
      }

      var _this3$props$uiSchema = _this3.props.uiSchema.asyncTypeahead,
          url = _this3$props$uiSchema.url,
          optionsPath = _this3$props$uiSchema.optionsPath,
          _this3$props$uiSchema2 = _this3$props$uiSchema.search,
          search = _this3$props$uiSchema2 === undefined ? function (url, query) {
        return fetch(url + "?query=" + query).then(function (res) {
          return res.json();
        });
      } : _this3$props$uiSchema2;


      _this3.setState({ isLoading: true });

      search(url, query).then(function (json) {
        return optionsPath ? (0, _selectn2.default)(optionsPath, json) : json;
      }).then(function (options) {
        return _this3.setState({ options: options, isLoading: false });
      });
    };

    _this3.handleOnFocus = function () {
      var _this3$props$uiSchema3 = _this3.props.uiSchema.asyncTypeahead,
          url = _this3$props$uiSchema3.url,
          optionsPath = _this3$props$uiSchema3.optionsPath,
          _this3$props$uiSchema4 = _this3$props$uiSchema3.queryOnFocus,
          queryOnFocus = _this3$props$uiSchema4 === undefined ? "" : _this3$props$uiSchema4,
          minLength = _this3$props$uiSchema3.minLength,
          _this3$props$uiSchema5 = _this3$props$uiSchema3.search,
          search = _this3$props$uiSchema5 === undefined ? function (url, query) {
        return fetch(url + "?query=" + query).then(function (res) {
          return res.json();
        });
      } : _this3$props$uiSchema5;


      if (minLength === 0) {
        _this3.setState({ isLoading: true });
        search(url, queryOnFocus).then(function (json) {
          return optionsPath ? (0, _selectn2.default)(optionsPath, json) : json;
        }).then(function (options) {
          return _this3.setState({ options: options, isLoading: false });
        });
      }
    };

    var _this3$props = _this3.props,
        schema = _this3$props.schema,
        asyncTypeahead = _this3$props.uiSchema.asyncTypeahead,
        formData = _this3$props.formData;


    _this3.state = {
      options: [],
      isLoading: false,
      selected: isValidFormData(formData) ? toSelected(formData, schema, asyncTypeahead.mapping) : []
    };
    return _this3;
  }

  _createClass(AsyncTypeaheadField, [{
    key: "render",
    value: function render() {
      var _props2 = this.props,
          asyncTypeahead = _props2.uiSchema.asyncTypeahead,
          _props2$idSchema = _props2.idSchema;
      _props2$idSchema = _props2$idSchema === undefined ? {} : _props2$idSchema;
      var $id = _props2$idSchema.$id,
          schema = _props2.schema,
          disabled = _props2.disabled;


      var labelKey = mapLabelKey(asyncTypeahead.labelKey);
      // if something is already selected and is a string - removing the label key so that the labelKey function can be ignored.
      labelKey = transformLabelKey(labelKey, schema, this.state.selected);

      var typeConf = Object.assign({}, DEFAULT_OPTIONS, asyncTypeahead, {
        selected: this.state.selected,
        isLoading: this.state.isLoading,
        labelKey: labelKey,
        onChange: this.handleSelectionChange(asyncTypeahead),
        onSearch: this.handleSearch,
        options: this.state.options,
        onFocus: this.handleOnFocus,
        onBlur: this.handleBlur,
        disabled: disabled
      });

      if (asyncTypeahead.overrideOptions) {
        typeConf.onInputChange = this.props.onChange;
      }

      return _react2.default.createElement(
        "div",
        { id: $id },
        _react2.default.createElement(_Label.DefaultLabel, this.props),
        _react2.default.createElement(_reactBootstrapTypeahead.AsyncTypeahead, typeConf)
      );
    }
  }]);

  return AsyncTypeaheadField;
}(BaseTypeaheadField);

AsyncTypeaheadField.propTypes = {
  schema: _propTypes2.default.object.isRequired,
  uiSchema: _propTypes2.default.shape({
    focusOnMount: _propTypes2.default.bool,
    asyncTypeahead: _propTypes2.default.shape({
      url: _propTypes2.default.string,
      optionsPath: _propTypes2.default.string,
      mapping: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string, _propTypes2.default.object]),
      cleanAfterSelection: _propTypes2.default.bool,
      overrideOptions: _propTypes2.default.bool,
      search: _propTypes2.default.func
    }).isRequired
  })
};