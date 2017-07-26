import React, { Component } from "react";
import PropTypes from "prop-types";
import { isDevelopment, getRegistry} from "./utils";

export default function applyExtras(FormComponent) {

  class FormWithExtras extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const registry = getRegistry();

      let configs = Object.assign({}, this.props);

      delete configs.schema;
      delete configs.uiSchema;

      let widgets = this.createWidgetObject(this.props.widgetData);
      let fields = this.createFieldsObject(this.props.externalFieldInstanceData, registry);

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

    createFieldsObject(externalFieldInstanceData, registry){
      let fields = {};

      for (var externalFieldInstance in externalFieldInstanceData) {
        if (externalFieldInstanceData.hasOwnProperty(externalFieldInstance)) {
          const fieldInstanceDefinition = externalFieldInstanceData[externalFieldInstance];
          const typeClass = registry.fields[fieldInstanceDefinition.type];

          fields[externalFieldInstance] = this.fieldObjFactory(typeClass, fieldInstanceDefinition.data);
        }
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
      /*const widgets = {
        asyncTypeaheadWidget: this.widgetObjFactory(AsyncTypeaheadWidget, widgetData.asyncTypeaheadWidgetData),
        asyncTableWidget: this.widgetObjFactory(AsyncTableWidget, widgetData.asyncTableWidgetData),
        asyncComplexTypeaheadWidget: this.widgetObjFactory(AsyncComplexTypeaheadWidget, widgetData.asyncComplexTypeaheadWidgetData)
      };*/

      const widgets = {};
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
