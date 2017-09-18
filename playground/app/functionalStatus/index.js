import schema from "./schema.json";
import uiSchema from "./uiSchema.json";
import externalFieldInstanceData from "./externalFieldInstanceData";

export default Object.assign({}, schema, uiSchema, {
  externalFieldInstanceData,
});
