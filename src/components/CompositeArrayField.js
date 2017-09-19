import React from "react";

class CompositeArrayField extends React.Component {
  handleAdd = list => {
    let { formData = [] } = this.props;
    let newTable = formData.concat(list);
    this.props.onChange(newTable);
  };

  render() {
    let {
      uiSchema: { inputField, arrayField },
      registry: { fields },
    } = this.props;

    let InputElement = fields[inputField];
    let ArrayElement = fields[arrayField];
    return (
      <div>
        <div className="form-group">
          <InputElement {...this.props} onChange={this.handleAdd} />
        </div>
        <div className="form-group">
          <ArrayElement {...this.props} />
        </div>
      </div>
    );
  }
}

export default CompositeArrayField;
