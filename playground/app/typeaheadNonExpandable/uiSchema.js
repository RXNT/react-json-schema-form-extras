export default {
  medications: {
    classNames: "col-md-12",
    "ui:field": "compositeArray",
    inputField: "typeahead",
    arrayField: "table",
    table: {
      tableCols: [
        {
          dataField: "drug",
          field: "typeahead",
          dataFormat: "drugName",
          className: "col-md-3",
          columnClassName: "col-md-3",
          editColumnClassName: "col-md-3",
          uiSchema: {
            typeahead: {
              options: [
                {
                  DrugId: 6963,
                  DrugName: "dexibuprofen",
                  DrugType: { Id: 6, Name: null },
                },
                {
                  DrugId: 2377,
                  DrugName: "ibuprofen",
                  DrugType: { Id: 6, Name: null },
                },
                {
                  DrugId: 10936,
                  DrugName: "ibuproxam",
                  DrugType: { Id: 6, Name: null },
                },
                {
                  DrugId: 110394,
                  DrugName: "NeoProfen (ibuprofen lysn)(PF)",
                  DrugType: { Id: 2, Name: null },
                },
              ],
              labelKey: "DrugName",
              bodyContainer: true,
              mapping: {
                drugName: "DrugName",
                drugId: "DrugId",
              },
            },
          },
        },
        {
          dataField: "dosage",
        },
        {
          dataField: "quantity",
        },
        {
          dataField: "unit",
        },
        {
          dataField: "refills",
        },
        {
          dataField: "useGeneric",
        },
        {
          dataField: "startDate",
        },
      ],
    },
    typeahead: {
      options: [
        {
          DrugId: 6963,
          DrugName: "dexibuprofen",
          DrugType: { Id: 6, Name: null },
        },
        {
          DrugId: 2377,
          DrugName: "ibuprofen",
          DrugType: { Id: 6, Name: null },
        },
        {
          DrugId: 10936,
          DrugName: "ibuproxam",
          DrugType: { Id: 6, Name: null },
        },
        {
          DrugId: 110394,
          DrugName: "NeoProfen (ibuprofen lysn)(PF)",
          DrugType: { Id: 2, Name: null },
        },
      ],
      labelKey: "DrugName",
      bodyContainer: true,
      mapping: {
        drug: {
          drugName: "DrugName",
          drugId: "DrugId",
        },
      },
    },
  },
};
