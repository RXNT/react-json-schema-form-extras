export default {
  schema: {
    type: "object",
    properties: {
      orders: {
        type: "array",
        items: {
          type: "object",
          properties: {
            order: { type: "string" },
          },
        },
      },
    },
  },
};
