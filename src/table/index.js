import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import tableConfFrom, { removePosition } from "./tableConfFactory";
import columnHeadersFrom from "./columnHeadersFactory";

class TableField extends Component {
  handleCellSave = (updRow, cellName, cellValue) => {
    let { keyField, data } = this.tableConf;

    // Small hack to support object returned from async autocomplete
    // Don't judge me too hard
    if (cellValue[cellName]) {
      Object.assign(updRow, cellValue);
    }

    const targetKey = updRow[keyField];
    let updTable = data.map(
      row => (row[keyField] === targetKey ? updRow : row)
    );

    this.props.onChange(removePosition(updTable));
  };

  handleRowsDelete = removedKeys => {
    const { keyField, data } = this.tableConf;

    let filteredRows = data.filter(row => {
      let rowKey = row[keyField];
      return !removedKeys.includes(rowKey);
    });

    this.props.onChange(removePosition(filteredRows));
  };

  render() {
    let {
      uiSchema,
      schema,
      formData,
      registry: { fields },
      onChange,
    } = this.props;

    this.tableConf = tableConfFrom(
      uiSchema,
      formData,
      this.handleCellSave,
      this.handleRowsDelete
    );
    let columns = columnHeadersFrom(
      schema,
      uiSchema,
      fields,
      formData,
      onChange
    );

    return (
      <BootstrapTable {...this.tableConf}>
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
