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
      uiSchema: {
        asyncTypeahead: { url, optionsPath, search = defaultSearch },
      },
    } = this.props;

    search(url, query)
      .then(json => (optionsPath ? selectn(optionsPath, json) : json))
      .then(options => this.setState({ options }));
  };

  handleSelectionChange = events => {
    if (events.length > 0) {
      let {
        schema,
        uiSchema: { asyncTypeahead: { mapping, cleanAfterSelection = true } },
        onChange,
      } = this.props;
      let schemaEvents = mapSchema(events, schema, mapping);
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
    let { uiSchema: { asyncTypeahead } } = this.props;

    let typeConf = Object.assign({}, DEFAULT_OPTIONS, asyncTypeahead);
    typeConf.onChange = this.handleSelectionChange;
    typeConf.onSearch = this.handleSearch;
    typeConf.options = this.state.options;
    typeConf.ref = "typeahead";
    typeConf.labelKey = mapLabelKey(asyncTypeahead.labelKey);

    return <AsyncTypeahead {...typeConf} />;
  }
}

AsyncTypeaheadField.propTypes = {
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.shape({
    asyncTypeahead: PropTypes.shape({
      url: PropTypes.string.required,
      optionsPath: PropTypes.string,
      mapping: PropTypes.object,
      cleanAfterSelection: PropTypes.bool,
      search: PropTypes.func,
    }).isRequired,
  }),
};

export default AsyncTypeaheadField;
