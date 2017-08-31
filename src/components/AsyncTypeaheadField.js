import React, { Component } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import selectn from "selectn";

const MenuItem = ({ key, name }) => {
  return (
    <div key={key}>
      <span>{name}</span>
    </div>
  );
};

const DEFAULT_OPTIONS = {
  required: false,
  labelKey: "name",
  minLength: 3,
  renderMenuItemChildren: MenuItem,
  placeholder: "Search...",
};

const toDefault = ({ properties }) => {
  let defVal = Object.keys(properties).reduce((agg, field) => {
    if (properties[field].default !== undefined) {
      agg[field] = properties[field].default;
    }
    return agg;
  }, {});
  return defVal;
};

const toSchemaEvents = (
  events,
  { schema, uiSchema: { typeahead: { responseSchemaMapping } } }
) => {
  if (!responseSchemaMapping) {
    return events;
  }
  let defVal = toDefault(schema.properties ? schema : schema.items);
  let schemaEvents = events.map(event => {
    let schEvent = Object.keys(responseSchemaMapping).reduce((agg, field) => {
      let schemaField = responseSchemaMapping[field];
      agg[schemaField] = event[field];
      return agg;
    }, {});
    return Object.assign({}, defVal, schEvent);
  });
  return schemaEvents;
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

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        Name: query,
      }),
    })
      .then(resp => resp.json())
      .then(json => (optionsMapping ? selectn(optionsMapping, json) : json))
      .then(options => this.setState({ options }));
  };

  handleSelectionChange = events => {
    if (events.length > 0) {
      let schemaEvents = toSchemaEvents(events, this.props);
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

export default AsyncTypeaheadField;
