export default {
  type: "object",
  properties: {
    diagnosis: {
      type: "array",
      title: "Diagnosis",
      default: [],
      items: {
        type: "object",
        properties: {
          icd10Description: {
            type: "string",
            title: "Description"
          },
          icd10: {
            type: "string",
            title: "ICD10-CM"
          },
          snomed: {
            type: "string",
            title: "Severity"
          }
        }
      }
    }
  }
};
