import React from "react";
import applyExtras from "../../src/index";
import Form from "react-jsonschema-form";

const schema = {
  title: "A medley of complex form widgets",
  type: "object",
  required: [],
  properties: {
    tableExample: {
      type: "string",
      title: "Table Example",
    },
    typeaheadTableExample: {
      type: "array",
      title: "Type-ahead Table Example",
      items: {
        type:"object",
        properties: {
          drugName: {
            type: "string",
            title: "Drug Name"
          },
          drugUnits: {
            type: "string",
            title: "Drug Units"
          },
          drugAmount: {
            type: "string",
            title: "Drug Amount"
          }
        }
      }
    }
  },
};

const uiSchema = {
  tableExample: {
    "ui:autofocus": false,
    "ui:emptyValue": "",
    "ui:widget": "asyncTableWidget"
  },
  typeaheadTableExample: {
    "ui:autofocus": false,
    "ui:emptyValue": "",
    "ui:field": "typeaheadTable"
  }
};

const formData = {
  typeaheadExample: "",
  typeaheadTableExample: [ {drugName: "name", drugUnits: "units", drugAmount: "amount"}]
};

const widgetData = {
  asyncTableWidgetData: {
    list: [{ name: "row1, item1", test: "row1, item2", another: "row1, item3", dateEx: "2017-07-10"}, {name: "row2, item1", test: "row2, item2", another: "row2, item3"}],
    tableCols: [{field: "name", displayName: "Col 1", editable: false}, {field: "test", displayName: "Col 2", editable: { type: 'select', options: { values: ['a', 'b', 'c'] } }}, {field: "another", displayName: "Col 3", editable: false}, {field: "dateEx", displayName: "Col 4", customFieldType: "date"}],
    keyField: "name"
  },
  asyncComplexTypeaheadWidgetData: {
    tableData: {
      tableCols: [{field: "drugName", displayName: "Drug Name", editable: false}, {field: "drugUnits", displayName: "Drug Units", editable: { type: 'select', options: { values: ['ml', 'mg', 'oz'] } }}, {field: "drugAmount", displayName: "Drug Amount", editable: false}],
      keyField: "drugName"
    },
    typeaheadData: {
      queryURL: 'http://www.mocky.io/v2/595ff1500f0000f00d0eadf0'
    }
  }
}

//date example temporarily removed from tableCols: , {field: "dateEx", displayName: "Col 4", customFieldType: "date"}

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
