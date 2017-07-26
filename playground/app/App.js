import React from "react";
import applyExtras from "../../src/index";
import Form from "react-jsonschema-form";

const schema = {
  title: "A medley of complex form widgets",
  type: "object",
  required: [],
  properties: {
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
  typeaheadTableExample: {
    "ui:autofocus": false,
    "ui:emptyValue": "",
    "ui:field": "medicationsField"
  }
};

const formData = {
  typeaheadTableExample: [ { drugName: "name", drugUnits: "units", drugAmount: "amount" }]
};

//TODO: load field types from a global directory.
const externalFieldInstances = {
  medicationsField: {
    type: "AsyncComplexTypeaheadField",
    data: {
      tableData: {
        tableCols: [{ field: "drugName", displayName: "Drug Name", editable: false }, { field: "drugUnits", displayName: "Drug Units", editable: { type: 'select', options: { values: ['ml', 'mg', 'oz'] } } }, { field: "drugAmount", displayName: "Drug Amount", editable: false }],
        keyField: "drugName"
      },
      typeaheadData: {
        queryURL: 'http://www.mocky.io/v2/595ff1500f0000f00d0eadf0',
        responseSchemaMapping: {
          name: "drugName"
        }
      }
    }
  }
};

//date example temporarily removed from tableCols: , {field: "dateEx", displayName: "Col 4", customFieldType: "date"}

let FormWithExtras = applyExtras(Form);

const onSubmit = ({ formData }) => console.log("form data: " + JSON.stringify(formData, null, '\t'));

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
        externalFieldInstanceData={externalFieldInstances}
        onSubmit={onSubmit}
      />
  </div>
  );
}
