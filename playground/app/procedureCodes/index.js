import schema from "./schema.json";
import uiSchema from "./uiSchema.json";

export default Object.assign({}, schema, uiSchema, {
  formData: {
    procedureCodes: [
      {
        code: 1,
        description: "delectus aut autem"
      },
      {
        code: 2,
        description: "Test it"
      }
    ]
  }
});
