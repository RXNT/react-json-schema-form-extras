import React from "react";
import fields from "../../src/index";
import Form from "react-jsonschema-form";

import typeahead from "./order";
import medications from "./medications";
import typeaheadNonExpandable from "./typeaheadNonExpandable";
import rte from "./rte";
import dx from "./dx";

export default function App() {
  let handleChange = ({ formData }) => console.log(JSON.stringify(formData));
  return (
    <div>
      <Form
        {...typeaheadNonExpandable}
        fields={fields}
        onChange={handleChange}
      />
      <Form {...medications} fields={fields} onChange={handleChange} />
      <Form {...typeahead} fields={fields} onChange={handleChange} />
      <Form {...rte()} fields={fields} onChange={handleChange} />
      <Form {...dx} fields={fields} onChange={handleChange} />
    </div>
  );
}
