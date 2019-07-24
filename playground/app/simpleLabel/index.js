const schema = {
  type: "object",
  properties: {
    myLabel: {
      title: "<ul> <li>Demo <strong>Label</strong>: </li></ul> ",
    },
  },
};

const uiSchema = {
  myLabel: {
    "ui:field": "simpleLabel",
    simpleLabel: {
      classNames: "col-md-2",
      styles: {
        marginLeft: "5px",
        color: "red",
      },
    },
  },
};

module.exports = {
  schema: schema,
  uiSchema: uiSchema,
};
