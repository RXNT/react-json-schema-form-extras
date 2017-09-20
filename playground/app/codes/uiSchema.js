export default {
  coding: {
    classNames: "col-md-12",
    "ui:field": "compositeArray",
    inputField: "typeahead",
    arrayField: "table",
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
  },
};
