const schema = {
  type: "object",
  properties: {
    user: {
      type: "string",
      title: "Async Use Case",
    },
  },
};

const uiSchema = {
  user: {
    "ui:field": "asyncTypeahead",
    asyncTypeahead: {
      url: "https://jsonplaceholder.typicode.com/users",
      minLength: 0,
      labelKey: "email",
      mapping: "email"

    },
  },
};


// const schema = {
//   title: "Tests ",
//   type: "object",
//   properties: {
//     field: { type: "string", title: "Field" }
//   }
// };

// const uiSchema = {
//   field: {
//     classNames: "col-md-4",
//     "ui:field": "typeahead",
//     typeahead: {
//       allowNew: true,
//       minLength: 0,
//       options: [
//         {
//           label: "somethinghere",
//           id: "1"
//         },
//         {
//           label: "sdfasf sdfsdafsdf",
//           id: "2"
//         },
//         {
//           label: "hola ssa",
//           id: "3"
//         }
//       ],
//       labelKey: "label",
//       mapping: 'id',
//     }
//   }
// }


export default { schema, uiSchema };
