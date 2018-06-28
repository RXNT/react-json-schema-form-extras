const schema = {
  type: "object",
  properties: {
    user: {
      type: "String",
      title: "Async Use Case",
    },
  },
};

const uiSchema = {
  user: {
    "ui:field": "asyncTypeahead",
    asyncTypeahead: {
      url: "https://jsonplaceholder.typicode.com/users",
      minLength: 1,
      labelKey: "username",
    },
  },
};

export default { schema, uiSchema };
