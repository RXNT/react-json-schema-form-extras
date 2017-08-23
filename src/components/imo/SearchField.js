import React from "react";
import Form from "react-jsonschema-form";

const SEARCH_SCHEMA = {
  type: "string",
};

const SearchField = ({ onSearch }) => {
  return (
    <Form schema={SEARCH_SCHEMA} onSubmit={onSearch}>
      <div />
    </Form>
  );
};

export default SearchField;
