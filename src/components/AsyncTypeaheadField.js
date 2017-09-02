import React, { Component } from "react";
import PropTypes from "prop-types";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { search } from "./AsyncTypeaheadAPI";
import { isDevelopment, mapSchema } from "../utils";

const DEFAULT_OPTIONS = {
  required: false,
  labelKey: "name",
  minLength: 3,
  placeholder: "Search...",
};

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

    let { uiSchema: { typeahead: { url, optionsMapping } } } = this.props;

    search(url, query, optionsMapping).then(options =>
      this.setState({ options })
    );
  };

  handleSelectionChange = events => {
    if (events.length > 0) {
      let schemaEvents = mapSchema(
        events,
        this.props.schema,
        this.props.uiSchema.typeahead.responseSchemaMapping
      );
      this.props.onChange(schemaEvents);
      setTimeout(() => this.refs.typeahead.getInstance().clear(), 0);
    }
  };

  render() {
    let { uiSchema: { typeahead } } = this.props;

    let typeConf = Object.assign({}, DEFAULT_OPTIONS, typeahead);
    typeConf.onChange = this.handleSelectionChange;
    typeConf.onSearch = this.handleSearch;
    typeConf.options = this.state.options;
    typeConf.ref = "typeahead";

    return <AsyncTypeahead {...typeConf} />;
  }
}

if (isDevelopment()) {
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
}

export default AsyncTypeaheadField;
