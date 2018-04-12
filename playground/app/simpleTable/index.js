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
        {
          dataField: "str",
          columnCustomFormat:
            '{"function":{"arguments":"cell,row,schema","body":"return \'<a >\'+cell+\'</a>\' "}}', //eslint-disable-line
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
