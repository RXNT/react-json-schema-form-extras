export function isDevelopment() {
  return process.env.NODE_ENV !== "production";
}

export function getRegistry() {
  return {
    fields: require("./components/index.js").default,
  };
}

export function defaultValue({ properties }) {
  let defVal = Object.keys(properties).reduce((agg, field) => {
    if (properties[field].default !== undefined) {
      agg[field] = properties[field].default;
    }
    return agg;
  }, {});
  return defVal;
}

export function mapSchema(events, schema, mapping) {
  if (!mapping) {
    return events;
  }

  let defVal = defaultValue(schema.properties ? schema : schema.items);
  let mappedEvents = events.map(event => {
    let mappedEvent = Object.keys(mapping).reduce((agg, field) => {
      let schemaField = mapping[field];
      agg[schemaField] = event[field];
      return agg;
    }, Object.assign({}, defVal));
    return mappedEvent;
  });

  return mappedEvents;
}
