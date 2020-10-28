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

## Table of Contents

  - [Use](#use)
  - [Composite array field (compositeArray)](#composite-array-field-compositearray)
     - [Purpose](#purpose)
     - [Use](#use)
     - [Properties](#properties)
  - [Collapsible fields (collapsible)](#collapsible-fields-collapsible)
     - [Purpose](#purpose)
     - [Use](#use)
     - [Properties](#properties)
     - [Examples](#examples)
        - [Using specific legend in collapsible field.](#using-specific-legend-in-collapsible-field)
     - [Properties](#properties)
  - [Typeahead, based on react-bootstrap-typeahead (typeahead)](#typeahead-based-on-react-bootstrap-typeahead-typeahead)
     - [Purpose](#purpose)
     - [Use](#use)
     - [Properties](#properties)
        - [Label key](#label-key)
        - [Mapping](#mapping)
  - [Async Typeahead based on react-bootstrap-typeahead (asyncTypeahead)](#async-typeahead-based-on-react-bootstrap-typeahead-asynctypeahead)
     - [Purpose](#purpose)
     - [Use](#use)
     - [Properties](#properties)
  - [RTE, based on react-rte (rte)](#rte-based-on-react-rte-rte)
     - [Purpose](#purpose)
     - [Use](#use)
     - [Properties](#properties)
  - [Tables, based on react-bootstrap-table (table)](#tables-based-on-react-bootstrap-table-table)
     - [Purpose](#purpose)
     - [Use](#use)
     - [Properties](#properties)
        - [Columns order](#columns-order)
        - [Cell dataFormat](#cell-dataformat)
     - [Additional column actions](#additional-column-actions)
  - [React Day Picker, based on react-day-picker (rdp)](#react-day-picker-based-on-react-day-picker-rdp)
     - [Purpose](#purpose)
     - [Use](#use)
     - [Properties](#properties)
  - [Contribute](#contribute)
  - [Support](#support)
  - [License](#license)

---

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

You can load only one field you need if want to keep the bundle small.

```js
import Form from "react-jsonschema-form";
import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";

ReactDOM.render(
  <Form fields={{ typeahead: TypeaheadField }}/>,
  document.getElementById("app")
);
```
[![Edit p3z45m8rpq](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/p3z45m8rpq)

If you want multiple fields:

```js
import Form from "react-jsonschema-form";
import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";
import ReactDatePicker from "react-jsonschema-form-extras/lib/ReactDatePicker";

ReactDOM.render(
  <Form fields={{ typeahead: TypeaheadField, rdp: ReactDatePicker }}/>,
  document.getElementById("app")
);
```
[![Edit wnyl7n07zk](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/wnyl7n07zk)

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
    - `add` `string` icon, to use in place of an add sign (default `glyphicon glyphicon-plus-sign`)
- `separate` `boolean` enable <hr/> after collapse menu (default `true`)  
- `wrapClassName` `string` class name to use on a parent collapse menu div (default `lead`)
- `addTo` `string` array field name, to which icon will be added enables an add icon, that will be shown besides collapsible icon
- `addElement` (experimental) representation element for add function (for example if you want to show modal on add icon press, here where this would be)
    - `function(schema, uiSchema, onChange)` that returns React Component to render for add function
    - `string` `field` definition from `react-jsonschema-form` catalogue
- `actions` (experimental) allows to add additional actions to collapsible menu
    - `array` of `objects` that allows to render any kind of `action` you need, which will be sourced from `formContext` `allActions` configuration
        - `component` `string` name of the component, that will be sourced from `formContext.allActions` object
        - `props` `object` additional properties for rendered component
- `legend` (experimental) allows to add additional information under collapsed field
    - `string` text to be rendered under collapsible field
    - `object` that allows to render any kind of `legend` you need, which will be sourced from `formContext` `legends` configuration
        - `component` `string` name of the component, that will be sourced from `formContext.legends` object
        - `props` `object` additional properties for rendered component


Additional feature of the Collapsible field is to allow adding empty value to hidden `array`, it's enabled with `addTo` feature, which can
be either `self` which assumes that Collapsible field is the target array, or it can be a property field.

Field `schema` `title` used as a header of the collapsible action.

### Examples

#### Using specific legend in collapsible field.

Task:

We have a `firstName` field, which is collapsible and we need to display a `LanguageLegend`, which would notify user of the language to use.

Solution:

The simplest configuration with `schema`, `uiSchema` and `formContext` would look something like this

```jsx harmony
    import React from "react";
    import fields from "react-jsonschema-form-extras"

    let schema = {
      type: "object",
      properties: {
        firstName: { type: "string" }
      }
    }

    let uiSchema = {
      firstName: {
          "ui:field": "collapsible",
          collapse: {
            field: "StringField",
            legend: {
              component: "LanguageLegend",
              props: {
                language: "EN"
              }
            }
          }
      }
    }

    let formContext = {
      legends: {
        LanguageLegend: (props) => (<h1>Expected {props.language} characters</h1>)
      }
    }

    <Form formContext={formContext} schema={schema} uiSchema={uiSchema} fields={fields}>
```

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
 - `focusOnMount` focusOn typeahead, after it was mounted to page
 - `typeahead` all properties that you specify under `typeahead` will be used in the original project.
    Additionally, there are few project specific properties
     - `labelKey` have more flexibility in configuration
      - `labelKey` `string` used a labelKey in [typeahead](https://github.com/ericgio/react-bootstrap-typeahead) project
      - `labelKey` `array` in this case array is a list of fields in original object, which are combined in a single string with a space separator
      - `labelKey` `object` with `fields` `array` of fields to use, `separator` string separator to use between fields
     - `cleanAfterSelection` `boolean` clean selection after component was selected (default false)
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

#### Label key

With labelKey `name` there will be 2 options
- `Adventures of Huckleberry Finn`
- `The Adventures of Tom Sawyer`

With labelKey `[ "author", "name" ]`, options will be
- `Mark Twain Adventures of Huckleberry Finn`
- `Mark Twain The Adventures of Tom Sawyer`

With lableKey `{ fields: [ "author", "name" ], separator: " - " }`, options will be
- `Mark Twain - Adventures of Huckleberry Finn`
- `Mark Twain - The Adventures of Tom Sawyer`

#### Mapping

Mapping can be one of
- not specified, in this case selection is sent to the formData as is
- `string` which is field name in typeahead selected object  
- `object` with fields corresponding to final schema fields and values, corresponding to fields in typeahead
- `function` which will be called with typeahead selected objects, which ever value you specify will be used

Mapping as undefined (we accept values as is)
```
{
  "mapping": undefined
}
```
would result in
- `{ "name": "Adventures of Huckleberry Finn", "author": "Mark Twain" }`
- `{ "name": "The Adventures of Tom Sawyer", "author": "Mark Twain" }`

Mapping as string (we want only name of the book)
```json
{
  "mapping": "name"
}
```
would result in
- `"Adventures of Huckleberry Finn"`
- `"The Adventures of Tom Sawyer"`


Mapping as object (we want to change mapping to creator and book)
```json
{
  "mapping": {
    "creator": "author",
    "book": "name"
  }
}
```
would result in
- `{ book: "Adventures of Huckleberry Finn", creator: "Mark Twain" }`
- `{ book: "The Adventures of Tom Sawyer", creator: "Mark Twain" }`

Mapping as function (let's say we want to take a first name of the author)
```js
 let uiSchema = {
    mapping: (event) => event.creator.split(" ")[0]
 }
```
would result in
- `"Mark"`
- `"Mark"`


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

Async typeahead extends default configuration list for `typeahead`, by adding few properties under `asyncTypeahead`
 - `focusOnMount` focusOn typeahead, after it was mounted to page
 - `asyncTypeahead` all properties that you specify under `typeahead` will be used in the original project.
    - `url` search url, that will be used during autocomplete
    - `search` function that will be querying server for data, which takes 2 parameters, and must return a Promise with a json result
        - `url` configured URL
        - `query` typed query string
    -  `optionsPath` path to options array in response
    - `labelKey` have more flexibility in configuration
        - `labelKey` `string` used a labelKey in [typeahead](https://github.com/ericgio/react-bootstrap-typeahead) project
        - `labelKey` `array` in this case array is a list of fields in original object, which are combined in a single string with a space separator
        - `labelKey` `object` with `fields` `array` of fields to use, `separator` string separator to use between fields
    - `cleanAfterSelection` `boolean` clean selection after component was selected (default false)
    - `overrideOptions` if true, the user can type any text in the input field (or select an option, then modify it),
    and it will be saved in the RJSF model (default false)
    - `mapping` `object` that maps selected object to schema object


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
- `updateOnBlur` `boolean` allows for RTE update parent form only after edit finished, to minimize calculations and redraw (default `false`)

As with other projects, all configurations, that you'll configure under `uiSchema` `rte` field will be transferred to the actual component.


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
- `focusOnAdd` column number, when set, adding new row to the table, it will focus on a specified column.   

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

#### Columns order

By default order of columns is defined by `schema` properties field order.
It might be not always reliable, so there is a way to override it.
By default the order will follow order of columns in `tableCols` configuration.


```js
let schema = {
  type: 'object',
  properties: {
    medications: {
      type: 'array',
      items: {
        type: "object",
        properties: {
          dosage: { type: "number" },
          name: { type: "string" }
        }
      }
    }
  }
};

let uiSchema = {
  medications: {
    "ui:field": "table",
    table: {
      tableCols: [
        {
          dataField: "name",
        },
        {
          dataField: "dosage",
        },
      ],
    },
  },
};
```

Here although in medications property schema `dosage` goes before `name`, it will be shown first due to `tableCols` order of columns.

#### Cell dataFormat

react-bootstrap-table provides custom [dataFormat](https://allenfang.github.io/react-bootstrap-table/docs.html#dataFormat) for rendering data in columns.
We needed to support serialized configuration, so we extended native functionality, with string configuration,
- `object` dataFormat can be a `string` which translates into field name in the object.
- `date-time` & `date` `string` dataFormat is a format of string presentation, that is generated with moment.js

For example, let's say we have an allergies table, with identifier, which consists of some numeric id and string name. When showing to the user, we want to show only name. Here is how we can do this:

```js
let schema = {
   type: 'object',
    properties: {
      allergies: {
        type: 'array',
        items: {
          type: "object",
          properties: {
            identified: {
              type: "object",
              properties: {
                id: { type: "string"},
                name: { type: "string" }
              }
            },
            added: { type: "date-time" }
          }
        }
      }
    }
}

let uiSchema = {
  medications: {
    "ui:field": "table",
    table: {
      tableCols: [
        {
          dataField: "identifier",
          dataFormat: "name"
        },
        {
          dataField: "dosage",
          dataFormat: "YYYY-MM-DD"
        },
      ],
    },
  },
};
```
In this case dataFormat on identifier field, will translate into selecting name field in identifier object.

### Additional column actions

If you need to define additional column actions to the left or to the right of column content you can do that in
a standard way with `uiSchema` with `leftActions` or `rightActions` defined

```js
let uiSchema = {
    table: {
      leftActions: [
        {
          action: "delete",
          className: "col-md-1",
          columnClassName: "col-md-1",
          editColumnClassName: "col-md-1",
          icon: "glyphicon glyphicon-minus"
        }
      ],
      rightActions: [
        {
          action: "delete",
          icon: "glyphicon glyphicon-minus",
          text: "Remove"
        }
      ]
    }
  }
```

Both left and right actions can accept full column configuration, that will be appended to the rendered column,

For example, to define delete on each column, you can:
```js
let uiSchema = {
    table: {
      leftActions: [
        {
          dataField: "delete-button",
          dataFormat: (cell, row, enumObject, rowIndex, formData, onChange) => (
            <span onClick={() => onChange(formData.filter((el, i) => rowIndex !== i))}>"Remove All"</span>
          ),
          editable: false,
          displayName: "Left Panel"
        },
      ],
      rightActions: [
        {
          action: "delete",
          icon: "glyphicon glyphicon-minus",
          text: "Delete",
          displayName: "Right Panel"
        }
      ]
    }
  }
```

In left panel, we have defined delete with a standard `react-bootstrap-table` format, the only difference is dataFormat signature changed,
appending original formData and onChange callback to relay changes to the listening component.

Right panel is defined with small syntactic sugar to simpify action defintion
- `action` can be either `delete` string or function, that is equivalent on onClick function with `cell`, `row`, `enumObject`, `rowIndex`, `formData`, `onChange` parameters
- `icon` icon to use for the column
- `text` text to use for the column
- `displayName` column name

## React Day Picker, based on [react-day-picker](https://github.com/gpbl/react-day-picker) (`rdp`)

### Purpose

Allows you to use react-day-picker as input `ui:field`. This component works only with `string` formatted as `date` and `date-time`.  

### Use

The simplest configuration would be

 ```json
 {
   "ui:field": "rdp"
 }
 ```

### Properties

All configurations, that you'll configure under `uiSchema` `rdp` field will be transferred to the actual component.

For example to enable `Today` button, you would need to specify following uiSchema  
```json
{
  "ui:field": "rdp",
  "rdp": {
    "dayPickerProps": {
      "todayButton": "Today"
    }
  }
}

```
For the full list of properties refer to [React Day Picker](http://react-day-picker.js.org).


## Table Expandable Row Component

### Purpose

 to enable expandable row in table component

### Use

to expand table rows 
 ```json
{
  "table": {
    "isTableExpandable":false,
    "allowOneRowExpanding":true
  }
}
 ```

### Properties

All configurations, that you'll configure under `uiSchema` `table` field will be transferred to the actual component.

For example to enable `ExpandRow` button, you would need to specify following uiSchema  
```json
{
  "table": {
    "isTableExpandable":false,
    "allowOneRowExpanding":true
  }
}

```

## Contribute

- Issue Tracker: github.com/RxNT/react-jsonschema-extras/issues
- Source Code: github.com/RxNT/react-jsonschema-extras

## Support

If you are having issues, please let us know here or on StackOverflow.

## License

The project is licensed under the Apache Licence 2.0.
