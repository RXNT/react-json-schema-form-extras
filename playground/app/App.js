import React from "react";
import applyExtras from "../../src/index";
import Form from "react-jsonschema-form";
import AllergyTypeaheadWidget from '../../src/components/allergyTypeaheadWidget';
import MedicationTypeaheadWidget from '../../src/components/medicationTypeaheadWidget';

const AllergyTypeaheadInstance = (props) => {

  let rxntProps = {
    doctorGroupId: 4,
    doctorCompanyId: 2824,
    token: "OMITTED",
    requestInfoHeader: "OMITTED"
  }

  return (
    <AllergyTypeaheadWidget
      {...props}
      rxntProps={rxntProps}
      />
  );
};

const MedicationTypeaheadInstance = (props) => {

  let rxntProps = {
    doctorGroupId: 4,
    doctorCompanyId: 2824,
    token: "OMITTED",
    requestInfoHeader: "OMITTED"
  }

  return (
    <MedicationTypeaheadWidget
      {...props}
      rxntProps={rxntProps}
      />
  );
};

const widgets = {
  allergyWidget: AllergyTypeaheadInstance,
  medicationWidget: MedicationTypeaheadInstance
};

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
