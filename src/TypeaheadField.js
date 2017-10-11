import React, { Component } from "react";
import PropTypes from "prop-types";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";
import { isArraySchema, isObjectSchema, toArray } from "./utils";
import selectn from "selectn";

const DEFAULT_OPTIONS = {
  required: false,
  labelKey: "name",
  minLength: 3,
  placeholder: "Search...",
  ref: "typeahead",
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

function defaultValue({ properties = {} }) {
  let defVal = Object.keys(properties).reduce((agg, field) => {
    if (properties[field].default !== undefined) {
      agg[field] = properties[field].default;
    }
    return agg;
  }, {});
  return defVal;
}

export function mapSchema(events, schema, mapping, labelFunc) {
  if (!mapping) {
    if (!isObjectSchema(schema) && labelFunc) {
      events = events.map(labelFunc);
    }
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
  handleSelectionChange = conf => events => {
    if (events.length > 0) {
      let { mapping, cleanAfterSelection = false, labelKey } = conf;
      let { schema } = this.props;
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

    let labelKey = mapLabelKey(typeahead.labelKey);
    let selected = (formData ? toArray(formData) : []).map(selected =>
      labelKey(selected)
    );

    let typeConf = Object.assign({}, DEFAULT_OPTIONS, typeahead, {
      onChange: this.handleSelectionChange(typeahead),
      labelKey,
      selected,
    });

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

    let labelKey = mapLabelKey(asyncTypeahead.labelKey);
    let selected = (formData ? toArray(formData) : []).map(selected =>
      labelKey(selected)
    );

    let typeConf = Object.assign(DEFAULT_OPTIONS, asyncTypeahead, {
      selected,
      labelKey,
      onChange: this.handleSelectionChange(asyncTypeahead),
      onSearch: this.handleSearch,
      options: this.state.options,
      ref: "typeahead",
    });

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
