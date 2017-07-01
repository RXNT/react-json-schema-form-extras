import React from "react";
import applyExtras from "../../src/index";
import Form from "react-jsonschema-form";
import {Typeahead} from 'react-bootstrap-typeahead';

const staticOptions = [
  {id: 1, label: 'John'},
  {id: 2, label: 'Miles'},
  {id: 3, label: 'Charles'},
  {id: 4, label: 'Herbie'},
];

const LookaheadWidget = (props) => {
  return (
    <Typeahead
      options={staticOptions}
      placeholder="Choose an option.."
      value={props.value}
      required={props.required}
    />
  );
};

const widgets = {
  lookaheadWidget: LookaheadWidget
};

const schema = {
  title: "A registration form",
  type: "object",
  required: ["firstName"],
  properties: {
    firstName: {
      type: "string",
      title: "First name",
    }
  },
};

const uiSchema = {
  firstName: {
    classNames: "col-md-4 col-xs-4 success",
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:tabID": "0",
    "ui:widget": "lookaheadWidget"
  }
};

const formData = {
  firstName: ""
};

let FormWithExtras = applyExtras(Form);

export function App() {
  return (
    <FormWithExtras
      liveValidate={false}
      safeRenderCompletion={true}
      noHtml5Validate={true}
      formData={formData}
      schema={schema}
      uiSchema={uiSchema}
      widgets={widgets}
    />
  );
}
