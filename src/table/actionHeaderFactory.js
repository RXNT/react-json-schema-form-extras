import React from "react";

function actionFactory(
  action,
  actionConfiguration,
  schema,
  dropDownAction = null
) {
  if (action === "update") {
    return (cell, row, enumObject, rowIndex, formData, onChange) => {
      let newFormData = formData.slice(0);
      if (rowIndex != undefined) {
        newFormData.map(function(value, index) {
          if (rowIndex === index) {
            let actionToApply = 0; // 0 - update(soft delete), 1 - delete(hard delete)
            let {
              mandatoryField = undefined,
              fieldToUpdate = undefined
            } = actionConfiguration;

            if (mandatoryField !== undefined) {
              mandatoryField.map(mandatory => {
                if (value[mandatory] === undefined || value[mandatory] === "") {
                  actionToApply = 1;
                }
              });
            }
            if (actionToApply === 0) {
              // just updating the Column
              if (fieldToUpdate !== undefined) {
                let update = [];
                fieldToUpdate.map(fieldToUpdate => {
                  if (schema[fieldToUpdate] !== undefined) {
                    if (schema[fieldToUpdate]["type"] === "boolean") {
                      update[fieldToUpdate] = !value[fieldToUpdate];
                    } // can add separate block for each type of input
                    newFormData[index] = Object.assign({}, value, update);
                  }
                });
              }
            } else if (actionToApply === 1) {
              //Hard delete the row
              newFormData.splice(rowIndex, 1);
              onChange(newFormData);
            }
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
  } else if (action === "dropDownAction") {
    return (rowIndex, formData, dropDownActionName, onChange) => {
      if (dropDownActionName === "delete") {
        let newFormData = formData.slice(0);
        newFormData.splice(rowIndex, 1);
        onChange(newFormData);

        //Windows Object Global Call
        let selectedAction = null;
        if (dropDownAction !== null) {
          selectedAction = dropDownAction.find(
            availableAction => availableAction.action === dropDownActionName
          );
        }
        if (selectedAction) {
          const { windowDeleteAction = null } = selectedAction;
          if (windowDeleteAction && window[windowDeleteAction]) {
            window[windowDeleteAction](rowIndex, "delete");
          }
        } else {
          if (window && window.handleCptUpdatePopUp && schema && schema.code) {
            window.handleCptUpdatePopUp(rowIndex, "delete");
          } // to delete the code from diagnosis
        }
      } else {
        // Edit
        if (window && window.handleCptUpdatePopUp) {
          window.handleCptUpdatePopUp(rowIndex, "edit");
        }
      }
    };
  } else if (typeof action === "function") {
    return action;
  } else {
    return undefined;
  }
}

function actionColumnFrom(
  { action, icon, text, dropDownAction, actionConfiguration = false },
  schema,
  forceReRenderTable
) {
  let { filterField = false, actionCompletedIcon = "" } = actionConfiguration;
  let handleClick = actionFactory(
    action,
    actionConfiguration,
    schema,
    dropDownAction
  );
  if (!handleClick) {
    return {};
  }
  let hideDropDownAction = true;
  let selectedRow = false;
  let prevSelectedRow = "";

  const handleOutsideClick = e => {
    /* Forcing the table to render again using forceUpdate for closing actions when clicking outside */
    if (e.target.parentElement.id !== "dropDownAction") {
      forceReRenderTable();
      setTimeout(function() {
        document.removeEventListener("click", handleOutsideClick, false);
      }, 500);
    } else if (
      e.target.parentElement.id === "dropDownAction" &&
      prevSelectedRow === selectedRow
    ) {
      forceReRenderTable();
      setTimeout(function() {
        document.removeEventListener("click", handleOutsideClick, false);
      }, 500);
    }

    prevSelectedRow = selectedRow;
  };

  const handleDropDownActionClick = (
    rowIndex,
    formData,
    onChange,
    dropDownAction
  ) => {
    selectedRow = rowIndex;
    prevSelectedRow = prevSelectedRow === "" ? rowIndex : prevSelectedRow;
    document.addEventListener("click", handleOutsideClick, false);

    const handleDropDownAction = actionFactory(
      action,
      actionConfiguration,
      schema,
      dropDownAction
    );
    hideDropDownAction = dropDownActionComponent(
      rowIndex,
      formData,
      handleDropDownAction,
      dropDownAction,
      onChange
    );
  };

  return {
    dataField: icon,
    dataFormat: (cell, row, enumObject, rowIndex, formData, onChange) => (
      <span
        id="dropDownAction"
        onClick={() =>
          action !== "dropDownAction"
            ? handleClick(cell, row, enumObject, rowIndex, formData, onChange)
            : handleDropDownActionClick(
                rowIndex,
                formData,
                onChange,
                dropDownAction
              )}
      >
        {action !== "dropDownAction" ? (
          <i
            className={
              row[filterField] || row[filterField] === undefined
                ? icon
                : actionCompletedIcon
            }
          />
        ) : (
          <img src="/ehrv8/EncounterV2Template/images/3-dots.png" />
        )}
        {text}
        {rowIndex === selectedRow && hideDropDownAction}
      </span>
    ),
    editable: false
  };
}

const dropDownActionComponent = (
  rowIndex,
  formData,
  handleActionClick,
  actionList = [],
  onChange
) => {
  let dropDownActionList = actionList.map(action => {
    return (
      <li
        key={action.action}
        onClick={() =>
          handleActionClick(
            rowIndex,
            formData,
            action.displayName.toLowerCase(),
            onChange
          )}
      >
        <img
          src={
            action.action === "edit"
              ? "/ehrv8/EncounterV2Template/images/edit.png"
              : "/ehrv8/EncounterV2Template/images/delete_blue.png"
          }
        />
        <span>{action.displayName}</span>
      </li>
    );
  });

  return (
    <div>
      <div className="inherit-dropdown">
        <ul className="inherit-dropdown-list">{dropDownActionList}</ul>
      </div>
    </div>
  );
};

const actionToCol = (
  formData,
  onChange,
  schema,
  forceReRenderTable
) => actionConf => {
  let genericConf = actionColumnFrom(actionConf, schema, forceReRenderTable);
  let realDataFormat = actionConf.dataFormat
    ? actionConf.dataFormat
    : genericConf.dataFormat;
  return Object.assign({}, actionConf, genericConf, {
    dataFormat: (cell, row, enumObject, rowIndex) =>
      realDataFormat(cell, row, enumObject, rowIndex, formData, onChange)
  });
};

export default function actionHeadersFrom(
  schema,
  uiSchema,
  formData,
  onChange,
  forceReRenderTable
) {
  let { table: { rightActions = [], leftActions = [] } = {} } = uiSchema;
  let { items: { properties = [] } } = schema;

  let rightColumns = rightActions.map(
    actionToCol(formData, onChange, properties, forceReRenderTable)
  );
  let leftColumns = leftActions.map(
    actionToCol(formData, onChange, properties, forceReRenderTable)
  );
  return { rightColumns, leftColumns };
}
