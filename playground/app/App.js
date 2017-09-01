import React from "react";
import applyExtras from "../../src/index";
import Form from "react-jsonschema-form";
import imo from "./imo";

const schema = {
  title: "A medley of complex form widgets",
  type: "object",
  required: [],
  properties: {
    strangeArray: {
      type: "array",
      title: "Some table",
      items: {
        type: "object",
        properties: {
          num: {
            type: "number",
          },
          str: {
            type: "string",
          },
          state: {
            type: "string",
            enum: ["active", "passive", "other"],
          },
          active: {
            type: "boolean",
          },
          createdTime: {
            type: "time",
          },
          createdDate: {
            type: "date",
          },
          createdDateTime: {
            type: "date-time",
          },
        },
      },
    },
    typeaheadTableExample: {
      type: "array",
      title: "Type-ahead Table Example",
      items: {
        type: "object",
        properties: {
          drugName: {
            type: "string",
            title: "Drug Name",
          },
          drugUnits: {
            type: "string",
            title: "Drug Units",
          },
          drugAmount: {
            type: "string",
            title: "Drug Amount",
          },
        },
      },
    },
  },
};

const uiSchema = {
  strangeArray: {
    "ui:field": "table",
    table: {
      keyField: "num",
    },
  },
  typeaheadTableExample: {
    "ui:autofocus": false,
    "ui:emptyValue": "",
    "ui:field": "medicationsField",
  },
};

const formData = {
  strangeArray: [{ num: 1, str: "Some" }],
  typeaheadTableExample: [
    { drugName: "name", drugUnits: "units", drugAmount: "amount" },
  ],
};

//TODO: load field types from a global directory.
const externalFieldInstances = {
  table: {
    type: "table",
  },
  medicationsField: {
    type: "AsyncComplexTypeaheadField",
    data: {
      tableData: {
        tableCols: [
          { field: "drugName", displayName: "Drug Name", editable: false },
          {
            field: "drugUnits",
            displayName: "Drug Units",
            editable: {
              type: "select",
              options: { values: ["ml", "mg", "oz"] },
            },
          },
          { field: "drugAmount", displayName: "Drug Amount", editable: false },
        ],
        keyField: "drugName",
      },
      typeaheadData: {
        queryURL:
          "/EHRV8PatientEncounterAPIServices/ehrv8/encounter/SearchAllergies",
        responseSchemaMapping: {
          name: "drugName",
        },
      },
    },
  },
};

//date example temporarily removed from tableCols: , {field: "dateEx", displayName: "Col 4", customFieldType: "date"}

let FormWithExtras = applyExtras(Form);

const onSubmit = ({ formData }) =>
  console.log("form data: " + JSON.stringify(formData, null, "\t"));

export function App() {
  return (
    <div>
      <div className="col-md-12">
        <FormWithExtras
          {...imo}
          onChange={({ formData }) => console.log(JSON.stringify(formData))}
        />
      </div>
      <div className="col-md-12">
        <FormWithExtras
          {...imo}
          onChange={({ formData }) => console.log(JSON.stringify(formData))}
        />
      </div>
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
    </div>
  );
}
