import React from "react";
import applyExtras from "../../src/index";
import Form from "react-jsonschema-form";

import medications from "./medications";
import imo from "./imo";
import allergies from "./allergies";
import functionalStatus from "./functionalStatus";

//date example temporarily removed from tableCols: , {field: "dateEx", displayName: "Col 4", customFieldType: "date"}

let FormWithExtras = applyExtras(Form);

export function App() {
  return (
    <div>
      <div className="col-md-12">
        <FormWithExtras
          {...functionalStatus}
          onChange={({ formData }) => console.log(JSON.stringify(formData))}
        />
      </div>
      <div className="col-md-12">
        <FormWithExtras
          {...imo}
          onChange={({ formData }) => console.log(JSON.stringify(formData))}
        />
      </div>
      <div className="col-md-12">
        <FormWithExtras
          {...allergies}
          onChange={({ formData }) => console.log(JSON.stringify(formData))}
        />
      </div>
      <div className="col-md-12">
        <FormWithExtras
          {...medications}
          onChange={({ formData }) => console.log(JSON.stringify(formData))}
        />
      </div>
    </div>
  );
}
