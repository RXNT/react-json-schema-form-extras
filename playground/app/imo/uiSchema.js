export default {
  history: {
    classNames: "col-md-12",
    "ui:field": "collapsible",
    collapse: {
      field: "compositeArray",
    },
    inputField: "imo",
    arrayField: "table",
    table: {
      tableCols: [
        { dataField: "icd10", editable: false },
        { dataField: "icd10Description", editable: false },
        { dataField: "icd9", editable: false },
        { dataField: "snomed", editable: false },
      ],
    },
  },
};
