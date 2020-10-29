import React, { Component } from "react";
import PropTypes from "prop-types";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import { DefaultLabel } from "./Label";
import moment from "moment";
/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
const DEFAULT_UPDATE_DELAY = 100;
const YEAR_DISPLAY_FROM = 1910;
const YEAR_DISPLAY_TO = new Date().getFullYear() + 20;

function normalizeDay(day, format) {
  if (day === undefined) {
    return undefined;
  } else if (format === "date-time") {
    return day.toISOString();
  } else if (format === "date") {
    return moment(day).format("YYYY-MM-DD");
  }
}

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);

function loadFormatedDate(date, setCurrentDate) {
  let formDate = date;
  if (!date || date === "") {
    formDate = setCurrentDate ? moment(new Date()).format("MM/DD/YYYY") : "";
  }
  return formDate;
}

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();
  const years = [];
  for (let i = YEAR_DISPLAY_FROM; i <= YEAR_DISPLAY_TO; i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    if (e.target.form !== null) {
      const { year, month } = e.target.form;
      onChange(new Date(year.value, month.value));
    } else {
      if (e.target.name === "month") {
        onChange(new Date(e.target.value, date.getFullYear()));
      } else {
        //Year
        onChange(new Date(date.getMonth(), e.target.value));
      }
    }
  };

  return (
    <div className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
export default class ReactDatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
    this.state = {
      month: fromMonth
    };
    let { schema: { format = "date-time" }, formData } = props;
    this.day = formData
      ? format === "date"
        ? new Date(formData).toISOString().substr(0, 10)
        : new Date(formData)
      : undefined;
  }

  componentWillReceiveProps({ schema: { format = "date-time" }, formData }) {
    if (formData) {
      this.day =
        format === "date"
          ? new Date(formData).toISOString().substr(0, 10)
          : new Date(formData);
    }
  }

  handleKeyDown = evt => {
    var eventCode = evt.which ? evt.which : event.keyCode;
    if (eventCode === 13) {
      this.refs.datePicker.getInput().blur();
      this.notifyChange();
    } else if (
      eventCode > 31 &&
      ((eventCode < 48 || eventCode > 57) &&
        (eventCode < 96 || eventCode > 105)) &&
      eventCode != 191
    ) {
      evt.preventDefault();
    } /* date filed Validation , will accept only number and forward slash */
  };

  handleClick = evt => {
    this.setState({ overlay: true });
  };

  handleBlur = () => {
    let {
      uiSchema: { rdp: { updateDelay = DEFAULT_UPDATE_DELAY } = {} } = {} //eslint-disable-line
    } = this.props;
  };

  notifyChange = () => {
    let day = this.day;
    let { schema: { format = "date-time" }, onChange, formData } = this.props;
    let event = normalizeDay(day, format);
    if (event !== formData && event != undefined) {
      onChange(event);
    }
  };

  handleDayChange = day => {
    this.day = day;
    setTimeout(this.notifyChange, 0); //do we need a fixed time delay??
  };
  handleYearMonthChange(month) {
    this.setState({ month });
    setTimeout(this.notifyChange, 0); //do we need a fixed time delay??
  }
  render() {
    let {
      uiSchema = {},
      formData,
      schema: { format = "date-time" }
    } = this.props;
    const dayPickerProps = {
      month: this.state.month,
      captionElement: ({ date, localeUtils }) => (
        <YearMonthForm
          date={date}
          localeUtils={localeUtils}
          onChange={this.handleYearMonthChange}
        />
      ),
      inputProps: {
        className: "form-control",
        type: "text"
      }
    };
    let { rdp = {}, defaultCurrentDate = false } = uiSchema;

    formData = loadFormatedDate(formData, defaultCurrentDate); // to load the formated date
    let dayPickerInputProps = Object.assign(
      {
        onDayChange: this.handleDayChange,
        keepFocus: false,
        value: formData
          ? format === "date"
            ? moment(formData).format("MM/DD/YYYY")
            : new Date(formData)
          : undefined,
        hideOnDayClick: true,
        ref: "datePicker",
        format: "MM/DD/YYYY",
        formatDate: formatDate,
        parseDate: parseDate,
        inputProps: {
          className: "form-control",
          type: "text",
          autoFocus: uiSchema["ui:autofocus"]
        }
      },
      rdp
    );
    dayPickerInputProps.inputProps.onBlur = this.handleBlur;

    return (
      <div onKeyDown={this.handleKeyDown}>
        <DefaultLabel {...this.props} />
        <DayPickerInput
          dayPickerProps={dayPickerProps}
          {...dayPickerInputProps}
        />
      </div>
    );
  }
}

ReactDatePicker.propTypes = {
  schema: PropTypes.shape({
    format: PropTypes.oneOf(["date-time", "date"])
  })
};
