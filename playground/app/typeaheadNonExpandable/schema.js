export default {
  required: [],
  type: "object",
  properties: {
    medications: {
      type: "array",
      title: "Medications",
      items: {
        required: [],
        type: "object",
        properties: {
          useGeneric: {
            default: true,
            type: "boolean",
            title: "Use Generic",
          },
          quantity: {
            type: "string",
            title: "Quantity",
          },
          drug: {
            type: "object",
            properties: {
              drugId: {
                type: "string",
              },
              drugName: {
                type: "string",
                title: "Drug Name",
              },
            },
          },
          dosage: {
            type: "string",
            title: "Dosage",
          },
          startDate: {
            type: "date",
            title: "Start Date",
          },
          refills: {
            type: "string",
            title: "Refills",
          },
          unit: {
            type: "string",
            title: "Units",
          },
        },
      },
    },
  },
};
