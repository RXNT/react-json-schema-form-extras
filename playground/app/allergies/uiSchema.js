export default {
  allergies: {
    classNames: "col-md-12",
    "ui:field": "compositeArray",
    inputField: "asyncTypeahead",
    arrayField: "table",
    asyncTypeahead: {
      url: "/EHRV8PatientEncounterAPIServices/ehrv8/encounter/SearchAllergies",
      optionsPath: "Allergies",
      mapping: {
        allergyName: "AllergyName",
      },
      labelKey: "AllergyName",
    },
  },
};
