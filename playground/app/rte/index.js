export default function goalsField() {
  let schema = {
    type: "object",
    properties: {
      rte: {
        type: "string",
        title: "RTE",
      },
    },
  };

  let uiSchema = {
    rte: {
      classNames: "col-md-12",
      "ui:field": "rte",
      rte: {
        placeholder: "<br/><br/>",
      },
    },
  };

  let formData = {
    rte: "This must <b>be rendered</b>",
  };

  return { schema, uiSchema, formData };
}
