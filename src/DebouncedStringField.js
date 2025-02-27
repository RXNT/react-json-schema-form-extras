import React from "react";
import StringField from "react-jsonschema-form/lib/components/fields/StringField";
import { useDebounce } from "use-debounce";

const DEBOUNCE_DELAY = 500;
const MAX_DEBOUNCE_WAIT = 1000;

export function DebouncedStringField(props) {
  const { formData, onChange } = props;
  const [value, setValue] = React.useState(formData);
  const [debouncedValue] = useDebounce(value, DEBOUNCE_DELAY, {
    maxWait: MAX_DEBOUNCE_WAIT
  });

  React.useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  React.useEffect(() => {
    setValue(formData);
  }, [formData]);

  const handleOnChange = value => {
    setValue(value);
  };

  return <StringField {...props} onChange={handleOnChange} formData={value} />;
}
