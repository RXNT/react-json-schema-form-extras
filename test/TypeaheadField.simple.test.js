import React from "react";
import Form from "react-jsonschema-form";
import fields from "../src";
import renderer from "react-test-renderer";

let formData = {
  str: "some",
  strArr: ["some"],
  obj: { name: "other" },
  objArr: [{ name: "other" }],
};

let schema = {
  type: "object",
  properties: {
    str: {
      type: "string",
    },
    strArr: {
      type: "array",
      items: {
        type: "string",
      },
    },
    obj: {
      type: "object",
      properties: {
        name: { type: "string" },
      },
    },
    objArr: {
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

let fieldProps = {
  classNames: "col-md-12",
  "ui:field": "typeahead",
  typeahead: {
    options: [{ name: "some" }, { name: "other" }],
    labelKey: "name",
    minLength: 1,
  },
};

let uiSchema = {
  uiSchema: {
    str: fieldProps,
    strArr: fieldProps,
    obj: fieldProps,
    objArr: fieldProps,
  },
};

test("Typeahead render", () => {
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
