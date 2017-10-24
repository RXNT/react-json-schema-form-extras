const fieldProps = {
  typeahead: {
    options: [{ name: "some" }, { name: "other" }],
    allowNew: true,
    labelKey: "name",
    minLength: 1,
    bodyContainer: true,
    mapping: "name",
  },
};

export default {
  uiSchema: {
    orders: {
      "ui:field": "table",
      table: {
        tableCols: [
          {
            dataField: "order",
            field: "typeahead",
            uiSchema: fieldProps,
          },
        ],
      },
    },
  },
};
