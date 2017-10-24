import schema from "./schema";
import uiSchema from "./uiSchema";

export default Object.assign({}, schema, uiSchema, {
  formData: {
    orders: [{ order: "some" }],
  },
});
