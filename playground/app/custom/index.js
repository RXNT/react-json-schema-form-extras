import React from "react";

let schema = {
  type: "object",
  properties: {
    label: { type: "string" },
  },
};

let uiSchema = {
  label: {
    "ui:options": {
      label: false,
    },
    "ui:widget": props => {
      return <div>Rendering Custom Text</div>;
    },
  },
};

export default { schema, uiSchema };
