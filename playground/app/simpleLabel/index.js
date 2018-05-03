const schema = {
  type: "object",
  properties: {
    myLabel: {
      title: "Demo Label: ",
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
        backgroundColor: "#222333",
        color: "#aaccff",
        font: "italic small-caps bold 40px/2 cursive",
      },
    },
  },
};

module.exports = {
  schema: schema,
  uiSchema: uiSchema,
};
