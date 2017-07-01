import React, { Component } from "react";
import PropTypes from "prop-types";
import { isDevelopment } from "./utils";

export default function applyExtras(FormComponent) {
  class FormWithExtras extends Component {
    constructor(props) {
      super(props);

      //STUBBED
    }

    render() {
      let configs = Object.assign({}, this.props);

      delete configs.schema;
      delete configs.uiSchema;

      return (
        <FormComponent
          {...configs}
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
        />
      );
    }
  }

  return FormWithExtras;
}
