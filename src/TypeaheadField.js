import React, { Component } from "react";
import PropTypes from "prop-types";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";
import { isArraySchema, isObjectSchema, toArray } from "./utils";
import selectn from "selectn";
import { DefaultLabel } from "./Label";

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
  }
  return labelKey;
}

function applyLabelKey(obj, labelKey) {
  if (typeof labelKey === "function") {
    return labelKey(obj);
  } else if (typeof labelKey === "string") {
    return obj[labelKey];
  } else {
    return obj;
  }
}

function defaultValue(properties) {
  let defVal = Object.keys(properties).reduce((agg, field) => {
    if (properties[field].default !== undefined) {
      agg[field] = properties[field].default;
    }
    return agg;
  }, {});
  return defVal;
}

function mapToObject(event, mapping, defVal) {
  let schemaEvent = Object.keys(mapping).reduce((agg, field) => {
    let eventField = mapping[field];
    if (typeof eventField === "object") {
      agg[field] = mapToObject(event, eventField, {});
    } else {
      agg[field] = selectn(eventField, event);
    }
    return agg;
  }, Object.assign({}, defVal));
  return schemaEvent;
}

function mapEvents(events, { type, properties, items }, mapping) {
  if (!mapping || mapping === null) {
    if (type === "string") {
      return events.map(item => (typeof item === "object" ? item.label : item));
    }
    return events;
  } else if (typeof mapping === "string") {
    return events.map(event => selectn(mapping, event));
  } else if (typeof mapping === "function") {
    return events.map(event => mapping(event));
  } else if (typeof mapping === "object") {
    let defVal = defaultValue(
      properties
        ? properties
        : items && items.properties ? items.properties : {}
    );
    let mappedEvents = events.map(event => {
      return mapToObject(event, mapping, defVal);
    });

    return mappedEvents;
  }
}

export function mapToSchema(events, schema, mapping) {
  let schemaEvents = mapEvents(events, schema, mapping);
  return isArraySchema(schema) ? schemaEvents : schemaEvents[0];
}

function mapFromObject(data, mapping, defVal) {
  return Object.keys(mapping).reduce((agg, field) => {
    let eventField = mapping[field];
    if (typeof eventField === "object") {
      Object.assign(agg, mapFromObject(data[field], mapping, {}));
    } else {
      agg[eventField] = data[field];
    }
    return agg;
  }, defVal);
}

export function mapFromSchema(data, mapping) {
  if (!mapping || mapping === null) {
    return data;
  } else if (typeof mapping === mapping) {
    return { [mapping]: data };
  } else if (typeof mapping === "object") {
    return mapFromObject(data, mapping, {});
  } else {
    return data;
  }
}

function toSelected(formData, schema, mapping, labelKey) {
  let normFormData = formData ? toArray(formData) : [];
  if (isObjectSchema(schema)) {
    return normFormData.map(selected =>
      applyLabelKey(mapFromSchema(selected, mapping), labelKey)
    );
  }
  return normFormData;
}

class BaseTypeaheadField extends Component {
  handleSelectionChange = conf => events => {
    if (events.length > 0) {
      let { mapping, cleanAfterSelection = false } = conf;
      let { schema } = this.props;
      let schemaEvents = mapToSchema(events, schema, mapping);
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

  componentDidMount() {
    let { uiSchema: { focusOnMount = false } } = this.props;
    if (focusOnMount) {
      this.refs.typeahead.getInstance().focus();
    }
  }
}

export class TypeaheadField extends BaseTypeaheadField {
  render() {
    let {
      uiSchema: { typeahead },
      formData,
      schema,
      idSchema: { $id } = {},
    } = this.props;

    let labelKey = mapLabelKey(typeahead.labelKey);
    let selected = toSelected(formData, schema, typeahead.mapping, labelKey);

    let typeConf = Object.assign({}, DEFAULT_OPTIONS, typeahead, {
      onChange: this.handleSelectionChange(typeahead),
      labelKey,
      selected,
    });

    return (
      <div id={$id}>
        <DefaultLabel {...this.props} />
        <Typeahead {...typeConf} />
      </div>
    );
  }
}

TypeaheadField.propTypes = {
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.shape({
    focusOnMount: PropTypes.bool,
    typeahead: PropTypes.shape({
      options: PropTypes.array.isRequired,
      mapping: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.object,
      ]),
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
            fetch(`${url}?query=${query}`).then(res => res.json()),
        },
      },
    } = this.props;

    search(url, query)
      .then(json => (optionsPath ? selectn(optionsPath, json) : json))
      .then(options => this.setState({ options }));
  };

  render() {
    let {
      schema,
      uiSchema: { asyncTypeahead },
      formData,
      idSchema: { $id } = {},
    } = this.props;

    let labelKey = mapLabelKey(asyncTypeahead.labelKey);
    let selected = toSelected(
      formData,
      schema,
      asyncTypeahead.mapping,
      labelKey
    );

    let typeConf = Object.assign({}, DEFAULT_OPTIONS, asyncTypeahead, {
      selected,
      labelKey,
      onChange: this.handleSelectionChange(asyncTypeahead),
      onSearch: this.handleSearch,
      options: this.state.options,
    });

    if (this.props.overrideOptions) {
      typeConf.onInputChange = this.props.onChange;
    }

    return (
      <div id={$id}>
        <DefaultLabel {...this.props} />
        <AsyncTypeahead {...typeConf} />
      </div>
    );
  }
}

AsyncTypeaheadField.propTypes = {
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.shape({
    focusOnMount: PropTypes.bool,
    asyncTypeahead: PropTypes.shape({
      url: PropTypes.string.isRequired,
      optionsPath: PropTypes.string,
      mapping: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.object,
      ]),
      cleanAfterSelection: PropTypes.bool,
      overrideOptions: PropTypes.bool,
      search: PropTypes.func,
    }).isRequired,
  }),
};
