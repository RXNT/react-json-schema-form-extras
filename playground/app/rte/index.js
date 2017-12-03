export default function goalsField() {
  let schema = {
    type: "object",
    properties: {
      rte: {
        type: "string",
        title: "RTE",
        default: "<p><br></p>",
      },
    },
  };

  let uiSchema = {
    rte: {
      updateOnBlur: true,
      "ui:field": "collapsible",
      collapse: {
        field: "rte",
        collapsed: false,
      },
      classNames: "col-md-12",
    },
  };

  let formData = {
    rte: "This must <b>be rendered</b>",
  };

  return { schema, uiSchema, formData };
}
