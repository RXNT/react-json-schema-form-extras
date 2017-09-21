export default function goalsField() {
  let schema = {
    type: "object",
    properties: {
      goals: {
        type: "array",
        title: "Goals",
        items: {
          type: "object",
          properties: {
            snomed: {
              type: "string",
              title: "SNOMED",
            },
            goal: {
              type: "string",
              title: "Goal",
            },
            instructions: {
              type: "string",
              title: "Instructions",
            },
          },
        },
      },
    },
  };

  let uiSchema = {
    goals: {
      classNames: "col-md-12",
      "ui:field": "compositeArray",
      inputField: "typeahead",
      arrayField: "table",
      typeahead: {
        url: "/EHRV8PatientEncounterAPIServices/ehrv8/encounter/SearchGoals",
        optionsMapping: "Goals",
        responseSchemaMapping: {
          Name: "goal",
          "SNOMED.Code": "snomed",
        },
        minLength: 1,
        labelKey: "Name",
      },
      table: {
        keyField: "snomed",
        tableCols: [
          {
            dataField: "instructions",
            classNames: "col-md-9",
            columnClassName: "col-md-9",
          },
        ],
      },
    },
  };

  return { schema, uiSchema };
}
