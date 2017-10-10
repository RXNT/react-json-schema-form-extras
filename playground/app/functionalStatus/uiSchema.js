import { search } from "../AsyncTypeaheadAPI";

export default {
  uiSchema: {
    "ui:order": ["functionalStatus"],
    functionalStatus: {
      classNames: "col-md-6",
      "ui:field": "compositeArray",
      inputField: "asyncTypeahead",
      arrayField: "table",
      asyncTypeahead: {
        url:
          "EHRV8PatientEncounterAPIServices/ehrv8/encounter/SearchFunctionalStatus/",
        optionsMapping: "FunctionalStatusList",
        responseSchemaMapping: {
          name: "Name",
        },
        search,
        minLength: 1,
        labelKey: "Name",
      },
    },
  },
};
