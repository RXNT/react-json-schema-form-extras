import React from "react";
import Form from "react-jsonschema-form";
import fields from "../../src";
import renderer from "react-test-renderer";

const formData = {
  orders: [
    { order: "sdw" },
    { order: "Metabolic Panel" },
    { order: "CAT, Head with contrast" },
  ],
};

const schema = {
  type: "object",
  properties: {
    orders: {
      type: "array",
      title: "Orders",
      items: {
        type: "object",
        properties: {
          order: {
            type: "string",
            title: "Order",
          },
        },
      },
    },
  },
};

const uiSchema = {
  "ui:order": ["orders"],
  orders: {
    classNames: "col-md-12",
    "ui:field": "collapsible",
    collapse: {
      field: "table",
      collapsed: false,
      icon: {
        add: "glyphicon glyphicon-plus-sign glyPhiconGreen",
      },
      addTo: "self",
    },
    table: {
      leftActions: [
        {
          action: "delete",
          className: "col-md-1",
          columnClassName: "col-md-1",
          editColumnClassName: "col-md-1",
          icon: "glyphicon glyphicon-minus",
        },
      ],
      rightActions: [
        {
          action: "delete",
          className: "col-md-1",
          columnClassName: "col-md-1",
          editColumnClassName: "col-md-1",
          icon: "glyphicon glyphicon-minus",
        },
      ],
    },
  },
};

test.skip("left and right panels", () => {
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
