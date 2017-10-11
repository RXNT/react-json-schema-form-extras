import React, { Component } from "react";
import PropTypes from "prop-types";
import { toArray } from "./utils";

class CompositeArrayField extends Component {
  handleAdd = list => {
    let { formData = [] } = this.props;
    let newTable = formData.concat(toArray(list));
    this.props.onChange(newTable);
  };

  render() {
    let {
      uiSchema: { inputField, arrayField },
      registry: { fields },
    } = this.props;

    let inputProps = Object.assign({}, this.props, { formData: undefined });

    let InputElement = fields[inputField];
    let ArrayElement = fields[arrayField];
    return (
      <div>
        <div className="form-group">
          <InputElement {...inputProps} onChange={this.handleAdd} />
        </div>
        <div className="form-group">
          <ArrayElement {...this.props} />
        </div>
      </div>
    );
  }
}

CompositeArrayField.propTypes = {
  uiSchema: PropTypes.shape({
    inputField: PropTypes.string.isRequired,
    arrayField: PropTypes.string.isRequired,
  }).isRequired,
  registry: PropTypes.shape({
    fields: PropTypes.object.isRequired,
  }).isRequired,
};

export default CompositeArrayField;
