import React, { Component } from "react";
import PropTypes from "prop-types";
import DayPickerInput from "react-day-picker/DayPickerInput";

export default class ReactDatePicker extends Component {
  handleKeyDown = evt => {
    if (evt.keyCode === 13) {
      this.refs.datePicker.getInput().blur();
    }
  };

  handleDayChange = day => {
    let { schema: { format = "date-time" }, onChange } = this.props;
    if (day === undefined) {
      onChange(undefined);
    } else if (format === "date-time") {
      onChange(day.toISOString());
    } else if (format === "date") {
      onChange(`${day.toISOString().substr(0, 10)}`);
    }
  };

  render() {
    let { uiSchema: { rdp }, formData } = this.props;
    let dayPickerInputProps = Object.assign(
      {
        onDayChange: this.handleDayChange,
        value: formData ? new Date(formData) : undefined,
        hideOnDayClick: true,
        ref: "datePicker",
        inputProps: {
          className: "form-control",
        },
      },
      rdp
    );

    return (
      <div onKeyDown={this.handleKeyDown}>
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
