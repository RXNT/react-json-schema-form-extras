let schema = {
  type: "object",
  properties: {
    str: { type: "string" },
    simpleTable: {
      type: "array",
      items: {
        type: "object",
        properties: {
          str: { type: "string" },
          dateTime: { type: "string", format: "date-time" },
        },
      },
    },
  },
};

let uiSchema = {
  simpleTable: {
    "ui:field": "table",
  },
};

export default {
  schema,
  uiSchema,
  formData: { simpleTable: [{ str: "Some" }] },
};
