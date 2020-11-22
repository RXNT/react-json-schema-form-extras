export default {
  diagnosis: {
    classNames: "col-md-12 ",
    "ui:field": "table",
    table: {
      tableCols: [
        {
          dataField: "icd10",
          editable: false,
          className: "col-md-1 rxntTableStyle rxntHeaderStyle rxntBorderStyle",
          columnClassName:
            "col-md-1 rxntTableStyle rxntRowStyle rxntBorderStyle"
        },
        {
          dataField: "icd10Description",
          editable: false,
          className: "col-md-9 rxntTableStyle rxntHeaderStyle rxntBorderStyle",
          columnClassName:
            "col-md-9 rxntTableStyle rxntRowStyle rxntBorderStyle"
        },

        {
          dataField: "snomed",
          editable: false,
          className: "col-md-1 rxntTableStyle rxntHeaderStyle",
          columnClassName: "col-md-1 rxntTableStyle rxntRowStyle"
        }
      ],
      rightActions: [
        {
          action: "dropDownAction",
          className: "table-action rxntTableStyle rxntHeaderStyle",
          columnClassName: "table-action rxntTableStyle rxntRowStyle ",
          editColumnClassName: "table-action",
          icon: "glyphicon glyphicon-option-vertical",
          dropDownAction: [
            {
              action: "edit",
              className: "table-action",
              columnClassName: "table-action",
              editColumnClassName: "table-action",
              icon: "glyphicon glyphicon-pencil",
              displayName: "Edit"
            },
            {
              action: "delete",
              className: "table-action",
              columnClassName: "table-action",
              editColumnClassName: "table-action",
              icon: "glyphicon glyphicon-trash",
              displayName: "Delete"
            }
          ]
        }
      ]
    },
    imo: {
      freeText: false
    }
  }
};
