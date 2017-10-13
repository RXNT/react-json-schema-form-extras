import { mapToSchema } from "../src/TypeaheadField";

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
