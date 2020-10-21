import schema from "./schema.json";
import uiSchema from "./uiSchema.json";

export default Object.assign({}, schema, uiSchema, {
  formData: {
    procedureCodes: [
      {
        code: "0102T",
        description: "EXTRACORP SHOCKWV TX ANESTH",
        unit: 12,
        diagnosis: {
          diagnosis_A: {
            code: 1,
            description: "Pain"
          },
          diagnosis_B: {
            code: 1,
            description: "Stoelinga-de Koomen-Davis syndrome"
          },
          diagnosis_C: {
            code: 1,
            description: "Stoelinga-de Koomen-Davis "
          },
          diagnosis_D: {
            code: 1,
            description: "Stoelinga-de "
          }
        },
        modifiers: {
          diagnosis_A: {
            code: 1,
            description: "Pain"
          },
          diagnosis_B: {
            code: 1,
            description: "Stoelinga-de Koomen-Davis syndrome"
          },
          diagnosis_C: {
            code: 1,
            description: "Stoelinga-de Koomen-Davis "
          },
          diagnosis_D: {
            code: 1,
            description: "Stoelinga-de "
          }
        }
      }
    ]
  }
});
