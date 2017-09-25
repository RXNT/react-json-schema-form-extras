import React from "react";

function altInputField(props) {
  let {
    uiSchema: { defInput, altInput, altInputSeparator = "" },
    registry: { fields },
  } = props;

  let DefInput = fields[defInput];
  let AltInput = fields[altInput];

  let noBorder = {
    border: "0",
    boxShadow: "none",
  };
  return (
    <div className="row">
      <div className="col-md-5">
        <DefInput {...props} />
      </div>
      <div className="col-md-2 text-center">
        <div className="form-control" style={noBorder}>
          {altInputSeparator}
        </div>
      </div>
      <div className="col-md-5">
        <AltInput {...props} />
      </div>
    </div>
  );
}

export default altInputField;
