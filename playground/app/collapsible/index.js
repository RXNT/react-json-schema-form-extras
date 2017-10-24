import schema from "./schema";
import uiSchema from "./uiSchema";

export default Object.assign({}, schema, uiSchema, {
  formData: {
    strArr: ["some"],
    objArr: [{ name: "other" }],
    compArr: [{ name: "other" }],
  },
});
