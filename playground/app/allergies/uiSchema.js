export default {
  allergies: {
    classNames: "col-md-12",
    "ui:field": "compositeArray",
    inputField: "typeahead",
    arrayField: "table",
    table: {
      options: {
        handleConfirmDeleteRow: next => next(),
      },
    },
    typeahead: {
      url: "/EHRV8PatientEncounterAPIServices/ehrv8/encounter/SearchAllergies",
      optionsMapping: "Allergies",
      responseSchemaMapping: {
        allergyName: "AllergyName",
      },
      labelKey: "AllergyName",
    },
  },
};
