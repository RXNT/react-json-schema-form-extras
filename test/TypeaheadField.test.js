import { mapToSchema, toSelected } from "../src/TypeaheadField";

let strSchema = {
  type: "string",
};

test("map simple string", () => {
  expect(mapToSchema(["test"], strSchema)).toEqual("test");
});

test("map string with label", () => {
  expect(mapToSchema([{ name: "test" }], strSchema, obj => obj.name)).toEqual(
    "test"
  );
});

let objSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};

test("map any obj", () => {
  expect(mapToSchema([{ name: "test" }], objSchema, undefined)).toEqual({
    name: "test",
  });
});

test("map obj with mapping", () => {
  expect(
    mapToSchema([{ lastName: "Woo", firstName: "Woo" }], objSchema, {
      name: "firstName",
    })
  ).toEqual({ name: "Woo" });
});

let arrSchema = { type: "array" };
test("map array string", () => {
  expect(mapToSchema(["test", "Hello"], arrSchema)).toEqual(["test", "Hello"]);
});

test("map array of Objects", () => {
  expect(
    mapToSchema([{ name: "Hello", lastName: "World" }], arrSchema)
  ).toEqual([{ name: "Hello", lastName: "World" }]);
});

test("to selected string ", () => {
  expect(
    toSelected("potter", { type: "string" }, "name", [
      { age: "harry", name: "potter" },
    ])
  ).toEqual([{ age: "harry", name: "potter" }]);
});

test("to selected string without mapping ", () => {
  expect(
    toSelected("Harry", { type: "string" }, undefined, [
      "Harry",
      "Potter",
      "Wizard",
    ])
  ).toEqual(["Harry"]);
});

test("to selected object ", () => {
  expect(
    toSelected(
      { demoName: "Hello", demoLastName: "There" },
      { type: "object" },
      { demoName: "name", demoLastName: "lastName" },
      [{ name: "Hello", lastName: "There" }, { name: "Albus", lastName: "Ste" }]
    )
  ).toEqual([{ name: "Hello", lastName: "There" }]);
});
