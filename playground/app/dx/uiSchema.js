export default {
  diagnosis: {
    classNames: "col-md-12",
    "ui:field": "compositeArray",
    inputField: "imo",
    arrayField: "table",
    table: {
      tableCols: [
        { dataField: "description", editable: false },
        { dataField: "icd10", editable: false },
        { dataField: "icd9", editable: false },
      ],
      options: {
        handleConfirmDeleteRow: next => next(),
      },
    },
    imo: {
      problem: {
        url: "/IMOAPIServices/imo/problemit/LexicalSearchProblemIT",
        root: "IMOProblemIT.data.items",
        mapping: {
          description: "title",
          icd10: "ICD10CM_CODE",
          icd9: "kndg_code",
        },
      },
      detail: {
        url: "/IMOAPIServices/imo/problemit/LexicalDetailProblemIT",
        root: "LexicalDetailList",
        mapping: {
          description: "HPCTitle",
          icd10: "ICD10Code",
          icd9: "ICD9Code",
        },
      },
    },
  },
};
