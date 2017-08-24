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
          relation: {
            type: "string",
            enum: [
              "mothers",
              "mothersGrandMother",
              "mothersGrandFather",
              "mothersAunt",
              "mothersUncle",
              "fathers",
              "fathersGrandMother",
              "fathersGrandFather",
              "fathersAunt",
              "fathersUncle",
              "sororal",
              "fraternal",
              "daughters",
              "sons",
              "uncorroborated",
            ],
            enumNames: [
              "Maternal History of",
              "Maternal Grandmother's History of",
              "Maternal Grandfather's History of",
              "Maternal Aunt's History of",
              "Maternal Uncle's History of",
              "Paternal History of",
              "Paternal Grandmother's History of",
              "Paternal Grandfather's History of",
              "Paternal Aunt's History of",
              "Paternal Uncle's History of",
              "Sororal History of",
              "Fraternal History of",
              "Daughter's History of",
              "Son's History of",
              "Uncorroborated History of",
            ],
          },
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
