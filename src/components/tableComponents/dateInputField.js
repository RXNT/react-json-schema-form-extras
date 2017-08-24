import React from "react";

class DateField extends React.Component {
  constructor(props) {
    super(props);

    this.state = { date: props.defaultValue };
    this.updateData = this.updateData.bind(this);
  }
  updateData() {
    this.props.onUpdate(this.state.date);
  }
  render() {
    return (
      <span>
        <input
          className={
            (this.props.editorClass || "") + " form-control editor edit-text"
          }
          style={{ display: "inline" }}
          type="date"
          value={this.state.date}
          onChange={ev => {
            this.setState({ date: ev.currentTarget.value });
          }}
          onBlur={this.updateData}
        />
      </span>
    );
  }
}

export default DateField;
