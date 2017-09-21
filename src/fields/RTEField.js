import React, { Component } from "react";
import RichTextEditor from "react-rte";

export default class RTEField extends Component {
  constructor(props) {
    super(props);

    let { formData = "" } = props;

    this.state = {
      value: RichTextEditor.createValueFromString(formData, "html"),
    };
  }

  handleChange = value => {
    this.setState({ value });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(value.toString("html"));
    }
  };

  render() {
    let { uiSchema: { rte } } = this.props;

    return (
      <RichTextEditor
        {...rte}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
