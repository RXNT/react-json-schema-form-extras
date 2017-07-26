import React, { Component } from "react";
import PropTypes from "prop-types";
import { isDevelopment} from "./utils";
import AsyncTypeaheadWidget from './components/asyncTypeaheadWidget';
import AsyncTableWidget from './components/asyncTableWidget';
import AsyncComplexTypeaheadWidget from './components/asyncComplexTypeaheadWidget';

import AsyncComplexTypeaheadField from './components/AsyncComplexTypeaheadField';

export default function applyExtras(FormComponent) {

  class FormWithExtras extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      let configs = Object.assign({}, this.props);

      delete configs.schema;
      delete configs.uiSchema;

      let widgets = this.createWidgetObject(this.props.widgetData);
      let fields = this.createFieldsObject(this.props.widgetData);

      return (
        <FormComponent
          {...configs}
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          widgets={widgets}
          fields={fields}
        />
      );
    }

    createFieldsObject(data){
      const fields = {
        typeaheadTable: this.fieldObjFactory(AsyncComplexTypeaheadField, data.asyncComplexTypeaheadWidgetData)
      }

      return fields;
    }

    fieldObjFactory(FieldClass, data){

      function CustomField(props){
        return (
          <FieldClass
            {...props}
            data={data}
          />
        );
      }

      return CustomField;
    }

    createWidgetObject(widgetData){
      const widgets = {
        asyncTypeaheadWidget: this.widgetObjFactory(AsyncTypeaheadWidget, widgetData.asyncTypeaheadWidgetData),
        asyncTableWidget: this.widgetObjFactory(AsyncTableWidget, widgetData.asyncTableWidgetData),
        asyncComplexTypeaheadWidget: this.widgetObjFactory(AsyncComplexTypeaheadWidget, widgetData.asyncComplexTypeaheadWidgetData)
      };

      return widgets;
    }

    widgetObjFactory(WidgetClass, widgetData){

      function CustomWidget(props){
        return (
          <WidgetClass
            {...props}
            widgetData={widgetData}
          />
        );
      }

      return CustomWidget;
    }
  }

  return FormWithExtras;
}
