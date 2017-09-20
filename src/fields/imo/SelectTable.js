import React from "react";
import { toTableColumns } from "../TableField";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

function selectFormatter(selectable) {
  if (selectable) {
    return `<i class='glyphicon glyphicon-ok'></i>`;
  } else {
    return `<i class='glyphicon glyphicon-plus'></i>`;
  }
}

const SELECTABLE_COLUMN = {
  dataField: "selectable",
  className: "col-md-1",
  columnClassName: "col-md-1",
  dataFormat: selectFormatter,
};

const toColumns = schema => {
  let columns = toTableColumns(schema);
  columns.unshift(SELECTABLE_COLUMN);
  columns.forEach(column => (column.editable = false));
  return columns;
};

const SelectTable = ({ data, schema, onRowClick }) => {
  let columns = toColumns(schema);
  let options = { onRowClick };
  let selectRow = {
    mode: "radio",
    clickToSelect: true,
    hideSelectColumn: true,
  };
  return (
    <BootstrapTable data={data} options={options} selectRow={selectRow} hover>
      {columns.map((column, i) => {
        return (
          <TableHeaderColumn key={i} {...column} isKey={i === 0}>
            {column.displayName}
          </TableHeaderColumn>
        );
      })}
    </BootstrapTable>
  );
};

export default SelectTable;
