import React from "react";

function actionFactory(action, actionConfiguration, schema) {if (action === "update") {
  return (cell, row, enumObject, rowIndex, formData, onChange) => {
    let newFormData = formData.slice(0);   
    if (rowIndex != undefined) {
      newFormData.map(function(value, index){
        if (rowIndex === index){
          let actionToApply = 0; // 0 - update(soft delete), 1 - delete(hard delete)
          let { mandatoryField = undefined, fieldToUpdate = undefined } = actionConfiguration;

          if(mandatoryField !== undefined){
            mandatoryField.map((mandatory) =>{
                if(value[mandatory] === undefined || value[mandatory] === ""){
                  actionToApply = 1;
                }
            });
          }
          if(actionToApply === 0){ // just updating the Column
            if(fieldToUpdate !== undefined){
              let update = [];
              fieldToUpdate.map(
                (fieldToUpdate) => {
                  if(schema[fieldToUpdate] !== undefined){
                    if(schema[fieldToUpdate]["type"] === "boolean"){
                      update[fieldToUpdate] = !value[fieldToUpdate];
                    } // can add separate block for each type of input
                    newFormData[index] =  Object.assign({},  value, update );
                  }
                });
            }
          }else if(actionToApply === 1){ //Hard delete the row
            newFormData.splice(rowIndex, 1);
            onChange(newFormData);  
          }
        });
      }
      onChange(newFormData);
    };
  } else if (action === "delete") {
    return (cell, row, enumObject, rowIndex, formData, onChange) => {
      let newFormData = formData.slice(0);
      newFormData.splice(rowIndex, 1);
      onChange(newFormData);
    };
  } else if (action === "moveup") {
    return (cell, row, enumObject, rowIndex, formData, onChange) => {
      let newFormData = formData.slice(0);
      let temp = newFormData[rowIndex];
      if (rowIndex >= 1) {
        newFormData[rowIndex] = newFormData[rowIndex - 1];
        newFormData[rowIndex - 1] = temp;
        onChange(newFormData);
      }
    };
  } else if (action === "movedown") {
    return (cell, row, enumObject, rowIndex, formData, onChange) => {
      let newFormData = formData.slice(0);
      let temp = newFormData[rowIndex];
      if (rowIndex <= formData.length - 2) {
        newFormData[rowIndex] = newFormData[rowIndex + 1];
        newFormData[rowIndex + 1] = temp;
        onChange(newFormData);
      }
    };
  } else if (typeof action === "function") {
    return action;
  } else {
    return undefined;
  }
}

function actionColumnFrom(
  { action, icon, text, actionConfiguration = false },
  schema
) {
  let { filterField = false, actionCompletedIcon = "" } = actionConfiguration;
  let handleClick = actionFactory(action, actionConfiguration, schema);
  if (!handleClick) {
    return {};
  }

  return {
    dataField: icon,
    dataFormat: (cell, row, enumObject, rowIndex, formData, onChange) => (
      <span
        onClick={() =>
          handleClick(cell, row, enumObject, rowIndex, formData, onChange)
        }>
        <i
          className={
            row[filterField] || row[filterField] === undefined
              ? icon
              : actionCompletedIcon
          }
        />
        {text}
      </span>
    ),
    editable: false,
  };
}

const actionToCol = (formData, onChange, schema) => actionConf => {
  let genericConf = actionColumnFrom(actionConf, schema);
  let realDataFormat = actionConf.dataFormat
    ? actionConf.dataFormat
    : genericConf.dataFormat;
  return Object.assign({}, actionConf, genericConf, {
    dataFormat: (cell, row, enumObject, rowIndex) =>
      realDataFormat(cell, row, enumObject, rowIndex, formData, onChange),
  });
};

export default function actionHeadersFrom(
  schema,
  uiSchema,
  formData,
  onChange
) {
  let { table: { rightActions = [], leftActions = [] } = {} } = uiSchema;
  let { items: { properties = [] } } = schema;

  let rightColumns = rightActions.map(
    actionToCol(formData, onChange, properties)
  );
  let leftColumns = leftActions.map(
    actionToCol(formData, onChange, properties)
  );
  return { rightColumns, leftColumns };
}
