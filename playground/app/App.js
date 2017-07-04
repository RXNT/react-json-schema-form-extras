import React from "react";
import applyExtras from "../../src/index";
import Form from "react-jsonschema-form";

const schema = {
  title: "A registration form",
  type: "object",
  required: ["firstName"],
  properties: {
    allergies: {
      type: "string",
      title: "Allergies",
    },
    medications: {
      type: "string",
      title: "Medications",
    }
  },
};

const uiSchema = {
  allergies: {
    classNames: "col-md-4 col-xs-4 success",
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:widget": "allergyWidget"
  },
  medications: {
    classNames: "col-md-4 col-xs-4 success",
    "ui:autofocus": false,
    "ui:emptyValue": "",
    "ui:widget": "medicationWidget"
  }
};

const formData = {
  firstName: ""
};

const rxntProps = {
  doctorGroupId: 4,
  doctorCompanyId: 2824,
  token: "OMITTED",
  requestInfoHeader: "OMITTED"
}

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
      rxntProps={rxntProps}
    />
  );
}
