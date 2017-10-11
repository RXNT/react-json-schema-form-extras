import { mapSchema } from "../src/TypeaheadField";

let strSchema = {
  type: "string",
};

test("map simple string", () => {
  expect(mapSchema(["test"], strSchema)).toEqual("test");
});

test("map string with label", () => {
  expect(
    mapSchema([{ name: "test" }], strSchema, undefined, obj => obj.name)
  ).toEqual("test");
});

let objSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};

test("map any obj", () => {
  expect(
    mapSchema([{ name: "test" }], objSchema, undefined, obj => obj.name)
  ).toEqual({ name: "test" });
});

test("map obj with mapping", () => {
  expect(
    mapSchema([{ lastName: "Woo", firstName: "Woo" }], objSchema, {
      name: "firstName",
    })
  ).toEqual({ name: "Woo" });
});
