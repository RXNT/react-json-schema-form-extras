import React, { Component } from "react";
import PropTypes from "prop-types";
import { isDevelopment} from "./utils";
import AllergyTypeaheadWidget from './components/allergyTypeaheadWidget';
import MedicationTypeaheadWidget from './components/medicationTypeaheadWidget';

export default function applyExtras(FormComponent) {

  class FormWithExtras extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      let configs = Object.assign({}, this.props);

      delete configs.schema;
      delete configs.uiSchema;

      let widgets = this.createWidgetObject(this.props.rxntProps);

      return (
        <FormComponent
          {...configs}
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          widgets={widgets}
        />
      );
    }

    createWidgetObject(rxntProps){
      const widgets = {
        allergyWidget: this.widgetObjFactory(AllergyTypeaheadWidget, rxntProps),
        medicationWidget: this.widgetObjFactory(MedicationTypeaheadWidget, rxntProps)
      };

      return widgets;
    }

    widgetObjFactory(WidgetClass, rxntProps){

      function CustomWidget(props){
        return (
          <WidgetClass
            {...props}
            rxntProps={rxntProps}
          />
        );
      }

      return CustomWidget;
    }
  }

  return FormWithExtras;
}
