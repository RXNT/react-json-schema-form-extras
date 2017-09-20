import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typeahead } from "react-bootstrap-typeahead";
import { isDevelopment, mapLabelKey } from "./utils";

const DEFAULT_OPTIONS = {
  required: false,
  labelKey: "name",
  minLength: 3,
  placeholder: "Search...",
};

class TypeaheadField extends Component {
  handleSelectionChange = events => {
    if (events.length > 0) {
      let { uiSchema: { typeaheadOptions: { mapping } } } = this.props;
      let schemaEvents = mapping
        ? events.map(val => {
            return { [mapping]: val };
          })
        : events;
      this.props.onChange(schemaEvents);
      setTimeout(() => {
        if (this.refs.typeahead) {
          this.refs.typeahead.getInstance().clear();
        }
      }, 0);
    }
  };

  render() {
    let { uiSchema: { typeaheadOptions } } = this.props;

    let typeConf = Object.assign({}, DEFAULT_OPTIONS, typeaheadOptions);
    typeConf.onChange = this.handleSelectionChange;
    typeConf.labelKey = mapLabelKey(typeaheadOptions.labelKey);
    typeConf.ref = "typeahead";

    return <Typeahead {...typeConf} />;
  }
}

if (isDevelopment()) {
  TypeaheadField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.shape({
      genTypeahead: PropTypes.shape({
        options: PropTypes.array.required,
      }),
    }),
  };
}

export default TypeaheadField;
