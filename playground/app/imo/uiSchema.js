export default {
  history: {
    classNames: "col-md-12",
    "ui:field": "compositeArray",
    inputField: "imo",
    arrayField: "table",
    table: {
      tableCols: [
        { dataField: "icd10", editable: false },
        { dataField: "icd10Description", editable: false },
        { dataField: "icd9", editable: false },
        { dataField: "snomed", editable: false },
      ],
      options: {
        handleConfirmDeleteRow: next => next(),
      },
    },
    imo: {
      problem: {
        url: "/proxy/IMOAPIServices/imo/problemit/LexicalSearchProblemIT",
        root: "IMOProblemIT.data.items",
        mapping: {
          description: "title",
          icd10: "ICD10CM_CODE",
          icd10Description: "ICD10CM_TITLE",
          icd9: "kndg_code",
          snomed: "SCT_CONCEPT_ID",
          query: "code",
        },
      },
      detail: {
        url: "/proxy/IMOAPIServices/imo/problemit/LexicalDetailProblemIT",
        root: "LexicalDetailList",
        mapping: {
          description: "HPCTitle",
          icd10: "ICD10Code",
          icd10Description: "ICD10Title",
          icd9: "ICD9Code",
          snomed: "SNOMEDCTCode",
          query: "code",
        },
      },
    },
  },
};
