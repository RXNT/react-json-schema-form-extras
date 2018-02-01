import React from "react";

import fields from "../../src/index";
import Form from "react-jsonschema-form";

import typeahead from "./order";
import medications from "./medications";
import typeaheadNonExpandable from "./typeaheadNonExpandable";
import rte from "./rte";
import datePicker from "./react-date-picker";
import rte2 from "./rte2";
import dx from "./dx";
import label from "./labels";
import simpleTable from "./simpleTable";
import ros from "./ros";

const ALL_CONFS = [
  label,
  datePicker,
  simpleTable,
  rte2,
  typeaheadNonExpandable,
  medications,
  typeahead,
  rte(),
  dx,
  ros,
];

export default function App() {
  let handleChange = ({ formData }) => console.log(JSON.stringify(formData));
  let formContext = {
    legends: {
      LanguageLegend: props => <h1>Expected {props.language} characters</h1>,
    },
    allActions: {
      Button: props => (
        <a className="btn btn-info pull-right">Update allergies</a>
      ),
    },
  };

  return (
    <div>
      {ALL_CONFS.map((conf, i) => (
        <Form
          key={i}
          {...conf}
          fields={fields}
          onChange={handleChange}
          formContext={formContext}
        />
      ))}
    </div>
  );
}
