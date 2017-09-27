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
  handleConfirmDeleteRow: next => next(),
};

const POSITION_KEY = "_position";

function addIndex(data) {
  return data.map((el, i) => Object.assign({}, el, { [POSITION_KEY]: i }));
}

function removeIndex(data) {
  return data.map(el => {
    let newEl = Object.assign({}, el);
    delete newEl[POSITION_KEY];
    return newEl;
  });
}

function toDataFormat(fieldProp) {
  if (fieldProp.enum && fieldProp.enumNames) {
    return cell => {
      return fieldProp.enumNames[fieldProp.enum.indexOf(cell)];
    };
  }
  return undefined;
}

function toEditable(fieldProp) {
  if (fieldProp.enum) {
    if (fieldProp.enumNames) {
      let values = fieldProp.enum.map((value, i) => {
        let text = fieldProp.enumNames[i];
        return { value, text };
      });
      return {
        type: "select",
        options: { values },
      };
    } else {
      return {
        type: "select",
        options: { values: fieldProp.enum },
      };
    }
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

function setColumnCSSIfMissing(col, css) {
  col.className = col.className ? col.className : css;
  col.columnClassName = col.columnClassName ? col.columnClassName : css;
}

function withColumnCss(columns) {
  let shownColumns = columns.filter(
    col => col.hidden === undefined || !col.hidden
  );
  let numCols = shownColumns.length;
  let colSize = Math.round(12 / numCols);
  if (colSize == 0) {
    return columns;
  }

  let colCss = `col-md-${colSize}`;
  shownColumns.forEach((col, i) => {
    if (i != 0) {
      setColumnCSSIfMissing(col, colCss);
    }
  });
  return columns;
}

export function toTableColumns(schema, tableCols = []) {
  let { items: { properties } } = schema;

  let schemaCols = Object.keys(properties).map(dataField => {
    let { title } = properties[dataField];
    let editable = toEditable(properties[dataField]);
    let dataFormat = toDataFormat(properties[dataField]);
    return { dataField, displayName: title, editable, dataFormat };
  });

  let columnsWithOverrides = schemaCols.map(sCol => {
    let tCol = tableCols.find(col => col.dataField === sCol.dataField);
    return Object.assign(sCol, tCol);
  });

  return withColumnCss(columnsWithOverrides);
}

class TableField extends Component {
  toTableConf = () => {
    let { uiSchema: { table = {} }, formData = [] } = this.props;

    if (table.keyField === undefined || table.keyField === POSITION_KEY) {
      table.keyField = POSITION_KEY;
      formData = addIndex(formData);
    }

    let tableConf = Object.assign({}, DEFAULT_TABLE_CONF, table, {
      data: formData,
    });

    tableConf.cellEdit.afterSaveCell = this.handleCellSave;
    tableConf.options.afterDeleteRow = this.handleRowsDelete;

    return tableConf;
  };

  handleCellSave = updRow => {
    let { keyField, data } = this.toTableConf();

    const targetKey = updRow[keyField];
    let updTable = data.map(
      row => (row[keyField] === targetKey ? updRow : row)
    );

    this.props.onChange(removeIndex(updTable));
    return updTable;
  };

  handleRowsDelete = removedKeys => {
    const { keyField, data } = this.toTableConf();

    let filteredRows = data.filter(row => {
      let rowKey = row[keyField];
      return !removedKeys.includes(rowKey);
    });

    this.props.onChange(removeIndex(filteredRows));
  };

  render() {
    let tableConf = this.toTableConf();
    let columns = toTableColumns(this.props.schema, tableConf.tableCols);

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
