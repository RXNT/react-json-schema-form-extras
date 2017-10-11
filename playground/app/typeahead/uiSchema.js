const fieldProps = {
  classNames: "col-md-12",
  "ui:field": "typeahead",
  typeahead: {
    options: [{ name: "some" }, { name: "other" }],
    labelKey: "name",
    minLength: 1,
  },
};

export default {
  uiSchema: {
    str: fieldProps,
    strArr: fieldProps,
    obj: fieldProps,
    objArr: fieldProps,
  },
};
