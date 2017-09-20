export default {
  type: "object",
  properties: {
    coding: {
      type: "array",
      items: {
        type: "object",
        properties: {
          code: {
            type: "string",
            title: "CPT",
          },
          description: {
            type: "string",
            title: "Description",
          },
        },
      },
    },
  },
};
