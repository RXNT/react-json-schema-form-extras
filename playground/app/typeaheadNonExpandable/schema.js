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
          drugId: {
            type: "string",
          },
          drugName: {
            type: "string",
            title: "Drug Name",
          },
          dosage: {
            type: "string",
            title: "Dosage",
          },
          quantity: {
            type: "string",
            title: "Quantity",
          },
          unit: {
            type: "string",
            title: "Units",
          },
          refills: {
            type: "string",
            title: "Refills",
          },
          useGeneric: {
            default: true,
            type: "boolean",
            title: "Use Generic",
          },
          startDate: {
            type: "date",
            title: "Start Date",
          },
        },
      },
    },
  },
};
