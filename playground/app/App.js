import React from "react";
import applyExtras from "../../src/index";
import Form from "react-jsonschema-form";
import AllergyTypeaheadWidget from '../../src/components/allergyTypeaheadWidget';

const AllergyTypeaheadInstance = (props) => {
  return (
    <AllergyTypeaheadWidget
      {...props}
      token="passTemporarySecurityTokenHere"
      />
  );
};

const widgets = {
  lookaheadWidget: AllergyTypeaheadInstance
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
