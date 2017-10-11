[![Build Status](https://travis-ci.org/RxNT/react-jsonschema-form-extas.svg?branch=master)](https://travis-ci.org/RxNT/react-jsonschema-form-extras)
[![Coverage Status](https://coveralls.io/repos/github/RxNT/react-jsonschema-form-extras/badge.svg)](https://coveralls.io/github/RxNT/react-jsonschema-form-extras)
[![npm version](https://badge.fury.io/js/react-jsonschema-form-extras.svg)](https://badge.fury.io/js/react-jsonschema-form-extras)

# Catalogue

This project provides light integration over established React components, 
trying to keep configurations compatible with original project. 
All configurations you can specify in original projects, can be reused here.
  
- Composite array field (`ui:field` > `compositeArray`)
- Collapsible fields (`ui:field` > `collapsible`)
- Alternative input fields (`ui:field` > `altInput`)
- Typeahead, based on [react-bootstrap-typeahead](https://github.com/ericgio/react-bootstrap-typeahead) (`ui:field` > `typeahead`)
- Async Typeahead based on [react-bootstrap-typeahead](https://github.com/ericgio/react-bootstrap-typeahead) (`ui:field` > `asyncTypeahead`)
- RTE, based on [react-rte](https://github.com/sstur/react-rte) (`ui:field` > `rte`)
- Tables, based on [react-bootstrap-table](https://github.com/AllenFang/react-bootstrap-table) (`ui:field` > `table`)

## Use

This project uses internal react-jsonschema-form extension mechanism, through ui:field option in uiSchema. 
The simplest example of using it out of the box, is like this:

```js
import Form from "react-jsonschema-form";
import fields from "react-jsonschema-form-extras";

ReactDOM.render(
  <Form fields={fields}/>,
  document.getElementById("app")
);

```

If you have additional extensions, that are not part of this project, you can enable them, like this

```js
import Form from "react-jsonschema-form";
import otherFields from "other-fields";
import fields from "react-jsonschema-form-extras";

let allFields = Object.assign({}, fields, otherFields);

ReactDOM.render(
  <Form fields={allFields}/>,
  document.getElementById("app")
);

```

## Composite array field (`compositeArray`)

### Purpose

This is a simple UI pattern, where you want to separate entering a new value to the array and working with existing values.

### Use

The simplest `uiSchema` configuration would be:

```json
{
  "ui:field": "compositeArray",
  "inputField": "typeahead",
  "arrayField": "table",
  "typeahead": { },
  "table": { }
}
```

This means the final field will be presented in 2 parts
 - initial input with `typeahead` field
 - array field in `table` form

You can specify configurations for each field representation independently.

### Properties

There are only 2 properties needed for it to work
 - `inputField` field from form registry to use as a new field input presentation
 - `arrayField` field from form registry to use to present existing array values

## Collapsible fields (`collapsible`)

### Purpose

Collapsible helps you to hide content, that might take up too much space on the screen an expand it if user wishes.

### Use 

The simplest `uiSchema` configuration would be:

```json
{
  "ui:field": "collapsible",
  "collapse": {
    "field": "table"
  }
}
```

This is a hidden `table` field configuration, which will be presented as collapsed `schema` `title` name.

### Properties

You can customize presentation of collapsible field, with "collapse" object in uiSchema
- `field` `string` an actual hidden field to use
- `collapsed` `boolean` - indicating initial state (default `true`) 
- `icon` `object` icons configuration in `enabled` and `disabled` state
    - `enabled` `string` icon, when the field is shown (default `glyphicon glyphicon-chevron-down`)
    - `disabled` `string` icon, when field is hidden (default `glyphicon glyphicon-chevron-right`)
- `separate` `boolean` enable <hr/> after collapse menu (default `true`)  
- `wrapClassName` `string` class name to use on a parent collapse menu div (default `lead`)

Field `schema` `title` used as a header of the collapsible action. 

## Alternative input fields (`altInput`)

### Purpose

You want to enter the same `field` in 2 different ways. For example if a field might be a `string` and `number`

### Use

The simplest configuration would look something like this

```json
{
  "ui:field": "altInput",
  "defInput": "typeahead",
  "altInput": "asyncTypeahead",
  "typeahead": { },
  "asyncTypeahead": { }
}
```
In this case user would be able to enter the same field, either by using async typeahead or regular one.

### Properties

In order to configure presentation there are few options
- `defInput` `string` registry field to use as primary input method
- `altInput` `string` registry field to use as an alternative input method
- `altInputSeparator` `string` string to use in between those 2 presentations

## Typeahead, based on [react-bootstrap-typeahead](https://github.com/ericgio/react-bootstrap-typeahead) (`typeahead`)

### Purpose

This is a wrap of [react-bootstrap-typeahead](https://github.com/ericgio/react-bootstrap-typeahead), which allows you to use this project in your `jsonschema-form`

### Use

The simplest configuration would be

 ```json
 {
   "ui:field": "typeahead",
   "typeahead": { 
      "options": [ { "state": "New York" }, { "code": "Washington" }],
      "labelKey": "state"
    }
 }
 ```
 
 In this case the typeahead would only have 2 options - `New York` and `Washigton`
 
 ### Properties
 
 All properties that you specify under `typeahead` will be used in the original project.
 Additionally, there are few project specific properties
 - `labelKey` have more flexibility in configuration
  - `labelKey` `string` used a labelKey in [typeahead](https://github.com/ericgio/react-bootstrap-typeahead) project
  - `labelKey` `array` in this case array is a list of fields in original object, which are combined in a single string with a space separator
  - `labelKey` `object` with `fields` `array` of fields to use, `separator` string separator to use between fields 
 - `cleanAfterSelection` `boolean` clean selection after component was selected
 - `mapping` `object` that maps selected object to schema object
 
 For complete list of configurations refer to [react-bootstrap-typeahead](https://github.com/ericgio/react-bootstrap-typeahead)

Here are some use case examples
 
With following options
 
```json
[ 
  {
    "name": "Adventures of Huckleberry Finn", "author": "Mark Twain"
  },
  {
    "name": "The Adventures of Tom Sawyer", "author": "Mark Twain"
  }
]
```

With labelKey `name` there will be 2 options
- `Adventures of Huckleberry Finn`
- `The Adventures of Tom Sawyer`

With labelKey `[ "author", "name" ]`, options will be
- `Mark Twain Adventures of Huckleberry Finn`
- `Mark Twain The Adventures of Tom Sawyer`

With lableKey `{ fields: [ "author", "name" ], separator: " - " }`, options will be
- `Mark Twain - Adventures of Huckleberry Finn`
- `Mark Twain - The Adventures of Tom Sawyer` 

Mapping can be specified like this
```json
{
  "mapping": {
    "creator": "author",
    "book": "name"
  }
}
```
And it would generate 2 values
- `{ book: "Adventures of Huckleberry Finn", creator: "Mark Twain" }`
- `{ book: "The Adventures of Tom Sawyer", creator: "Mark Twain" }`
 
## Async Typeahead based on [react-bootstrap-typeahead](https://github.com/ericgio/react-bootstrap-typeahead) (`asyncTypeahead`)

### Purpose 

This is a wrap around `async` functionality of [typeahead](https://github.com/ericgio/react-bootstrap-typeahead), supporting some additional defaults.

### Use

The simplest configuration would be

 ```json
 {
   "ui:field": "asyncTypeahead",
   "asyncTypeahead": { 
      "url": "https://example.com/state"
    }
 }
 ```
 
 This will result in typeahead search with `https://example.com/state?query=${query}`
 
### Properties

Async typeahead extends default configuration list for `typeahead`, by adding few properties
- `url` search url, that will be used during autocomplete
- `search` function that will be querying server for data, which takes 2 parameters, and must return a Promise with a json result
    - `url` configured URL
    - `query` typed query string
-  `optionsPath` path to options array in response


For example, let's consider query with `Was` on `url` `https://example.com/state`.

By default field will query results with  - `https://example.com/state?query=Was`.

Let's say we want to override it and query - `https://example.com/state?name=Was&maxSize=1`.
 
Here is how we can do that:

```js
let uiSchema = {
  "ui:field": "asyncTypeahead",
  asyncTypeahead: {
    url: "https://example.com/state",
    search: (url, query) => fetch(`${url}?name=${query}&maxSize=1`)
  }
}
```
That is it.

For complete list of async typeahead configurations refer to [react-bootstrap-typeahead](https://github.com/ericgio/react-bootstrap-typeahead)

## RTE, based on [react-rte](https://github.com/sstur/react-rte) (`rte`)

### Purpose

This is a simple field, that allows you to enter RTE text inside your string field.

### Use 

The simplest configuration would be

 ```json
 {
   "ui:field": "rte",
   "rte": {
      "format": "html"
   }
 }
 ```

### Properties

The only property this field requires is `format`
- `format` `string` an `rte` output format (default `html`)

As with other projects, all configurations, that you'll configure unser `uiSchema` `rte` field will be transferred to the actual component.


## Tables, based on [react-bootstrap-table](https://github.com/AllenFang/react-bootstrap-table) (`table`)

### Purpose

This component wraps [react-bootstrap-table](https://github.com/AllenFang/react-bootstrap-table) for array components, with smart default configurations.

### Use
 
 The simplest configuration would be
 
```json
{
"ui:field": "table"
}
```

### Properties

You can use `table` field without any predefined configurations, it will generate default table schema with columns. 
- `tableCols` an array of react-bootstrap-table configurations, that override default generated configurations for the field.

By default table component will generate table columns, based on an array schema, with editables, based on field types.

You can reuse react-jsonschema-form Components, in table column editing, to do that, you need to define
- `field` property in tableCols override section, with `uiSchema` to use for the field. 

For example let's say we have allergy array, with `allergyName` coming from server source, 
we can enable `asyncTypeahead` on allergyName field in `tableCols` override like this:  
```js
let uiSchema = {
  allergies: {
    classNames: "col-md-12",
    "ui:field": "table",
    table: {
      tableCols: [
        {
          dataField: "allergyName",
          field: "asyncTypeahead",
          uiSchema: {
            "ui:field": "asyncTypeahead",
            asyncTypeahead: {
              bodyContainer: true,
              url: "/allergies/typeahead"
            },
          },
        },
      ],
    },
  },
};
```


## Contribute

- Issue Tracker: github.com/RxNT/react-jsonschema-extras/issues
- Source Code: github.com/RxNT/react-jsonschema-extras

## Support

If you are having issues, please let us know here or on StackOverflow.

## License

The project is licensed under the Apache Licence 2.0.

  


 


