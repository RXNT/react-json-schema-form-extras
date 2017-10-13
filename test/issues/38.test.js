import React from "react";
import Form from "react-jsonschema-form";
import fields from "../../src";
import renderer from "react-test-renderer";

const schema = {
  required: [],
  type: "object",
  properties: {
    medications: {
      type: "array",
      title: "Medications",
      items: {
        required: [],
        type: "object",
        properties: {
          useGeneric: {
            default: true,
            type: "boolean",
            title: "Use Generic",
          },
          quantity: {
            type: "string",
            title: "Quantity",
          },
          drug: {
            type: "object",
            properties: {
              drugId: {
                type: "string",
              },
              drugName: {
                type: "string",
                title: "Drug Name",
              },
            },
          },
          dosage: {
            type: "string",
            title: "Dosage",
          },
          startDate: {
            type: "date",
            title: "Start Date",
          },
          refills: {
            type: "string",
            title: "Refills",
          },
          unit: {
            type: "string",
            title: "Units",
          },
        },
      },
    },
  },
};

const uiSchema = {
  medications: {
    classNames: "col-md-12",
    "ui:field": "table",
    arrayField: "table",
    table: {
      tableCols: [
        {
          dataField: "drug",
          dataFormat: "drugName",
        },
        {
          dataField: "dosage",
        },
        {
          dataField: "quantity",
        },
        {
          dataField: "unit",
        },
        {
          dataField: "refills",
        },
        {
          dataField: "useGeneric",
        },
        {
          dataField: "startDate",
        },
      ],
    },
  },
};

const formData = {
  medications: [
    {
      useGeneric: true,
      drugName: "AmLactin Distribution Pack (pramoxine) 1 %-12 % topical kit",
      drugId: 471154,
    },
  ],
};

test.skip("table order", () => {
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
