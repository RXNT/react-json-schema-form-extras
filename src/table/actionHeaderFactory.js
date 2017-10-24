import React from "react";

function actionFactory(action) {
  if (action === "delete") {
    return (cell, row, enumObject, rowIndex, formData, onChange) => {
      let newFormData = formData.slice(0);
      newFormData.splice(rowIndex, 1);
      onChange(newFormData);
    };
  } else if (typeof action === "function") {
    return action;
  } else {
    return undefined;
  }
}

function actionColumnFrom({ action, icon, text }) {
  let handleClick = actionFactory(action);
  if (!handleClick) {
    return {};
  }
  return {
    dataField: icon,
    dataFormat: (cell, row, enumObject, rowIndex, formData, onChange) => (
      <span
        onClick={() =>
          handleClick(cell, row, enumObject, rowIndex, formData, onChange)}>
        <i className={icon} />
        {text}
      </span>
    ),
    editable: false,
  };
}

const actionToCol = (formData, onChange) => actionConf => {
  let genericConf = actionColumnFrom(actionConf);
  let realDataFormat = actionConf.dataFormat
    ? actionConf.dataFormat
    : genericConf.dataFormat;
  return Object.assign({}, actionConf, genericConf, {
    dataFormat: (cell, row, enumObject, rowIndex) =>
      realDataFormat(cell, row, enumObject, rowIndex, formData, onChange),
  });
};

export default function actionHeadersFrom(uiSchema, formData, onChange) {
  let { table: { rightActions = [], leftActions = [] } = {} } = uiSchema;
  let rightColumns = rightActions.map(actionToCol(formData, onChange));
  let leftColumns = leftActions.map(actionToCol(formData, onChange));
  return { rightColumns, leftColumns };
}
