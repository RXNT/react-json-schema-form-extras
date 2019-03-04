import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";


export default class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    const { formData = '' } = this.props;
    this.state = {
      dateTimeValue: moment(formData).format("YYYY-MM-DDTHH:mm")
    };
  }
  updateData(value) {
    let {
      onChange,
    } = this.props;
    if (value !== '') {
      this.setState({ dateTimeValue: value });//2019-02-07T14:02
      onChange(moment(value).format("YYYY-MM-DDTHH:mm"));
    }
  }
  render() {
    return (
      <input
        ref='inputRef'
        type="datetime-local"
        style={{ display: 'inline', width: '100%' }}
        value={this.state.dateTimeValue}
        onChange={e => this.updateData(e.currentTarget.value)} />
    );
  }
}

DateTimePicker.propTypes = {
  schema: PropTypes.shape({
    format: PropTypes.oneOf(["date-time"])
  })
};
