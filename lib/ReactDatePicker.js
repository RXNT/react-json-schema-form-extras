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

var _DayPickerInput = require("react-day-picker/DayPickerInput");

var _DayPickerInput2 = _interopRequireDefault(_DayPickerInput);

var _moment = require("react-day-picker/moment");

var _Label = require("./Label");

var _moment2 = require("moment");

var _moment3 = _interopRequireDefault(_moment2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
var DEFAULT_UPDATE_DELAY = 100;
var YEAR_DISPLAY_FROM = 1910;
var YEAR_DISPLAY_TO = new Date().getFullYear() + 20;

function normalizeDay(day, format) {
  if (day === undefined) {
    return undefined;
  } else if (format === "date-time") {
    return day.toISOString();
  } else if (format === "date") {
    return (0, _moment3.default)(day).format("YYYY-MM-DD");
  }
}

var currentYear = new Date().getFullYear();
var fromMonth = new Date(currentYear, 0);

function loadFormatedDate(date, setCurrentDate) {
  var formDate = date;
  if (!date || date === "") {
    formDate = setCurrentDate ? (0, _moment3.default)(new Date()).format("MM/DD/YYYY") : "";
  }
  return formDate;
}

function YearMonthForm(_ref) {
  var date = _ref.date,
      localeUtils = _ref.localeUtils,
      onChange = _ref.onChange;

  var months = localeUtils.getMonths();
  var years = [];
  for (var i = YEAR_DISPLAY_FROM; i <= YEAR_DISPLAY_TO; i += 1) {
    years.push(i);
  }

  var handleChange = function handleChange(e) {
    var _e$target$form = e.target.form,
        year = _e$target$form.year,
        month = _e$target$form.month;

    onChange(new Date(year.value, month.value));
  };

  return _react2.default.createElement(
    "div",
    { className: "DayPicker-Caption" },
    _react2.default.createElement(
      "select",
      { name: "month", onChange: handleChange, value: date.getMonth() },
      months.map(function (month, i) {
        return _react2.default.createElement(
          "option",
          { key: month, value: i },
          month
        );
      })
    ),
    _react2.default.createElement(
      "select",
      { name: "year", onChange: handleChange, value: date.getFullYear() },
      years.map(function (year) {
        return _react2.default.createElement(
          "option",
          { key: year, value: year },
          year
        );
      })
    )
  );
}

var ReactDatePicker = function (_Component) {
  _inherits(ReactDatePicker, _Component);

  function ReactDatePicker(props) {
    _classCallCheck(this, ReactDatePicker);

    var _this = _possibleConstructorReturn(this, (ReactDatePicker.__proto__ || Object.getPrototypeOf(ReactDatePicker)).call(this, props));

    _initialiseProps.call(_this);

    _this.handleYearMonthChange = _this.handleYearMonthChange.bind(_this);
    _this.state = {
      month: fromMonth
    };
    var _props$schema$format = props.schema.format,
        format = _props$schema$format === undefined ? "date-time" : _props$schema$format,
        formData = props.formData;

    _this.day = formData ? format === "date" ? new Date(formData).toISOString().substr(0, 10) : new Date(formData) : undefined;
    return _this;
  }

  _createClass(ReactDatePicker, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref2) {
      var _ref2$schema$format = _ref2.schema.format,
          format = _ref2$schema$format === undefined ? "date-time" : _ref2$schema$format,
          formData = _ref2.formData;

      if (formData) {
        this.day = format === "date" ? new Date(formData).toISOString().substr(0, 10) : new Date(formData);
      }
    }
  }, {
    key: "handleYearMonthChange",
    value: function handleYearMonthChange(month) {
      this.setState({ month: month });
      setTimeout(this.notifyChange, 0); //do we need a fixed time delay??
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$uiSchema = _props.uiSchema,
          uiSchema = _props$uiSchema === undefined ? {} : _props$uiSchema,
          formData = _props.formData,
          _props$schema$format2 = _props.schema.format,
          format = _props$schema$format2 === undefined ? "date-time" : _props$schema$format2;

      var dayPickerProps = {
        month: this.state.month,
        captionElement: function captionElement(_ref3) {
          var date = _ref3.date,
              localeUtils = _ref3.localeUtils;
          return _react2.default.createElement(YearMonthForm, {
            date: date,
            localeUtils: localeUtils,
            onChange: _this2.handleYearMonthChange
          });
        },
        inputProps: {
          className: "form-control",
          type: "text"
        }
      };
      var _uiSchema$rdp = uiSchema.rdp,
          rdp = _uiSchema$rdp === undefined ? {} : _uiSchema$rdp,
          _uiSchema$defaultCurr = uiSchema.defaultCurrentDate,
          defaultCurrentDate = _uiSchema$defaultCurr === undefined ? false : _uiSchema$defaultCurr;


      formData = loadFormatedDate(formData, defaultCurrentDate); // to load the formated date
      var dayPickerInputProps = Object.assign({
        onDayChange: this.handleDayChange,
        keepFocus: false,
        value: formData ? format === "date" ? (0, _moment3.default)(formData).format("MM/DD/YYYY") : new Date(formData) : undefined,
        hideOnDayClick: true,
        ref: "datePicker",
        format: "MM/DD/YYYY",
        formatDate: _moment.formatDate,
        parseDate: _moment.parseDate,
        inputProps: {
          className: "form-control",
          type: "text",
          autoFocus: uiSchema["ui:autofocus"]
        }
      }, rdp);
      dayPickerInputProps.inputProps.onBlur = this.handleBlur;

      return _react2.default.createElement(
        "div",
        { onKeyDown: this.handleKeyDown },
        _react2.default.createElement(_Label.DefaultLabel, this.props),
        _react2.default.createElement(_DayPickerInput2.default, _extends({
          dayPickerProps: dayPickerProps
        }, dayPickerInputProps))
      );
    }
  }]);

  return ReactDatePicker;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handleKeyDown = function (evt) {
    var eventCode = evt.which ? evt.which : event.keyCode;
    if (eventCode === 13) {
      _this3.refs.datePicker.getInput().blur();
      _this3.notifyChange();
    } else if (eventCode > 31 && (eventCode < 48 || eventCode > 57) && (eventCode < 96 || eventCode > 105) && eventCode != 191) {
      evt.preventDefault();
    } /* date filed Validation , will accept only number and forward slash */
  };

  this.handleClick = function (evt) {
    _this3.setState({ overlay: true });
  };

  this.handleBlur = function () {
    var _props$uiSchema2 = _this3.props.uiSchema;
    _props$uiSchema2 = _props$uiSchema2 === undefined ? {} : _props$uiSchema2;
    var _props$uiSchema2$rdp = _props$uiSchema2.rdp;
    _props$uiSchema2$rdp = _props$uiSchema2$rdp === undefined ? {} : _props$uiSchema2$rdp;
    var _props$uiSchema2$rdp$ = _props$uiSchema2$rdp.updateDelay,
        updateDelay = _props$uiSchema2$rdp$ === undefined ? DEFAULT_UPDATE_DELAY : _props$uiSchema2$rdp$;
  };

  this.notifyChange = function () {
    var day = _this3.day;
    var _props2 = _this3.props,
        _props2$schema$format = _props2.schema.format,
        format = _props2$schema$format === undefined ? "date-time" : _props2$schema$format,
        onChange = _props2.onChange,
        formData = _props2.formData;

    var event = normalizeDay(day, format);
    if (event !== formData && event != undefined) {
      onChange(event);
    }
  };

  this.handleDayChange = function (day) {
    _this3.day = day;
    setTimeout(_this3.notifyChange, 0); //do we need a fixed time delay??
  };
};

exports.default = ReactDatePicker;


ReactDatePicker.propTypes = {
  schema: _propTypes2.default.shape({
    format: _propTypes2.default.oneOf(["date-time", "date"])
  })
};