let schema = {
  type: "object",
  properties: {
    str: { type: "string" },
    lab: { title: "This is a test label" },
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
  lab: {
    "ui:field": "simpleLabel",
  },
  simpleTable: {
    "ui:field": "table",
    table: {
      tableCols: [
        {
          dataField: "dateTime",
          dataFormat: "YYYY-MM-DD",

          field: "dateTimePicker",
        },
        {
          editable: false,
          dataField: "str",
          columnCustomFormat:
            '{"function":{"arguments":"cell,row,schema","body":"return \'<a >\'+cell+\'</a>\' "}}', //eslint-disable-line
        },
      ],

      selectRow: {
        mode: "checkbox",
        clickToSelect: true,
        bgColor: "grey",
        onSelectRow: { fieldToUpdate: "picked" },
        onSelectAllRow: { fieldToUpdate: "picked" },
      },
    },
  },
};

export default {
  schema,
  uiSchema,
  formData: {
    simpleTable: [
      { str: "Some1", dateTime: new Date().toISOString() },
      { str: "Some2", dateTime: new Date().toISOString() },
      { str: "Some3", dateTime: new Date().toISOString() },
    ],
  },
};
