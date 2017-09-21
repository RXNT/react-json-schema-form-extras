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
        editorStyle: {
          minHeight: "183px",
        },
        placeholder: "\n\n\n",
      },
    },
  };

  return { schema, uiSchema };
}
