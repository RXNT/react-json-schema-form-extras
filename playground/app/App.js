import React from "react";
import applyExtras from "../../src/index";
import Form from "react-jsonschema-form";

import codes from "./codes";
import typeahead from "./typeahead";
import medications from "./medications";
import imo from "./imo";
import dx from "./dx";
import allergies from "./allergies";
import functionalStatus from "./functionalStatus";

//date example temporarily removed from tableCols: , {field: "dateEx", displayName: "Col 4", customFieldType: "date"}

let FormWithExtras = applyExtras(Form);

export function App() {
  let handleChange = ({ formData }) => console.log(JSON.stringify(formData));
  return (
    <div>
      <FormWithExtras {...codes} onChange={handleChange} />
      <FormWithExtras {...typeahead} onChange={handleChange} />
      <FormWithExtras {...dx} onChange={handleChange} />
      <FormWithExtras {...functionalStatus} onChange={handleChange} />
      <FormWithExtras {...imo} onChange={handleChange} />
      <FormWithExtras {...allergies} onChange={handleChange} />
      <FormWithExtras {...medications} onChange={handleChange} />
    </div>
  );
}
