import schema from "./schema";
import uiSchema from "./uiSchema";

export default Object.assign({}, schema, uiSchema, {
  formData: {
    str: "some",
    strArr: ["some"],
    obj: { name: "other" },
    objArr: [{ name: "other" }],
    compArr: [{ name: "other" }],
  },
});
