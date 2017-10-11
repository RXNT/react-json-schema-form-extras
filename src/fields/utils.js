export function toArray(el) {
  if (Array.isArray(el)) {
    return el;
  } else {
    return [el];
  }
}

export function isArraySchema(schema) {
  return schema.items;
}
