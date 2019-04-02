"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = toArray;
exports.isObjectSchema = isObjectSchema;
exports.isArraySchema = isArraySchema;
exports.isStringSchema = isStringSchema;
exports.isNumberSchema = isNumberSchema;
exports.getDefaultValueForSchema = getDefaultValueForSchema;
exports.deepCopy = deepCopy;
function toArray(el) {
  if (Array.isArray(el)) {
    return el;
  } else {
    return [el];
  }
}

function isObjectSchema(schema) {
  return schema.type === "object" || schema.items && schema.items.type === "object";
}

function isArraySchema(schema) {
  return schema.type === "array";
}

function isStringSchema(schema) {
  return schema.type === "string";
}

function isNumberSchema(schema) {
  return schema.type === "number" || schema.type === "integer";
}

function getDefaultValueForSchema(schema) {
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

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}