export default {
  schema: {
    type: "object",
    properties: {
      str: {
        type: "string",
      },
      strArr: {
        type: "array",
        items: {
          type: "string",
        },
      },
      obj: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      },
      objArr: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
      },
      compArr: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
      },
    },
  },
};
