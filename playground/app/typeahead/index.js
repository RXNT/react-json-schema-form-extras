import schema from "./schema.json";
import uiSchema from "./uiSchema.json";

export default Object.assign({}, schema, uiSchema, {
  formData: { str: "other" },
});
