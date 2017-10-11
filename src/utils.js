export function toArray(el) {
  if (Array.isArray(el)) {
    return el;
  } else {
    return [el];
  }
}

export function isObjectSchema(schema) {
  return (
    schema.type === "object" || (schema.items && schema.items.type === "object")
  );
}

export function isArraySchema(schema) {
  return schema.type === "array";
}
