import React, { Component } from "react";
import RichTextEditor from "react-rte";

const DEFAULT_FORMAT = "html";

export default class RTEField extends Component {
  constructor(props) {
    super(props);

    let {
      formData = "",
      uiSchema: { rte: { format = DEFAULT_FORMAT } = {} },
    } = props;

    this.state = {
      value: RichTextEditor.createValueFromString(formData, format),
    };
  }

  handleChange = value => {
    let {
      uiSchema: { rte: { format = DEFAULT_FORMAT } = {} },
      onChange,
    } = this.props;
    this.setState({ value });
    if (onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      onChange(value.toString(format));
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
