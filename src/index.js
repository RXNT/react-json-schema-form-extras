import React, { Component } from "react";
import PropTypes from "prop-types";
import { isDevelopment} from "./utils";
import AsyncTypeaheadWidget from './components/asyncTypeaheadWidget';
import AsyncTableWidget from './components/asyncTableWidget';

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

      return (
        <FormComponent
          {...configs}
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          widgets={widgets}
        />
      );
    }

    createWidgetObject(widgetData){
      const widgets = {
        asyncTypeaheadWidget: this.widgetObjFactory(AsyncTypeaheadWidget, widgetData.asyncTypeaheadWidgetData),
        asyncTableWidget: this.widgetObjFactory(AsyncTableWidget, widgetData.asyncTableWidgetData)
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
