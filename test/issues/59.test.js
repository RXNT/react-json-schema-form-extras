import tableConfFactory from "../../src/table/tableConfFactory";
import columnHeadersFactory from "../../src/table/columnHeadersFactory";
import fields from "../../src";

const schema = {
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
};

const uiSchema = {
  classNames: "col-md-12",
  "ui:field": "table",
  "ui:options": {
    label: false,
  },
  table: {
    tableCols: [
      {
        dataField: "drugId",
        hidden: true,
      },
      {
        dataField: "drugName",
        field: "asyncTypeahead",
        uiSchema: {
          focusOnMount: true,
          asyncTypeahead: {
            url:
              "/EHRV8PatientEncounterAPIServices/ehrv8/encounter/SearchMedications",
            optionsPath: "Drugs",
            mapping: {
              drugName: "DrugName",
              drugId: "DrugId",
            },
            minLength: 2,
            labelKey: "DrugName",
            cleanAfterSelection: true,
          },
        },
      },
      {
        dataField: "dosage",
        className: "col-md-1",
        editable: true,
        columnClassName: "col-md-1",
        editColumnClassName: "col-md-1",
      },
      {
        dataField: "quantity",
        className: "col-md-1",
        editable: true,
        columnClassName: "col-md-1",
        editColumnClassName: "col-md-1",
      },
      {
        dataField: "unit",
        className: "col-md-1",
        editable: true,
        columnClassName: "col-md-1",
        editColumnClassName: "col-md-1",
      },
      {
        dataField: "refills",
        className: "col-md-1",
        editable: true,
        columnClassName: "col-md-1",
        editColumnClassName: "col-md-1",
      },
      {
        dataField: "useGeneric",
        className: "col-md-1",
        editable: true,
        columnClassName: "col-md-1",
        editColumnClassName: "col-md-1",
      },
    ],
    focusOnAdd: 1,
    rightActions: [
      {
        action: "delete",
        className: "table-action",
        columnClassName: "table-action",
        editColumnClassName: "table-action",
        icon: "glyphicons glyphicons-remove-circle glyPhiconRedColor",
      },
    ],
  },
};

test("table keyField added only in internal tableConf", () => {
  let tableConf = tableConfFactory(uiSchema, []);

  expect(tableConf.keyField).not.toBeUndefined();
  expect(uiSchema.table.keyField).toBeUndefined();
});

test("table customEditor not added to tableConf", () => {
  expect(uiSchema.table.tableCols[1].customEditor).toBeUndefined();

  columnHeadersFactory(schema, uiSchema, fields, []);

  expect(uiSchema.table.tableCols[1].customEditor).toBeUndefined();
});
