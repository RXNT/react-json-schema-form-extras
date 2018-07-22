import React, { Component } from "react";

export default class SignatureCheckbox extends Component {
  constructor(props) {
    super(props);
    this.updateFormData = this.updateFormData.bind(this);
    this.selectionChange = this.selectionChange.bind(this);
    this.state = {
      value: (typeof this.props.formData === "undefined"? false : this.props.formData.imgSelected)
    };
  }

  updateFormData = () => {
    let { formData, field } = this.props;
    const updatedData = {
      imgSelected: this.state.value,
      format: this.state.value ? formData.format : "",
      base64Image: this.state.value ? formData.base64Image : "",
    };
    console.log(field);
    console.log(updatedData);
  };

  selectionChange(value) {
      this.setState({ value }, () => this.updateFormData());
  }

  render() {
    let { formData, schema: { properties }, uiSchema } = this.props;
    const disabled = Boolean(uiSchema["ui:disabled"]);
    let imgSrc = null;
    if (formData !== null && formData !== undefined) {
        if (formData.format && formData.base64Image) {
          imgSrc = `data:image/${formData.format};base64,${formData.base64Image}`;
        }
    }
    
    return (
        <div>
            <input type="checkbox"
                disabled={disabled}
                checked={this.state.value}
                onChange={event => this.selectionChange(event.target.checked)} ></input>
            <span>{properties.imgSelected.title}</span>
            {this.state.value && <img src={imgSrc} />}
        </div>
    );
  }
}
