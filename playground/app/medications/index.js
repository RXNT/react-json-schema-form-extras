import schema from "./schema";
import uiSchema from "./uiSchema";
import rules from "./rules.json";

export default {
  schema,
  uiSchema,
  ...rules,
  formData: {
    medicationData: {
      medications: [
        { drugId: 0, quantity: 21, useGeneric: true, isSelected: true },
        { drugId: 1, quantity: 22, useGeneric: true, isSelected: true },
        { drugId: 3, quantity: 23, useGeneric: true, isSelected: true },
        { drugId: 1, quantity: 24, useGeneric: true, isSelected: true }
      ]
    },
    allergyData: {
      allergiesGet: {
        items: []
      },
      allergyCategoriesPost: {
        categories: []
      },
      allergies: []
    }
  }
};
