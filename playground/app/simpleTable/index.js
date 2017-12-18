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
    table: {
      tableCols: [
        {
          dataField: "dateTime",
          dataFormat: "YYYY-MM-DD",
          field: "rdp",
          uiSchema: {
            rdp: {},
          },
        },
      ],
    },
  },
};

export default {
  schema,
  uiSchema,
  formData: {
    simpleTable: [{ str: "Some", dateTime: new Date().toISOString() }],
  },
};
