import React, { Component } from "react";
import PropTypes from "prop-types";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import selectn from "selectn";
import { mapLabelKey, mapSchema } from "./utils";

const DEFAULT_OPTIONS = {
  required: false,
  labelKey: "name",
  minLength: 3,
  placeholder: "Search...",
};

const defaultSearch = (url, query) =>
  fetch(`url?query=${query}`).then(res => res.json());

class AsyncTypeaheadField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
    };
  }

  handleSearch = query => {
    if (!query) {
      return;
    }

    let {
      uiSchema: { typeahead: { url, optionsMapping, search = defaultSearch } },
    } = this.props;

    search(url, query)
      .then(json => (optionsMapping ? selectn(optionsMapping, json) : json))
      .then(options => this.setState({ options }));
  };

  handleSelectionChange = events => {
    if (events.length > 0) {
      let {
        schema,
        uiSchema: {
          typeahead: { responseSchemaMapping, cleanAfterSelection = true },
        },
        onChange,
      } = this.props;
      let schemaEvents = mapSchema(events, schema, responseSchemaMapping);
      onChange(schemaEvents);
      if (cleanAfterSelection) {
        setTimeout(() => {
          if (this.refs.typeahead) {
            this.refs.typeahead.getInstance().clear();
          }
        }, 0);
      }
    }
  };

  render() {
    let { uiSchema: { typeahead } } = this.props;

    let typeConf = Object.assign({}, DEFAULT_OPTIONS, typeahead);
    typeConf.onChange = this.handleSelectionChange;
    typeConf.onSearch = this.handleSearch;
    typeConf.options = this.state.options;
    typeConf.ref = "typeahead";
    typeConf.labelKey = mapLabelKey(typeahead.labelKey);

    return <AsyncTypeahead {...typeConf} />;
  }
}

AsyncTypeaheadField.propTypes = {
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.shape({
    typeahead: PropTypes.shape({
      url: PropTypes.string.required,
      optionsMapping: PropTypes.string,
      responseSchemaMapping: PropTypes.object,
    }),
  }),
};

export default AsyncTypeaheadField;
