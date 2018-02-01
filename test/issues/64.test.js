import React from "react";
import Form from "react-jsonschema-form";
import fields from "../../src";
import renderer from "react-test-renderer";

beforeAll(() => {
  global.requestAnimationFrame = callback => {
    setTimeout(callback, 0);
  };
});

afterAll(() => {
  delete global.requestAnimationFrame;
});

const schema = {
  type: "object",
  required: ["student"],
  properties: {
    student: {
      title: "Students First/Last Name",
    },
  },
};

const uiSchema = {
  student: {
    "ui:field": "typeahead",
    typeahead: {
      placeholder: "Search Students...",
      options: [{ id: "A", label: "Alex" }, { id: "B", label: "Bart" }],
      minLength: 2,
    },
  },
};

test("label rendered for typeahead", () => {
  const component = renderer.create(
    <Form schema={schema} uiSchema={uiSchema} fields={fields} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
