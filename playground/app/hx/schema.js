export default {
  type: "object",
  properties: {
    history: {
      type: "array",
      title: "History",
      default: [],
      items: {
        type: "object",
        properties: {
          description: {
            type: "string",
            title: "Description",
          },
          icd10: {
            type: "string",
            title: "ICD10",
          },
          icd10Description: {
            type: "string",
            title: "ICD10 Description",
          },
          icd9: {
            type: "string",
            title: "ICD9",
          },
          snomed: {
            type: "string",
            title: "SNOMED",
          },
          added: {
            type: "date",
            title: "Date Added",
          },
        },
      },
    },
  },
};
