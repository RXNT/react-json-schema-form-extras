export default {
  coding: {
    classNames: "col-md-12",
    "ui:field": "compositeArray",
    inputField: "altInput",
    arrayField: "table",
    defInput: "typeahead",
    altInput: "typeaheadOptions",
    altInputSeparator: "OR",
    typeahead: {
      url:
        "/EHRV8PatientEncounterAPIServices/ehrv8/encounter/SearchProcedureCodes",
      optionsMapping: "ProcedureCodes",
      responseSchemaMapping: {
        Code: "code",
        Description: "description",
      },
      minLength: 1,
      labelKey: {
        fields: ["Code", "Description"],
        separator: " - ",
      },
    },
    typeaheadOptions: {
      options: [{ code: "012", description: "Random" }],
      minLength: 1,
      responseSchemaMapping: {
        Code: "code",
        Description: "description",
      },
      labelKey: {
        fields: ["code", "description"],
        separator: " - ",
      },
    },
  },
};
