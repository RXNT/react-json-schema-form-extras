import React, { Component } from "react";
import PropTypes from "prop-types";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";
import {
  isArraySchema,
  isObjectSchema,
  isStringSchema,
  isNumberSchema,
  toArray,
  getDefaultValueForSchema
} from "./utils";
import selectn from "selectn";
import { DefaultLabel } from "./Label";

const DEFAULT_OPTIONS = {
  required: false,
  labelKey: "name",
  minLength: 3,
  placeholder: "Search...",
  ref: "typeahead"
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
          if (Array.isArray(separator)) {
            return `${agg}${separator[i - 1]}${fieldVal}`;
          }
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
  if (events.length === 0) {
    return [getDefaultValueForSchema({ type })];
  }
  if (!mapping || mapping === null) {
    if (type === "string") {
      return events.map(item => (typeof item === "object" ? item.label : item));
    }
    return events;
  } else if (typeof mapping === "string") {
    return events.map(
      event => (typeof event === "string" ? event : selectn(mapping, event))
    );
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
      if (data[field]) {
        agg[eventField] = data[field];
      }
    }
    return agg;
  }, defVal);
}
/**
 *
 * @param {*} data
 * @param {*} mapping
 * Mapped object is converted to the object mapping takes
 */
export function mapFromSchema(data, mapping) {
  if (isEmpty(data)) {
    return;
  }
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

function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function toSelected(formData, schema, mapping, options) {
  let normFormData = formData ? toArray(formData) : [];
  if (isObjectSchema(schema)) {
    return normFormData
      .map(selected => mapFromSchema(selected, mapping))
      .filter(x => x !== undefined);
  } else if (
    options &&
    (isStringSchema(schema) || isNumberSchema(schema)) &&
    typeof mapping === "string"
  ) {
    return normFormData
      .map(dataItem => {
        return options.find(option => {
          if (option[mapping] === dataItem) {
            return option;
          }
        });
      })
      .filter(x => x !== undefined);
  } else if (isArraySchema(schema)) {
    return normFormData
      .map(dataItem => {
        if (typeof mapping === "object") {
          return mapFromSchema(dataItem, mapping);
        }
        if (options) {
          return options.find(option => {
            if (option[mapping] === dataItem) {
              return option;
            }
          });
        } else {
          return dataItem;
        }
      })
      .filter(x => x !== undefined);
  } else {
    return normFormData;
  }
}

function isFunction(functionToCheck) {
  return functionToCheck instanceof Function;
}

/*
 this is done to prevent an edge case with a typeahead wrapped inside a table that has an item selected & uses a function as a labelKey
 TODO: Need to find a better solution for this
 */
function transformLabelKey(labelKey, schema, selected) {
  if (
    isFunction(labelKey) &&
    selected &&
    selected.length > 0 &&
    schema.type === "string" &&
    selected.every(x => typeof x === "string" || x instanceof String)
  ) {
    return "";
  } else {
    return labelKey;
  }
}

class BaseTypeaheadField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStamp: null
    };
  }
  handleSelectionChange = conf => events => {
    let { mapping, cleanAfterSelection = false } = conf;
    let { schema } = this.props;

    this.setState({
      selected: events
    });

    if (events.length > 0) {
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
    const rbtElement = document.querySelector(".rbt");
    rbtElement.addEventListener("mousedown", () => {
      this.setState({ timeStamp: new Date() });
    });
    rbtElement.addEventListener("mousemove", () => {});
    rbtElement.addEventListener("mouseup", () => {
      this.handleBlur();
    });
    if (focusOnMount) {
      this.refs.typeahead.getInstance().focus();
    }
  }

  handleBlur = () => {
    let { selected, timeStamp } = this.state;
    if (selected.length === 0) {
      this.setState({
        selected: []
      });
      if (timeStamp === null) {
        if (this.refs.typeahead) {
          this.refs.typeahead.getInstance() &&
            this.refs.typeahead.getInstance().clear();
        }
        // let onChangeValue = getDefaultValueForSchema(schema);
        // remove the field if the value is empty
        this.props.onChange(undefined);
      }
    }
  };
}

function isValidFormData(data) {
  return data && !isEmpty(data);
}

export class TypeaheadField extends BaseTypeaheadField {
  constructor(props) {
    super(props);
    let { schema, uiSchema: { typeahead }, formData } = this.props;

    this.state = {
      selected: isValidFormData(formData)
        ? toSelected(formData, schema, typeahead.mapping, typeahead.options)
        : []
    };
  }

  render() {
    let {
      uiSchema: { typeahead },
      idSchema: { $id } = {},
      schema
    } = this.props;

    let labelKey = mapLabelKey(typeahead.labelKey);
    // if something is already selected and is a string - removing the label key so that the labelKey function can be ignored.
    labelKey = transformLabelKey(labelKey, schema, this.state.selected);

    let typeConf = Object.assign({}, DEFAULT_OPTIONS, typeahead, {
      onChange: this.handleSelectionChange(typeahead),
      labelKey,
      selected: this.state.selected,
      onBlur: this.handleBlur
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
        PropTypes.object
      ]),
      cleanAfterSelection: PropTypes.bool
    }).isRequired
  }).isRequired
};

export class AsyncTypeaheadField extends BaseTypeaheadField {
  constructor(props) {
    super(props);

    let { schema, uiSchema: { asyncTypeahead }, formData } = this.props;

    this.state = {
      options: [],
      isLoading: false,
      selected: isValidFormData(formData)
        ? toSelected(formData, schema, asyncTypeahead.mapping)
        : []
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
            fetch(`${url}?query=${query}`).then(res => res.json())
        }
      }
    } = this.props;

    this.setState({ isLoading: true });

    search(url, query)
      .then(json => (optionsPath ? selectn(optionsPath, json) : json))
      .then(options => this.setState({ options: options, isLoading: false }));
  };

  handleOnFocus = () => {
    let {
      uiSchema: {
        asyncTypeahead: {
          url,
          optionsPath,
          queryOnFocus = "",
          minLength,
          search = (url, query) =>
            fetch(`${url}?query=${query}`).then(res => res.json())
        }
      }
    } = this.props;

    if (minLength === 0) {
      this.setState({ isLoading: true });
      search(url, queryOnFocus)
        .then(json => (optionsPath ? selectn(optionsPath, json) : json))
        .then(options => this.setState({ options, isLoading: false }));
    }
  };

  render() {
    let {
      uiSchema: { asyncTypeahead },
      idSchema: { $id } = {},
      schema
    } = this.props;

    let labelKey = mapLabelKey(asyncTypeahead.labelKey);
    // if something is already selected and is a string - removing the label key so that the labelKey function can be ignored.
    labelKey = transformLabelKey(labelKey, schema, this.state.selected);

    let typeConf = Object.assign({}, DEFAULT_OPTIONS, asyncTypeahead, {
      selected: this.state.selected,
      isLoading: this.state.isLoading,
      labelKey,
      onChange: this.handleSelectionChange(asyncTypeahead),
      onSearch: this.handleSearch,
      options: this.state.options,
      onFocus: this.handleOnFocus,
      onBlur: this.handleBlur
    });

    if (asyncTypeahead.overrideOptions) {
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
      url: PropTypes.string,
      optionsPath: PropTypes.string,
      mapping: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.object
      ]),
      cleanAfterSelection: PropTypes.bool,
      overrideOptions: PropTypes.bool,
      search: PropTypes.func
    }).isRequired
  })
};
