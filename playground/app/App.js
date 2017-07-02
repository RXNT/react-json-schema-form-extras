import React from "react";
import applyExtras from "../../src/index";
import Form from "react-jsonschema-form";
import AsyncTypeaheadWidget from '../../src/components/AsyncTypeaheadWidget';

//const staticOptions = [{"id":1,AllergyName:"One"},{"id":2,AllergyName:"Two"},{"id":3,AllergyName:"Three"},{"id":4,AllergyName:"Four"}]

/*const LookaheadWidget = (props) => {
  return (
    <Typeahead
      labelKey="AllergyName"
      options={staticOptions}
    />
  );
};*/

const widgets = {
  lookaheadWidget: AsyncTypeaheadWidget
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
