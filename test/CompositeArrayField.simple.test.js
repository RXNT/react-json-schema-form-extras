import "./rAF";
import React from "react";
import Form from "react-jsonschema-form";
import fields from "../src";
import renderer from "react-test-renderer";

let formData = {
  compArr: [{ name: "other" }],
};

let schema = {
  type: "object",
  properties: {
    compArr: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      },
    },
  },
};

let uiSchema = {
  compArr: {
    "ui:field": "compositeArray",
    inputField: "typeahead",
    arrayField: "table",
    typeahead: {
      options: [{ name: "some" }, { name: "other" }],
      labelKey: "name",
      minLength: 1,
    },
  },
};

test.skip("CompositeArray render", () => {
  const component = renderer.create(
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      fields={fields}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
