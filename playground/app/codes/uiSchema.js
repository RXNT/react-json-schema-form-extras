export default {
  coding: {
    classNames: "col-md-12",
    "ui:field": "compositeArray",
    inputField: "altInput",
    arrayField: "table",
    defInput: "asyncTypeahead",
    altInput: "typeahead",
    altInputSeparator: "OR",
    typeahead: {
      url:
        "/EHRV8PatientEncounterAPIServices/ehrv8/encounter/SearchProcedureCodes",
      optionsMapping: "ProcedureCodes",
      responseSchemaMapping: {
        code: "Code",
        description: "Description",
      },
      minLength: 1,
      labelKey: {
        fields: ["Code", "Description"],
        separator: " - ",
      },
    },
    asyncTypeahead: {
      options: [{ code: "012", description: "Random" }],
      minLength: 1,
      mapping: {
        code: "Code",
        description: "Description",
      },
      labelKey: {
        fields: ["code", "description"],
        separator: " - ",
      },
    },
  },
};
