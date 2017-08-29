import React, { Component } from "react";
import { getRegistry } from "./utils";

export default function applyExtras(FormComponent) {
  class FormWithExtras extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const registry = getRegistry();

      let fields = this.createFieldsObject(
        this.props.externalFieldInstanceData,
        registry
      );
      let allFields = Object.assign({}, fields, this.props.fields);

      let configs = Object.assign({}, this.props, { fields: allFields });

      return <FormComponent {...configs} />;
    }

    createFieldsObject(externalFieldInstanceData, registry) {
      let fields = {};

      for (var externalFieldInstance in externalFieldInstanceData) {
        if (externalFieldInstanceData.hasOwnProperty(externalFieldInstance)) {
          const fieldInstanceDefinition =
            externalFieldInstanceData[externalFieldInstance];
          const typeClass = registry.fields[fieldInstanceDefinition.type];

          fields[externalFieldInstance] = this.fieldObjFactory(
            typeClass,
            fieldInstanceDefinition.data
          );
        }
      }

      return fields;
    }

    fieldObjFactory(FieldClass, data) {
      function CustomField(props) {
        return <FieldClass {...props} data={data} />;
      }

      return CustomField;
    }

    createWidgetObject(widgetData) {
      /*const widgets = {
        asyncTypeaheadWidget: this.widgetObjFactory(AsyncTypeaheadWidget, widgetData.asyncTypeaheadWidgetData),
        asyncTableWidget: this.widgetObjFactory(AsyncTableWidget, widgetData.asyncTableWidgetData),
        asyncComplexTypeaheadWidget: this.widgetObjFactory(AsyncComplexTypeaheadWidget, widgetData.asyncComplexTypeaheadWidgetData)
      };*/

      const widgets = {};
      return widgets;
    }

    widgetObjFactory(WidgetClass, widgetData) {
      function CustomWidget(props) {
        return <WidgetClass {...props} widgetData={widgetData} />;
      }

      return CustomWidget;
    }
  }

  return FormWithExtras;
}
