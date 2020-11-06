export default {
  diagnosis: {
    classNames: 'col-md-12',
    'ui:field': 'table',
    table: {
      tableCols: [
        {
          dataField: 'icd10',
          editable: false,
          className: 'col-md-2 tableStyle headerStyle',
          columnClassName: 'col-md-2 tableStyle rowStyle',
        },
        {
          dataField: 'description',
          editable: false,
          className: 'col-md-7 tableStyle headerStyle',
          columnClassName: 'col-md-7 tableStyle rowStyle',
        },

        {
          dataField: 'snomed',
          editable: false,
          className: 'col-md-2 tableStyle headerStyle',
          columnClassName: 'col-md-2 tableStyle rowStyle',
        }
      ],
      rightActions: [
        {
          "action": "delete",
          className: 'table-action',
          columnClassName: 'table-action',
          editColumnClassName: 'table-action',
          icon: 'glyphicon glyphicon-option-vertical'
        },
      ],
    },
    imo: {
      freeText: false,
    },
  },
}
