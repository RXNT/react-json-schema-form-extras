# react-jsonschema-form-extras

## Usage

FormWithExtras is a wrapper for Mozilla's JSON Schema Form that adds extra useful components.

Use this project as you would use Mozilla's JSON Schema Form (see their documentation), but to leverage the extra widgets just reference them in the ui:widget parameter.

##List of widgets

As of the current commit, these are not fully functional. The code is changing rapidly.

- TableWidget: Given a URL for AJAX requests, allows typeahead functionality in string fields.
https://github.com/ericgio/react-bootstrap-typeahead Any selections are added to the corresponding table. Table columns and rules can be defined via the widget's props.

- TableWidget: A table widget with editable text fields, date fields, drop down menus, and deletable rows.
