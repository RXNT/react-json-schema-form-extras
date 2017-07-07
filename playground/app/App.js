import React from "react";
import applyExtras from "../../src/index";
import Form from "react-jsonschema-form";

const schema = {
  title: "A medley of complex form widgets",
  type: "object",
  required: ["typeaheadExample"],
  properties: {
    typeaheadExample: {
      type: "string",
      title: "Typeahead Example",
    },
    tableExample: {
      type: "string",
      title: "Table Example",
    }
  },
};

const uiSchema = {
  typeaheadExample: {
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:widget": "asyncTypeaheadWidget"
  },
  tableExample: {
    "ui:autofocus": false,
    "ui:emptyValue": "",
    "ui:widget": "asyncTableWidget"
  }
};

const formData = {
};

const widgetData = {
  asyncTableWidgetData: {
    list: [{col1: "row1, item1", col2: "row1, item2", col3: "row1, col3"}, {col1: "row2, item1", col2: "row2, item2", col3: "row2, col3"}]
  },
  asyncTypeaheadWidgetData: {}
}

let FormWithExtras = applyExtras(Form);

export function App() {
  return (
    <div className="col-md-12">
      <FormWithExtras
        liveValidate={false}
        safeRenderCompletion={true}
        noHtml5Validate={true}
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        widgetData={widgetData}
      />
  </div>
  );
}
