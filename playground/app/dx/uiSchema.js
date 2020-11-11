export default {
  diagnosis: {
    classNames: 'col-md-12 ',
    'ui:field': 'table',
    table: {
      tableCols: [
        {
          dataField: 'icd10',
          editable: false,
          className: 'col-md-2 rxntTableStyle rxntHeaderStyle',
          columnClassName: 'col-md-2 rxntTableStyle rxntRowStyle',
        },
        {
          dataField: 'description',
          editable: false,
          className: 'col-md-7 rxntTableStyle rxntHeaderStyle',
          columnClassName: 'col-md-7 rxntTableStyle rxntRowStyle',
        },

        {
          dataField: 'snomed',
          editable: false,
          className: 'col-md-2 rxntTableStyle rxntHeaderStyle',
          columnClassName: 'col-md-2 rxntTableStyle rxntRowStyle',
        }
      ],
      rightActions: [
        {
          action: "inheritedAction",
          className: "col-md-1",
          columnClassName: "col-md-1",
          editColumnClassName: "col-md-1",
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
