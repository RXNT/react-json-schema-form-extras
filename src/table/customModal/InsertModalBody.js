/* eslint react/display-name: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import editor from "react-bootstrap-table/lib/Editor";
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

class InsertModalBody extends Component {
  getFieldValue() {
    const newRow = {};
    let { schema } = this.props;
    this.props.columns.forEach((column, i) => {
      let fieldSchema = schema.items.properties[column.field];
      let inputVal;
      if (column.autoValue) {
        // when you want same auto generate value and not allow edit, example ID field
        const time = new Date().getTime();
        inputVal =
          typeof column.autoValue === "function"
            ? column.autoValue()
            : `autovalue-${time}`;
      } else if (column.hiddenOnInsert || !column.field) {
        inputVal = "";
      } else {
        const dom = this.refs[column.field];
        inputVal = dom ? dom.value : undefined;

        if (column.editable && column.editable.type === "checkbox") {
          const values = inputVal.split(":");
          inputVal = dom.checked ? values[0] : values[1];
        } else if (column.customInsertEditor) {
          inputVal = inputVal || dom.getFieldValue();
        }
      }
      let convertedField = convertFields(
        inputVal,
        fieldSchema ? fieldSchema : {}
      );
      if (convertedField && convertedField !== "") {
        newRow[column.field] = convertedField;
      }
    }, this);

    return newRow;
  }

  render() {
    const { columns, validateState, ignoreEditable } = this.props;
    return (
      <div className="modal-body">
        {columns.map((column, i) => {
          const {
            editable,
            format,
            field,
            name,
            autoValue,
            hiddenOnInsert,
            customInsertEditor,
          } = column;

          if (!column.name) {
            return;
          }

          const attr = {
            ref: field,
            placeholder: editable.placeholder ? editable.placeholder : name,
          };
          let fieldElement;
          const defaultValue = editable.defaultValue || undefined;
          if (customInsertEditor) {
            const { getElement } = customInsertEditor;
            fieldElement = getElement(
              column,
              attr,
              "form-control",
              ignoreEditable,
              defaultValue
            );
          }

          // fieldElement = false, means to use default editor when enable custom editor
          // Becasuse some users want to have default editor based on some condition.
          if (!customInsertEditor || fieldElement === false) {
            fieldElement = editor(
              editable,
              attr,
              format,
              "",
              defaultValue,
              ignoreEditable
            );
          }

          if (autoValue || hiddenOnInsert || !column.field) {
            // when you want same auto generate value
            // and not allow edit, for example ID field
            return null;
          }
          let errorStyle = {};
          if (this.props.errorFields.includes(field)) {
            errorStyle = {
              border: "1px solid red",
            };
          }
          const error = validateState[field] ? (
            <span className="help-block bg-danger">{validateState[field]}</span>
          ) : null;

          return (
            <div className="form-group" key={field}>
              <label>{name}</label>
              <span className="help-block bg-danger" style={errorStyle}>
                {fieldElement}
              </span>
              {error}
            </div>
          );
        })}
      </div>
    );
  }
}
InsertModalBody.propTypes = {
  columns: PropTypes.array,
  validateState: PropTypes.object,
  ignoreEditable: PropTypes.bool,
};

InsertModalBody.defaultProps = {
  validateState: {},
  ignoreEditable: false,
};

export default InsertModalBody;
