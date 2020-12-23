import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import tableConfFrom, { removePosition } from "./tableConfFactory";
import columnHeadersFrom from "./columnHeadersFactory";
import moment from "moment";
import InsertModal from "./customModal/InsertModal";

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
function getFieldValue(cellValue, type, format, dataFormat) {
  if (type === "boolean") {
    return cellValue === "true";
  } else if (type === "number") {
    return cellValue !== undefined && cellValue != ""
      ? parseFloat(cellValue)
      : "";
  } else if (type === "string" && format === "date-time") {
    if (cellValue === "") {
      return "";
    } else {
      let date = new Date(cellValue);
      return date.toISOString();
    }
  } else if (type === "string" && format === "date") {
    if (cellValue === "") {
      return "";
    } else {
      let date = moment(cellValue).format(dataFormat);
      return date;
    }
  }
  return cellValue;
}
function isEquivalentObject(a, b) {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent

  return true;
}

class TableField extends Component {
  constructor(props) {
    super(props);
    this.handleCellSave = this.handleCellSave.bind(this);
    this.handleRowsDelete = this.handleRowsDelete.bind(this);
    this.handleDeletedRow = this.handleDeletedRow.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleAllRowSelect = this.handleAllRowSelect.bind(this);
    this.isRowExpandable = this.isRowExpandable.bind(this);
    this.myRowExpand = this.myRowExpand.bind(this);
  }
  handleDeletedRow(row, rowIdx, c) {
    let { items: { defaultFilterKey = undefined } } = this.props.schema;
    let { table: { rightActions } } = this.props.uiSchema;

    let highlightRow = "";
    if (rightActions) {
      let classAfterAction = rightActions.map(rightAction => {
        if (rightAction.action === "update") {
          let {
            actionConfiguration: { actionCompletedClassName = false }
          } = rightAction;
          return actionCompletedClassName;
        }
        return undefined;
      });
      if (!row[defaultFilterKey] && row[defaultFilterKey] !== undefined) {
        highlightRow = classAfterAction;
      }
    }
    return highlightRow;
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
          (column === cellName && updTable[targetKey][column] === undefined) ||
          updTable[targetKey][column] === ""
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
  handleRowSelect(row, isSelected, e) {
    const {
      data,
      selectRow: { onSelectRow: { fieldToUpdate = "picked" } }
    } = this.tableConf;
    let filteredRows = (data || []).map(item => {
      if (!isSelected && item[fieldToUpdate] !== undefined) {
        if (isEquivalentObject(item, row)) {
          delete item[fieldToUpdate];
        }
      } else if (isEquivalentObject(item, row)) {
        item[fieldToUpdate] = isSelected;
      }
      return item;
    });
    this.props.onChange(filteredRows);
  }
  handleAllRowSelect(isSelected, rows, e) {
    const {
      // data,
      selectRow: { onSelectAllRow: { fieldToUpdate = "picked" } }
    } = this.tableConf;

    let filteredRows = (rows || []).map(item => {
      if (!isSelected && item[fieldToUpdate] !== undefined) {
        delete item[fieldToUpdate];
      } else {
        item[fieldToUpdate] = isSelected;
      }
      return item;
    });
    this.props.onChange(filteredRows);
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
      let { uiSchema: { table: { focusOnAdd, focusRowIndex } } } = this.props;

      let body = this.refs.table.refs.body
        ? this.refs.table.refs.body
        : this.refs.table.body;
      if (!body || !body.handleEditCell) {
        console.error("Can't find body in the table");
        return;
      }
      body.handleEditCell(
        focusRowIndex ? focusRowIndex : this.props.formData.length,
        focusOnAdd
      );
    }
  }

  createCustomModal = (
    onModalClose,
    onSave,
    columns,
    validateState,
    ignoreEditable
  ) => {
    let { formData, schema, uiSchema, onChange, registry } = this.props;
    const attr = {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable,
      formData,
      onChange,
      schema,
      uiSchema,
      registry,
      version: "1"
    };
    return <InsertModal {...attr} />;
  };
  isRowExpandable(isTableExpandable) {
    return (
      this.props.uiSchema.table &&
      (this.props.uiSchema.table.isTableExpandable ||
        this.props.uiSchema.table.isTableExpandable !== undefined)
    );
  }

  myRowExpand(currentTableData) {
    let {
      schema: { items: { properties = [] } },
      uiSchema: { table: { tableCols = [] } }
    } = this.props;

    let tableList = tableCols.map(function(item) {
      const { includeInExpandedRow = false, dataField = "" } = item;
      let { title = "", ...dynamicItems } = properties[dataField];
      if (includeInExpandedRow) {
        const order = item["ui:order"] !== undefined ? item["ui:order"] : [];
        const fieldData = currentTableData[dataField] || {};
        let isComponentDataAvailable = false;
        if (order.length > 0) {
          let tableListData = order.map(function(fieldName) {
            let { title = "", type = "", format = "" } = properties[
              dataField
            ].properties[fieldName];
            const { dataFormat, includeInExpandedRow = false } = item[
              fieldName
            ];
            if (
              fieldData[fieldName] !== undefined &&
              fieldData[fieldName] !== "" &&
              includeInExpandedRow
            ) {
              isComponentDataAvailable = true;
              switch (type) {
                case "string":
                  return (
                    <div className="customTable-item">
                      <span className="customTable-item-subheader">
                        {title}
                      </span>
                      {` ${getFieldValue(
                        fieldData[fieldName],
                        type,
                        format,
                        dataFormat
                      )}`}
                    </div>
                  );
                case "object":
                  if (Object.keys(fieldData[fieldName]).length > 0) {
                    return (
                      <div className="customTable-item">
                        <span className="customTable-item-subheader">
                          {title}
                        </span>
                        {` ${fieldData[fieldName].description}`}
                      </div>
                    );
                  }
              }
            }
            return;
          });
          return (
            isComponentDataAvailable && (
              <div className="customTable-expandedItems">
                <div className="customTable-itemHeading">{title}:</div>
                <div>{tableListData}</div>
              </div>
            )
          );
        } else {
          const { properties = {} } = dynamicItems;
          let tableList = Object.keys(properties);
          let tableListData = tableList.map(function(fieldName, i) {
            if (
              fieldData[fieldName] !== undefined &&
              Object.keys(fieldData[fieldName]).length > 0
            ) {
              isComponentDataAvailable = true;
              return (
                <li className="customTable-item">
                  {fieldData[fieldName].code +
                    " - " +
                    fieldData[fieldName].description}
                </li>
              );
            }
            return;
          });
          return (
            isComponentDataAvailable && (
              <div className="customTable-expandedItems">
                <div className="customTable-itemHeading">{title}:</div>
                <ol>{tableListData}</ol>
              </div>
            )
          );
        }
      }
    });
    return <div className="customTable-expandedContent">{tableList}</div>;
  }
  expandColumnComponent({ isExpandableRow, isExpanded }) {
    let icon = <span className={`fa fa-plus glyphicon`} />;

    if (isExpandableRow) {
      let expandImgSrc = isExpanded ? "upChevron" : "downChevron";
      icon = (
        <img src={`/ehrv8/EncounterV2Template/images/${expandImgSrc}.png`} />
      );
    }

    return icon;
  }
  getExpandableTableOptions() {
    if (
      this.props.uiSchema.table &&
      (this.props.uiSchema.table.isTableExpandable ||
        this.props.uiSchema.table.isTableExpandable !== undefined)
    ) {
      const { expandBy = "column", ...otherTableOptions } =
        this.props.uiSchema.table.expandableTableOptions || {}; // expandableTableOptions is option from the uischema
      return { expandBy, ...otherTableOptions };
    }
  }
  forceReRenderTable = () => this.forceUpdate();

  handleRowColorChange = (row, rowIndx) => {
    let tableName = this.props.name;
    if (tableName === "diagnosis") {
      if (row.procedureCode && row.procedureCode.length > 0) {
        return "rxntBlueBackground";
      } else {
        return "rxntWhiteBackground";
      }
    }
    if (tableName === "procedureCodes") {
      return "rxntWhiteBackground";
    }
  };

  render() {
    let {
      uiSchema,
      schema,
      formData,
      registry: { fields },
      idSchema: { $id } = {},
      onChange
    } = this.props;

    let forceReRenderTable = this.forceReRenderTable;

    this.tableConf = tableConfFrom(
      uiSchema,
      formData,
      this.handleCellSave,
      this.handleRowsDelete,
      this.handleDeletedRow,
      this.handleRowSelect,
      this.handleAllRowSelect,
      this.myRowExpand,
      this.isRowExpandable,
      this.expandColumnComponent
    );
    const expandableTableOptions = this.getExpandableTableOptions();
    this.tableConf.options.insertModal = this.createCustomModal;
    const boostrapTableOptions = {
      insertModal: this.createCustomModal,
      ...expandableTableOptions
    };
    this.tableConf.options = boostrapTableOptions;

    this.tableConf.cellEdit.beforeSaveCell = this.beforeSaveCell;
    let columns = columnHeadersFrom(
      schema,
      uiSchema,
      fields,
      formData,
      onChange,
      forceReRenderTable
    );

    return (
      <div id={$id}>
        <BootstrapTable {...this.tableConf}  trClassName={this.handleRowColorChange} ref="table">
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
