import React, { Component } from "react";
import PropTypes from "prop-types";
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

  updateFormData = () => {
    let {
      uiSchema: { rte: { format = DEFAULT_FORMAT } = {} },
      onChange,
    } = this.props;
    let { value } = this.state;
    if (onChange) {
      onChange(value.toString(format));
    }
  };

  handleChange = value => {
    let { uiSchema: { updateOnBlur = false } } = this.props;
    this.setState({ value }, () => !updateOnBlur && this.updateFormData());
  };

  handleBlur = () => {
    let { uiSchema: { updateOnBlur = false } } = this.props;
    if (updateOnBlur) {
      this.updateFormData();
    }
  };

  render() {
    let { uiSchema: { rte }, idSchema: { $id } } = this.props;
    let autoFocus = this.props.uiSchema["ui:autofocus"];

    return (
      <div id={$id}>
        <RichTextEditor
          onBlur={this.handleBlur}
          {...rte}
          autoFocus={autoFocus}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

RTEField.propTypes = {
  uiSchema: PropTypes.shape({
    updateOnBlur: PropTypes.bool,
    rte: PropTypes.shape({
      format: PropTypes.string,
    }),
  }),
};
