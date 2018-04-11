import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import tableConfFrom, { removePosition } from "./tableConfFactory";
import columnHeadersFrom from "./columnHeadersFactory";
import moment from "moment";

function convertFields(cellValue, { type, format, default: def }) {
  if (cellValue === undefined) {
    return cellValue;
  }

  if (type === "boolean") {
    return cellValue === "true";
  } else if (type === "number") {
    return cellValue !== undefined && cellValue != ""
      ? parseFloat(cellValue)
      : "";
  } else if (type === "string" && format === "date-time") {
    if (cellValue === "") {
      return def;
    } else {
      let date = new Date(cellValue);
      return date.toISOString();
    }
  } else if (type === "string" && format === "date") {
    if (cellValue === "") {
      return def;
    } else {
      let date = moment(cellValue).format("YYYY-MM-DD");
      return date;
    }
  }
  return cellValue;
}

class TableField extends Component {
  constructor(props) {
    super(props);

    // var components = this.props.schema.items.properties;
    // Object.keys(components).map(item => {
    //   if (
    //     components[item].format === "date" ||
    //     components[item].format === "date-time"
    //   ) {
    //     if (components[item].default === "currentDate") {
    //       components[item].format === "date"
    //         ? (components[item]["default"] = new Date()
    //             .toISOString()
    //             .substr(0, 10))
    //         : (components[item]["default"] = new Date());
    //     }
    //   }
    // });

    this.handleCellSave = this.handleCellSave.bind(this);
    this.handleRowsDelete = this.handleRowsDelete.bind(this);
  }

  handleCellSave(updRow, cellName, cellValue) {
    let { keyField, data } = this.tableConf;
    let fieldSchema = this.props.schema.items.properties[cellName];
    updRow[cellName] = convertFields(cellValue, fieldSchema);
    // Small hack to support object returned from async autocomplete
    // Don't judge me too hard
    if (cellValue && cellValue[cellName]) {
      Object.assign(updRow, cellValue);
    }

    const targetKey = updRow[keyField];
    let updTable = data.map(
      row => (row[keyField] === targetKey ? updRow : row)
    );

    /* Number field Validation => if Number is Undefined Or Empty, it should removed from the FormData */
    let { type } = fieldSchema;
    if (type === "number") {
      Object.keys(updTable[targetKey]).map(function(column) {
        if (
          (column == cellName && updTable[targetKey][column] === undefined) ||
          updTable[targetKey][column] == ""
        ) {
          delete updTable[targetKey][column];
        }
      });
    }
    /* end Number Filed validation  */
    this.props.onChange(removePosition(updTable));
  }

  handleRowsDelete(removedKeys) {
    const { keyField, data } = this.tableConf;

    let filteredRows = data.filter(row => {
      let rowKey = row[keyField];
      return !removedKeys.includes(rowKey);
    });

    this.props.onChange(removePosition(filteredRows));
  }

  componentWillReceiveProps(nextProps) {
    let { uiSchema: { table: { focusOnAdd } = {} } } = nextProps;

    this.adding =
      focusOnAdd !== undefined &&
      nextProps.formData &&
      this.props.formData &&
      nextProps.formData.length > this.props.formData.length;
  }
  // adds current date to default for table schema

  componentDidUpdate() {
    if (this.adding) {
      let { uiSchema: { table: { focusOnAdd } } } = this.props;

      let body = this.refs.table.refs.body
        ? this.refs.table.refs.body
        : this.refs.table.body;
      if (!body || !body.handleEditCell) {
        console.error("Can't find body in the table");
        return;
      }
      body.handleEditCell(this.props.formData.length, focusOnAdd);
    }
  }

  render() {
    let {
      uiSchema,
      schema,
      formData,
      registry: { fields },
      idSchema: { $id } = {},
      onChange,
    } = this.props;

    this.tableConf = tableConfFrom(
      uiSchema,
      formData,
      this.handleCellSave,
      this.handleRowsDelete
    );

    this.tableConf.cellEdit.beforeSaveCell = this.beforeSaveCell;
    let columns = columnHeadersFrom(
      schema,
      uiSchema,
      fields,
      formData,
      onChange
    );

    return (
      <div id={$id}>
        <BootstrapTable {...this.tableConf} ref="table">
          {columns.map((column, i) => {
            return (
              <TableHeaderColumn key={i} {...column}>
                {column.displayName}
              </TableHeaderColumn>
            );
          })}
        </BootstrapTable>
      </div>
    );
  }
}

export default TableField;
