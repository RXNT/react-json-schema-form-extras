import { search } from "../AsyncTypeaheadAPI";

export default {
  allergies: {
    classNames: "col-md-12",
    "ui:field": "table",
    table: {
      tableCols: [
        {
          dataField: "allergyName",
          field: "asyncTypeahead",
          uiSchema: {
            "ui:field": "asyncTypeahead",
            asyncTypeahead: {
              url:
                "/EHRV8PatientEncounterAPIServices/ehrv8/encounter/SearchAllergies",
              optionsPath: "Allergies",
              search,
              mapping: {
                allergyName: "AllergyName",
              },
              labelKey: "AllergyName",
            },
          },
        },
      ],
    },
  },
};
