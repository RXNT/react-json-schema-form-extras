import React, { Component } from "react";
import PropTypes from "prop-types";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import { DefaultLabel } from "./Label";
import moment from "moment";

const DEFAULT_UPDATE_DELAY = 100;

function normalizeDay(day, format) {
  if (day === undefined) {
    return undefined;
  } else if (format === "date-time") {
    return day.toISOString();
  } else if (format === "date") {
    return moment(day).format("YYYY-MM-DD");
  }
}

function loadFormatedDate(date, setCurrentDate){
  let formDate = date;
  if(!date || date === ''){
    formDate = (setCurrentDate) 
    ? (moment(new Date()).format("MM/DD/YYYY")) : '';
  }
  return formDate;
}
export default class ReactDatePicker extends Component {
  constructor(props) {
    super(props);

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

  handleBlur = () => {
    let {
      uiSchema: { rdp: { updateDelay = DEFAULT_UPDATE_DELAY } = {} } = {}, //eslint-disable-line
    } = this.props;
    setTimeout(this.notifyChange, 0); //do we need a fixed time delay??
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
  };

  render() {
    let {
      uiSchema = {},
      formData,
      idSchema: { $id } = {},
      schema: { format = "date-time" },
    } = this.props;
        let { rdp = {}, defaultCurrentDate=false } = uiSchema;

    formData = loadFormatedDate(formData, defaultCurrentDate); // to load the formated date
    let dayPickerInputProps = Object.assign(
      {
        onDayChange: this.handleDayChange,
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
          autoFocus: uiSchema["ui:autofocus"],
        },
      },
      rdp
    );
    dayPickerInputProps.inputProps.onBlur = this.handleBlur;

    return (
      <div onKeyDown={this.handleKeyDown} id={$id}>
        <DefaultLabel {...this.props} />
        <DayPickerInput {...dayPickerInputProps} />
      </div>
    );
  }
}

ReactDatePicker.propTypes = {
  schema: PropTypes.shape({
    format: PropTypes.oneOf(["date-time", "date"]),
  }),
};
