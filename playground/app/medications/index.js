import schema from "./schema";
import uiSchema from "./uiSchema";

export default {
  schema,
  uiSchema,
  formData: { medicationData: { medications: [{ useGeneric: false }] } },
};
