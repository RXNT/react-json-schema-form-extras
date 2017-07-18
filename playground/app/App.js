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
      title: "Type-ahead Example",
    },
    tableExample: {
      type: "string",
      title: "Table Example",
    },
    typeaheadTableExample: {
      type: "string",
      title: "Type-ahead Table Example"
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
  },
  typeaheadTableExample: {
    "ui:autofocus": false,
    "ui:emptyValue": "",
    "ui:widget": "asyncComplexTypeaheadWidget"
  }
};

const formData = {
  typeaheadExample: ""
};

const widgetData = {
  asyncTableWidgetData: {
    list: [{ name: "row1, item1", test: "row1, item2", another: "row1, item3", dateEx: "2017-07-10"}, {name: "row2, item1", test: "row2, item2", another: "row2, item3"}],
    tableCols: [{field: "name", displayName: "Col 1", editable: false}, {field: "test", displayName: "Col 2", editable: { type: 'select', options: { values: ['a', 'b', 'c'] } }}, {field: "another", displayName: "Col 3", editable: false}, {field: "dateEx", displayName: "Col 4", customFieldType: "date"}],
    keyField: "name"
  },
  asyncTypeaheadWidgetData: {},
  asyncComplexTypeaheadWidgetData: {
    tableData: {
      list: [{ name: "row1, item1", test: "row1, item2", another: "row1, item3", dateEx: "2017-07-10"}, {name: "row2, item1", test: "row2, item2", another: "row2, item3"}],
      tableCols: [{field: "name", displayName: "Col 1", editable: false}, {field: "test", displayName: "Col 2", editable: { type: 'select', options: { values: ['a', 'b', 'c'] } }}, {field: "another", displayName: "Col 3", editable: false}, {field: "dateEx", displayName: "Col 4", customFieldType: "date"}],
      keyField: "name"
    }
  }
}

let FormWithExtras = applyExtras(Form);

const onSubmit = ({formData}) => console.log("form data: " + JSON.stringify(formData, null, '\t'));

export function App() {
  return (
    <div className="col-md-12">
      <FormWithExtras
        liveValidate={true}
        safeRenderCompletion={true}
        noHtml5Validate={true}
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        widgetData={widgetData}
        onSubmit={onSubmit}
      />
  </div>
  );
}
