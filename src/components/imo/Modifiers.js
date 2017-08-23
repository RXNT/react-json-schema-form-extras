import React from "react";
import Form from "react-jsonschema-form";

export const ANY_CODE = "any";

const toProperties = modifiers => {
  let properties = modifiers.reduce((properties, { name, options }) => {
    let enums = options.map(({ code }) => code);
    let enumNames = options.map(({ title }) => title);
    properties[name] = {
      type: "string",
      enum: enums,
      enumNames,
    };
    return properties;
  }, {});
  return withDefaults(properties);
};

const withDefaults = properties => {
  Object.keys(properties).forEach(field => {
    let conf = properties[field];
    conf.enum.unshift(ANY_CODE);
    conf.enumNames.unshift(ANY_CODE);
    conf.default = ANY_CODE;
  });
  return properties;
};

const toUiSchema = properties => {
  return Object.keys(properties).reduce((uiSchema, field) => {
    uiSchema[field] = {
      classNames: "col-md-3",
      "ui:widget": "radio",
    };
    return uiSchema;
  }, {});
};

const Modifiers = ({ modifiers, activeModifiers, onChange }) => {
  let schema = {
    type: "object",
    properties: toProperties(modifiers),
  };
  let uiSchema = toUiSchema(schema.properties);

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={activeModifiers}
      onChange={({ formData }) => onChange(formData)}>
      <div />
    </Form>
  );
};

export default Modifiers;
