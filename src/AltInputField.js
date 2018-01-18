import React from "react";
import PropTypes from "prop-types";

function altInputField(props) {
  let {
    uiSchema: { defInput, altInput, altInputSeparator = "" },
    registry: { fields },
    idSchema: { $id } = {},
  } = props;

  let DefInput = fields[defInput];
  let AltInput = fields[altInput];

  let noBorder = {
    border: "0",
    boxShadow: "none",
  };
  return (
    <div className="row" id={$id}>
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

altInputField.propTypes = {
  uiSchema: PropTypes.shape({
    defInput: PropTypes.string.isRequired,
    altInput: PropTypes.string.isRequired,
    altInputSeparator: PropTypes.string,
  }),
};

export default altInputField;
