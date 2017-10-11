import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead";
import { isArraySchema, toArray } from "./utils";
import selectn from "selectn";

const DEFAULT_OPTIONS = {
  required: false,
  labelKey: "name",
  minLength: 3,
  placeholder: "Search...",
};

function optionToString(fields, separator) {
  return option => {
    return fields
      .map(field => selectn(field, option))
      .filter(fieldVal => fieldVal)
      .reduce((agg, fieldVal, i) => {
        if (i === 0) {
          return fieldVal;
        } else {
          return `${agg}${separator}${fieldVal}`;
        }
      }, "");
  };
}

function mapLabelKey(labelKey) {
  if (Array.isArray(labelKey)) {
    return optionToString(labelKey, " ");
  } else if (
    typeof labelKey === "object" &&
    labelKey.fields &&
    labelKey.separator
  ) {
    let { fields, separator } = labelKey;
    return optionToString(fields, separator);
  } else if (labelKey) {
    return obj => obj[labelKey];
  } else {
    return obj => obj;
  }
}

function defaultValue({ properties }) {
  let defVal = Object.keys(properties).reduce((agg, field) => {
    if (properties[field].default !== undefined) {
      agg[field] = properties[field].default;
    }
    return agg;
  }, {});
  return defVal;
}

function mapSchema(events, schema, mapping, labelFunc) {
  if (!mapping) {
    return isArraySchema(events) ? events : events[0];
  }

  let defVal = defaultValue(schema.properties ? schema : schema.items);
  let mappedEvents = events.map(event => {
    let schemaEvent = Object.keys(mapping).reduce((agg, field) => {
      let eventField = mapping[field];
      agg[field] = selectn(eventField, event);
      return agg;
    }, Object.assign({}, defVal));
    return schemaEvent;
  });

  return isArraySchema(schema) ? mappedEvents : mappedEvents[0];
}

class BaseTypeaheadField extends Component {
  handleSelectionChange = events => {
    if (events.length > 0) {
      let {
        schema,
        uiSchema: {
          typeahead: { mapping, cleanAfterSelection = false, labelKey },
        },
      } = this.props;
      let schemaEvents = mapSchema(
        events,
        schema,
        mapping,
        mapLabelKey(labelKey)
      );
      this.props.onChange(schemaEvents);
      if (cleanAfterSelection) {
        setTimeout(() => {
          if (this.refs.typeahead) {
            this.refs.typeahead.getInstance().clear();
          }
        }, 0);
      }
    }
  };
}

export class TypeaheadField extends BaseTypeaheadField {
  render() {
    let { uiSchema: { typeahead }, formData } = this.props;

    let typeConf = Object.assign({}, DEFAULT_OPTIONS, typeahead);
    typeConf.onChange = this.handleSelectionChange;
    typeConf.labelKey = mapLabelKey(typeahead.labelKey);
    typeConf.selected = formData ? toArray(formData) : [];
    typeConf.ref = "typeahead";

    return <Typeahead {...typeConf} />;
  }
}

TypeaheadField.propTypes = {
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.shape({
    typeahead: PropTypes.shape({
      options: PropTypes.array.isRequired,
      mapping: PropTypes.object,
      cleanAfterSelection: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};

export class AsyncTypeaheadField extends BaseTypeaheadField {
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
        asyncTypeahead: {
          url,
          optionsPath,
          search = (url, query) =>
            fetch(`url?query=${query}`).then(res => res.json()),
        },
      },
    } = this.props;

    search(url, query)
      .then(json => (optionsPath ? selectn(optionsPath, json) : json))
      .then(options => this.setState({ options }));
  };

  render() {
    let { uiSchema: { asyncTypeahead }, formData } = this.props;

    let typeConf = Object.assign({}, DEFAULT_OPTIONS, asyncTypeahead);
    typeConf.onChange = this.handleSelectionChange;
    typeConf.onSearch = this.handleSearch;
    typeConf.options = this.state.options;
    typeConf.ref = "typeahead";
    typeConf.selected = formData ? toArray(formData) : [];
    typeConf.labelKey = mapLabelKey(asyncTypeahead.labelKey);

    return <AsyncTypeahead {...typeConf} />;
  }
}

AsyncTypeaheadField.propTypes = {
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.shape({
    asyncTypeahead: PropTypes.shape({
      url: PropTypes.string.isRequired,
      optionsPath: PropTypes.string,
      mapping: PropTypes.object,
      cleanAfterSelection: PropTypes.bool,
      search: PropTypes.func,
    }).isRequired,
  }),
};
