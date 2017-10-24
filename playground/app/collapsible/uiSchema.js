const fieldProps = {
  classNames: "col-md-12",
  "ui:field": "collapsible",
  collapse: {
    addTo: "self",
    field: "typeahead",
  },
  typeahead: {
    options: [{ name: "some" }, { name: "other" }],
    allowNew: true,
    labelKey: "name",
    minLength: 1,
  },
};

export default {
  uiSchema: {
    strArr: fieldProps,
    objArr: fieldProps,
    compArr: Object.assign({}, fieldProps, {
      "ui:field": "collapsible",
      inputField: "typeahead",
      arrayField: "table",
    }),
  },
};
