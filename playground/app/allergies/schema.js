export default {
  type: "object",
  properties: {
    allergies: {
      type: "array",
      title: "Allergies",
      items: {
        type: "object",
        properties: {
          allergyName: {
            type: "string",
            title: "Allergy Name",
          },
          allergyReaction: {
            type: "string",
            title: "Allergy Reaction",
          },
          allergyComments: {
            type: "string",
            title: "Allergy Comments",
          },
          allergyActive: {
            type: "string",
            title: "Allergy Active",
          },
          allergyDate: {
            type: "string",
            title: "Allergy Identified On",
          },
        },
      },
    },
  },
};
