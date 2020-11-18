export default {
  diagnosis: {
    classNames: 'col-md-12 ',
    'ui:field': 'table',
    table: {
      tableCols: [
        {
          dataField: 'icd10',
          editable: false,
          className: 'col-md-2 rxntTableStyle rxntHeaderStyle rxntBorderStyle',
          columnClassName: 'col-md-2 rxntTableStyle rxntRowStyle rxntBorderStyle',
        },
        {
          dataField: 'description',
          editable: false,
          className: 'col-md-7 rxntTableStyle rxntHeaderStyle rxntBorderStyle',
          columnClassName: 'col-md-7 rxntTableStyle rxntRowStyle rxntBorderStyle',
        },

        {
          dataField: 'snomed',
          editable: false,
          className: 'col-md-2 rxntTableStyle rxntHeaderStyle rxntBorderStyle',
          columnClassName: 'col-md-2 rxntTableStyle rxntRowStyle rxntBorderStyle',
        }
      ],
      rightActions: [
        {
          action: "inheritedAction",
          className: 'table-action rxntTableStyle rxntHeaderStyle',
          columnClassName: 'table-action rxntTableStyle rxntRowStyle',
          editColumnClassName: 'table-action',
          icon: "glyphicon glyphicon-option-vertical",
          inheritedAction: [
            {
              action: "edit",
              className: "col-md-1",
              columnClassName: "col-md-1",
              editColumnClassName: "col-md-1",
              icon: "glyphicon glyphicon-pencil",
              displayName: "Edit"
            },
            {
              action: "delete",
              className: "col-md-1",
              columnClassName: "col-md-1",
              editColumnClassName: "col-md-1",
              icon: "glyphicon glyphicon-trash",
              displayName: "Delete"
            }
          ]
        }
      ]
    },
    imo: {
      freeText: false,
    },
  },
}
