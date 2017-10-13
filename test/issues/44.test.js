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
          drugId: {
            type: "string",
          },
          drugName: {
            type: "string",
            title: "Drug Name",
          },
          dosage: {
            type: "string",
            title: "Dosage",
          },
          quantity: {
            type: "string",
            title: "Quantity",
          },
          unit: {
            type: "string",
            title: "Units",
          },
          refills: {
            type: "string",
            title: "Refills",
          },
          useGeneric: {
            default: true,
            type: "boolean",
            title: "Use Generic",
          },
          startDate: {
            type: "date",
            title: "Start Date",
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
    table: {
      selectRow: {
        clickToExpand: true,
      },
      tableCols: [
        {
          dataField: "drugId",
          hidden: true,
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

test.skip("table medications", () => {
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
