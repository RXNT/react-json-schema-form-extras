import React from "react";
import DefaultDescriptionField from "react-jsonschema-form/lib/components/fields/DescriptionField";
import {
  isMultiSelect,
  getUiOptions,
  isFilesArray,
} from "react-jsonschema-form/lib/utils";

const REQUIRED_FIELD_SYMBOL = "*";

function Label(props) {
  const { label, required, id } = props;
  if (!label) {
    // See #312: Ensure compatibility with old versions of React.
    return <div />;
  }
  return (
    <label key={0} className="control-label" htmlFor={id}>
      {label}
      {required && <span className="required">{REQUIRED_FIELD_SYMBOL}</span>}
    </label>
  );
}

export function DefaultLabel({
  schema,
  uiSchema,
  definitions,
  required,
  id,
  name,
  fields = {},
  formContext,
}) {
  const uiOptions = getUiOptions(uiSchema);
  let { label: displayLabel = true, forceLabelDisplay } = uiOptions;
  if (schema.type === "array") {
    displayLabel =
      isMultiSelect(schema, definitions) ||
      isFilesArray(schema, uiSchema, definitions);
  }
  if (schema.type === "object") {
    displayLabel = false;
  }
  if (schema.type === "boolean" && !uiSchema["ui:widget"]) {
    displayLabel = false;
  }

  const label = uiSchema["ui:title"] || schema.title || name;
  const description = uiSchema["ui:description"] || schema.description;

  const { DescriptionField = DefaultDescriptionField } = fields;

  if (displayLabel || forceLabelDisplay) {
    return [
      <Label key={0} label={label} required={required} id={id} />,
      description ? (
        <DescriptionField
          key={1}
          id={id + "__description"}
          description={description}
          formContext={formContext}
        />
      ) : (
        undefined
      ),
    ];
  }

  return null;
}
