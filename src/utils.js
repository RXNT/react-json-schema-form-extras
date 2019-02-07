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

export function isStringSchema(schema) {
  return schema.type === "string";
}

export function isNumberSchema(schema) {
  return schema.type === "number" || schema.type === "integer";
}

export function getDefaultValueForSchema(schema) {
  if (isArraySchema(schema)) {
    return [];
  }

  if (isObjectSchema(schema)) {
    return {};
  }

  if (isStringSchema(schema)) {
    return "";
  }

  if (isNumberSchema(schema)) {
    return NaN;
  }
  return "";
}

export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
