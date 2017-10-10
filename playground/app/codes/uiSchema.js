import { search } from "../AsyncTypeaheadAPI";

export default {
  coding: {
    classNames: "col-md-12",
    "ui:field": "compositeArray",
    inputField: "altInput",
    arrayField: "table",
    defInput: "asyncTypeahead",
    altInput: "typeahead",
    altInputSeparator: "OR",
    asyncTypeahead: {
      url:
        "/EHRV8PatientEncounterAPIServices/ehrv8/encounter/SearchProcedureCodes",
      optionsPath: "ProcedureCodes",
      mapping: {
        code: "Code",
        description: "Description",
      },
      search,
      minLength: 1,
      labelKey: {
        fields: ["Code", "Description"],
        separator: " - ",
      },
    },
    typeahead: {
      options: [{ code: "012", description: "Random" }],
      minLength: 1,
      labelKey: {
        fields: ["code", "description"],
        separator: " - ",
      },
    },
  },
};
