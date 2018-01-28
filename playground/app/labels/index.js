let schema = {
  type: "object",
  required: ["student"],
  properties: {
    student: {
      title: "Students First/Last Name",
    },
  },
};

let uiSchema = {
  student: {
    "ui:field": "typeahead",
    typeahead: {
      placeholder: "Search Students...",
      options: [{ id: "A", label: "Alex" }, { id: "B", label: "Bart" }],
      minLength: 2,
    },
  },
};

export default { schema, uiSchema };
