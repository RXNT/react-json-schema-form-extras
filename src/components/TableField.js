import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const DEFAULT_TABLE_CONF = {
  cellEdit: {
    mode: "click",
    blurToSave: true,
  },
  options: {},
  selectRow: {
    mode: "checkbox",
  },
  deleteRow: true,
};

function toEditable(fieldProp) {
  if (fieldProp.enum) {
    return {
      type: "select",
      options: { values: fieldProp.enum },
    };
  } else if (fieldProp.type === "boolean") {
    return {
      type: "checkbox",
    };
  } else if (fieldProp.type === "date-time") {
    return {
      type: "datetime",
    };
  } else if (fieldProp.type === "date") {
    return {
      type: "date",
    };
  } else if (fieldProp.type === "time") {
    return {
      type: "time",
    };
  }
  return true;
}

export function toTableColumns(schema, tableCols = []) {
  let { items: { properties } } = schema;

  let schemaCols = Object.keys(properties).map(dataField => {
    let { title } = properties[dataField];
    let editable = toEditable(properties[dataField]);
    return { dataField, displayName: title, editable };
  });

  return schemaCols.map(sCol => {
    let tCol = tableCols.find(col => col.dataField === sCol.dataField);
    return Object.assign(sCol, tCol);
  });
}

class TableField extends Component {
  handleCellSave = updRow => {
    const { uiSchema: { table: { keyField } }, formData } = this.props;
    const targetKey = updRow[keyField];

    let updTable = formData.map(
      row => (row[keyField] === targetKey ? updRow : row)
    );

    this.props.onChange(updTable);
    return updTable;
  };

  handleRowsDelete = removedKeys => {
    const { uiSchema: { table: { keyField } }, formData } = this.props;

    let filteredRows = formData.filter(row => {
      let rowKey = row[keyField];
      return !removedKeys.includes(rowKey);
    });
    this.props.onChange(filteredRows);
  };

  render() {
    let { schema, uiSchema: { table }, formData } = this.props;

    let tableConf = Object.assign({}, DEFAULT_TABLE_CONF, table, {
      data: formData,
    });

    tableConf.cellEdit.afterSaveCell = this.handleCellSave;
    tableConf.options.afterDeleteRow = this.handleRowsDelete;

    let columns = toTableColumns(schema, table.tableCols);

    return (
      <BootstrapTable {...tableConf}>
        {columns.map((column, i) => {
          return (
            <TableHeaderColumn key={i} {...column}>
              {column.displayName}
            </TableHeaderColumn>
          );
        })}
      </BootstrapTable>
    );
  }
}

export default TableField;
