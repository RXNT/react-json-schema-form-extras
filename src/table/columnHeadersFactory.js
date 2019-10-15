import React from "react";
import actionHeaderFrom from "./actionHeaderFactory";
import moment from "moment";

const toColumnClassNames = (fieldProp, fieldUIProp, customRowConfiguration) => {
  if (
    fieldProp.type === "string" &&
    Object.keys(customRowConfiguration).length > 0
  ) {
    let classNameAdd = false;
    let fieldToValidate = false;
    Object.keys(customRowConfiguration.action).map(function(action) {
      if (action === "updateClassNames") {
        let { classToAdd, validate } = customRowConfiguration.action[action];
        //adding class into the row
        let { classNameToAdd, columnsToAdd } = classToAdd;
        let { field } = validate;
        let fieldToAddClass = columnsToAdd
          ? columnsToAdd.find(cols => cols === fieldUIProp.dataField)
          : false;
        if (fieldToAddClass) {
          classNameAdd = classNameToAdd;
          fieldToValidate = field;
        }
      }
    });
    if (classNameAdd && fieldToValidate) {
      return (cell, row) =>
        typeof row[fieldToValidate] === "undefined" || !(fieldToValidate in row)
          ? classNameAdd
          : "";
    }
  }
};
const toDataAlignment = fieldProp => {
  if (fieldProp.type === "number") {
    return "right";
  } else if (fieldProp.format === "date" || fieldProp.format === "date-time") {
    return "right";
  }
};
const toDataHelpText = (fieldProp, fieldUIProp) => {
  let { enableHelpText = false } = fieldUIProp;
  if (fieldProp && fieldUIProp) {
    if (enableHelpText) {
      if (fieldProp.type === "boolean") {
        return cell => {
          return cell ? "Yes" : "No";
        };
      } else if (fieldProp.enum && fieldProp.enumNames) {
        return cell => fieldProp.enumNames[fieldProp.enum.indexOf(cell)];
      } else {
        return cell => {
          return cell ? cell.toString() : "";
        };
      }
    }
  }
  return undefined;
};
const toDataFormat = (fieldProp, fieldUIProp, defaultFilterKey) => {
  if (fieldProp.enum && fieldProp.enumNames) {
    return cell => fieldProp.enumNames[fieldProp.enum.indexOf(cell)];
  } else if (fieldProp.type === "boolean") {
    return (cell, row) => (
      <div
        className={
          defaultFilterKey
            ? !row[defaultFilterKey] ? "deleted-row-boolean-column" : ""
            : ""
        }
        style={{ textAlign: "right" }}>
        <label>{cell ? "Yes" : "No"}</label>
      </div>
    );
  } else if (
    fieldUIProp !== undefined &&
    fieldUIProp.columnCustomFormat !== undefined
  ) {
    let columnCustomFormat = JSON.parse(fieldUIProp.columnCustomFormat);
    let funcBody = JSON.parse(
      JSON.stringify(columnCustomFormat.function.body).replace(/&nbsp;/g, " ")
    );
    let customFunc = new Function(
      columnCustomFormat.function.arguments,
      funcBody
    );
    return (cell, row) => customFunc(cell, row, fieldProp);
  }
  return undefined;
};

const toEditable = fieldProp => {
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
  } else if (fieldProp.format === "date-time") {
    return {
      type: "datetime-local",
    };
  } else if (fieldProp.format === "date") {
    return {
      type: "date",
    };
  } else if (fieldProp.format === "time") {
    return {
      type: "time",
    };
  } else if (fieldProp.type === "number") {
    return {
      type: "number",
    };
  }
  return true;
};

const columnHeadersFromSchema = (schema, uiSchema) => {
  let { items: { properties, defaultFilterKey = false } } = schema;

  let { table: { tableCols, tableConfig = {} } } = uiSchema;
  let schemaCols = Object.keys(properties).map(dataField => {
    let { title } = properties[dataField];
    let editable = toEditable(properties[dataField]);
    let uiProperties = tableCols
      ? tableCols.find(cols => cols.dataField === dataField)
      : false;
    let { customRowConfiguration = {} } = tableConfig;
    let dataFormat = toDataFormat(
      properties[dataField],
      uiProperties,
      defaultFilterKey
    );
    let dataAlign = toDataAlignment(properties[dataField]);
    let columnClassName = toColumnClassNames(
      properties[dataField],
      uiProperties,
      customRowConfiguration
    );

    let columnTitle = false;
    if (uiProperties) {
      columnTitle = toDataHelpText(properties[dataField], uiProperties);
    }

    return {
      dataField,
      displayName: title,
      editable,
      dataFormat,
      dataAlign,
      columnTitle,
      columnClassName,
    };
  });
  return schemaCols;
};

export function overrideColDataFormat(colConf, fieldSchema, formData) {
  if (typeof colConf.dataFormat === "string" && fieldSchema.type === "object") {
    const { dataField, dataFormat: field } = colConf;
    colConf.dataFormat = function(cell, row) {
      return row[dataField] ? row[dataField][field] : undefined;
    };
    colConf.dataFormat.bind(this);
  } else if (
    typeof colConf.dataFormat === "string" &&
    fieldSchema.type === "string" &&
    (fieldSchema.format === "date-time" || fieldSchema.format === "date")
  ) {
    const { dataField, dataFormat, defaultCurrentDate = false } = colConf;
    colConf.dataFormat = function(cell, row) {
      if (!row[dataField] && !defaultCurrentDate) {
        return undefined;
      }
      let fieldVal =
        defaultCurrentDate && !row[dataField] ? new Date() : row[dataField];
      if (typeof fieldVal === "string") {
        return moment(fieldVal).format(dataFormat);
      }
      if (fieldSchema && fieldSchema.format === "date-time") {
        formData[row["_position"]][dataField] = moment(
          fieldVal.toISOString()
        ).format("YYYY-MM-DDTHH:mm:ssZ"); //Updating the formdata for the default date-time
      } else {
        formData[row["_position"]][dataField] = moment(
          fieldVal.toISOString()
        ).format("YYYY-MM-DD"); //Updating the formdata for the default date picker
      }
      return moment(fieldVal.toISOString()).format(dataFormat);
    };
    colConf.dataFormat.bind(this);
  } else if (
    colConf.field !== undefined &&
    colConf.field === "asyncTypeahead"
  ) {
    //Only handle Type head with Array
    if (fieldSchema.type === "array") {
      const {
        dataField = false,
        uiSchema: {
          asyncTypeahead: { arrayItemIndicator = "glyphicon glyphicon-record" },
        },
      } = colConf;
      colConf.dataFormat = function(cell, row) {
        let displayData = "";
        if (dataField) {
          if (cell !== undefined && Object.keys(cell).length > 0) {
            Object.keys(cell).map(item => {
              displayData += `<i class='${arrayItemIndicator}'></i>${cell[item][
                dataField
              ]}  `;
            });
          }
        } else {
          displayData = "Mapping Name not available";
        }
        return displayData;
      };
      colConf.dataFormat.bind(this);
    }
  }
}

const overrideColEditable = (colConf, fieldSchema, fields) => {
  if (colConf.field && fields[colConf.field]) {
    let FieldEditor = fields[colConf.field];
    let { defaultCurrentDate = false } = colConf;
    let fieldUISchema = Object.assign(
      { "ui:autofocus": true, defaultCurrentDate: defaultCurrentDate },
      colConf.uiSchema
    );
    let fieldSchemaWithoutTitle = Object.assign(
      { ...fieldSchema },
      { title: "" }
    );
    colConf.customEditor = {
      getElement: (onUpdate, props) => (
        <FieldEditor
          formData={props.defaultValue}
          schema={fieldSchemaWithoutTitle}
          uiSchema={fieldUISchema}
          onChange={onUpdate}
        />
      ),
    };
  }else if (colConf.cellCustomEditor){ // Block to customeditorCell , html input(not json form)
    colConf.customEditor = 
     { getElement: cellCustomEditor,
       customEditorParameters: { fieldSchema: fieldSchema, fieldConf : colConf }
     }        
}
};
const cellCustomEditor = (onUpdate, props) => (<CustomCellEditor onUpdate={ onUpdate } {...props}/>);
  class CustomCellEditor extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.updateField = this.updateField.bind(this);
    this.state = {
      value: props.defaultValue,      
    };
  }
  focus() {
    this.refs.inputRef.focus();
  }
  updateData(e) {
    this.props.onUpdate(e.currentTarget.value );
  }
  updateField(newValue, props) {
    const  { cellCustomEditorProps :{ maxlength = 10}, editorFieldProps={}, type='number'} = props;
     if(type === 'number'){
      const  {cellCustomEditorProps:{ allowDigitAfterDecimal = 3 ,roundDecimal =false}} = props;
      let parseNumber = (newValue.toString().split('.')); 
      if(allowDigitAfterDecimal!== undefined){
        if(roundDecimal && (parseNumber[1] !== undefined && parseNumber[1].length > allowDigitAfterDecimal)) { // to round as decimal
        newValue = parseFloat(newValue).toFixed(allowDigitAfterDecimal);         
        }else{
          if(parseNumber[1] !== undefined && parseNumber[1].length > allowDigitAfterDecimal){
            parseNumber[1]  =  parseNumber[1].toString().substring(0, allowDigitAfterDecimal);// truncating the sting if reached the max
            newValue = parseNumber.join('.')
          }
          newValue = newValue ? ( newValue.toString().match(/^-?\d+(?:\.\d{0,3})?/) ? newValue.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0] : newValue)   : newValue;          
        }        
      }             
     } else {
      newValue = newValue;
     } 
     if(maxlength !== undefined){    
      if( newValue.toString().length > maxlength){
        newValue =  newValue.toString().substring(0, maxlength)
      }
    }   
     this.setState({ value: newValue });   
    }

  render() {
    const {fieldConf : { cellCustomEditor = {}, cellCustomEditor:  {editorFieldProps={}}},  type = 'number'} = this.props;
    return (
            <div >
             <input
                ref='inputRef'
                type={type}
                value={ this.state.value }
                 {...editorFieldProps}
                onChange= {event => this.updateField(event.currentTarget.value, cellCustomEditor)}
                onBlur = {this.updateData}
                />
            </div>           
    );
  }
}
const overrideColumns = (
  columns,
  { items: { properties } },
  uiSchema,
  fields,
  formData
) => {
  let { table: { tableCols = [] } = {} } = uiSchema;

  let columnsWithOverrides = columns.map(col => {
    let colConf = tableCols.find(
      overrideCol => overrideCol.dataField === col.dataField
    );
    if (!colConf) {
      return col;
    }
    let updCol = Object.assign({}, col, colConf);
    overrideColDataFormat(updCol, properties[col.dataField], formData);
    overrideColEditable(updCol, properties[col.dataField], fields);
    return updCol;
  });

  return columnsWithOverrides;
};

const orderColumns = (columns, uiSchema) => {
  let { table: { tableCols = [] } = {} } = uiSchema;
  let order = tableCols.map(({ dataField }) => dataField);

  if (!order || order.length === 0) {
    return columns;
  }

  let orderedColumns = columns
    .filter(({ dataField }) => order.includes(dataField))
    .sort((a, b) => order.indexOf(a.dataField) - order.indexOf(b.dataField));
  if (orderedColumns.length === 0) {
    return columns;
  }
  if (orderedColumns.length === columns.length) {
    return orderedColumns;
  }

  let nonOrderedColumns = columns.filter(nav => !orderedColumns.includes(nav));
  return orderedColumns.concat(nonOrderedColumns);
};

const setColumnCSSIfMissing = (col, css) => {
  let {
    className = css,
    columnClassName = css,
    editColumnClassName = css,
  } = col;
  Object.assign(col, { className, columnClassName, editColumnClassName });
};

const withColumnCss = columns => {
  let shownColumns = columns.filter(({ hidden }) => !hidden);
  let numCols = shownColumns.length;
  let colSize = Math.floor(12 / numCols);
  if (colSize === 0) {
    return columns;
  }

  let colCss = `col-md-${colSize}`;
  shownColumns.forEach((col, i) => {
    if (i !== 0) {
      setColumnCSSIfMissing(col, colCss);
    }
  });
  return columns;
};

const columnHeadersFactory = (
  schema,
  uiSchema,
  fields = {},
  formData,
  onChange
) => {
  let allColumns = columnHeadersFromSchema(schema, uiSchema);
  let orderedColumns = orderColumns(allColumns, uiSchema);
  let withOverrides = overrideColumns(
    orderedColumns,
    schema,
    uiSchema,
    fields,
    formData
  );
  let columnsWithCSS = withColumnCss(withOverrides);
  let { rightColumns, leftColumns } = actionHeaderFrom(
    schema,
    uiSchema,
    formData,
    onChange
  );

  leftColumns.forEach(col => columnsWithCSS.unshift(col));
  rightColumns.forEach(col => columnsWithCSS.push(col));

  return columnsWithCSS;
};

export default columnHeadersFactory;
