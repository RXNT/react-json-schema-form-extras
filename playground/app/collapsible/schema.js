export default {
  schema: {
    type: "object",
    properties: {
      strArr: {
        type: "array",
        items: {
          type: "string",
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
