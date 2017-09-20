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
      let { uiSchema: { typeaheadConf: { mapping } } } = this.props;
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
    let { uiSchema: { typeaheadConf } } = this.props;

    let typeConf = Object.assign({}, DEFAULT_OPTIONS, typeaheadConf);
    typeConf.onChange = this.handleSelectionChange;
    typeConf.labelKey = mapLabelKey(typeaheadConf.labelKey);
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
