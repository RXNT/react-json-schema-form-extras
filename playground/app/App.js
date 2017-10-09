import React from "react";
import fields from "../../src/index";
import Form from "react-jsonschema-form";

import goals from "./goals";
import rte from "./rte";
import codes from "./codes";
import typeahead from "./typeahead";
import medications from "./medications";
import imo from "./imo";
import dx from "./dx";
import allergies from "./allergies";
import functionalStatus from "./functionalStatus";

export function App() {
  let handleChange = ({ formData }) => console.log(JSON.stringify(formData));
  return (
    <div>
      <Form {...medications} fields={fields} onChange={handleChange} />
      <Form {...rte()} fields={fields} onChange={handleChange} />
      <Form {...goals()} fields={fields} onChange={handleChange} />
      <Form {...codes} fields={fields} onChange={handleChange} />
      <Form {...typeahead} fields={fields} onChange={handleChange} />
      <Form {...dx} fields={fields} onChange={handleChange} />
      <Form {...functionalStatus} fields={fields} onChange={handleChange} />
      <Form {...imo} fields={fields} onChange={handleChange} />
      <Form {...allergies} fields={fields} onChange={handleChange} />
    </div>
  );
}
