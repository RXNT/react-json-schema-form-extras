import React, { Component } from "react";
import {
  getDefaultFormState,
  deepEquals,
} from "react-jsonschema-form/lib/utils";
import PropTypes from "prop-types";

function CollapseMenu(props) {
  let { onChange, onAdd, title, name, collapsed } = props;
  let {
    uiSchema: {
      collapse: {
        icon: {
          enabled = "glyphicon glyphicon-chevron-down",
          disabled = "glyphicon glyphicon-chevron-right",
          add = "glyphicon glyphicon-plus-sign",
        } = {},
        separate = true,
        addTo,
        wrapClassName = "lead",
      },
    },
  } = props;
  return (
    <div className={wrapClassName}>
      <span>{title || name}</span>&nbsp;
      {addTo && (
        <a onClick={onAdd}>
          <i className={add} />
        </a>
      )}
      <a onClick={onChange}>
        <i className={collapsed ? disabled : enabled} />
      </a>
      {separate && <hr />}
    </div>
  );
}

class CollapsibleField extends Component {
  constructor(props) {
    super(props);

    let { uiSchema: { collapse: { collapsed = true } = {} } } = props;

    this.state = { collapsed };
  }

  appendToArray = ({ items }, formData = []) => {
    let newVal = getDefaultFormState(items, {});
    if (formData.some(v => deepEquals(v, newVal))) {
      return formData;
    } else {
      return formData.concat(newVal);
    }
  };

  handleAdd = () => {
    let {
      schema,
      formData,
      onChange,
      uiSchema: { collapse: { addTo } },
    } = this.props;
    if (addTo === "self") {
      onChange(this.appendToArray(schema, formData));
    } else {
      formData = formData ? formData : {};
      let fieldVal = this.appendToArray(
        schema.properties[addTo],
        formData[addTo]
      );
      let change = Object.assign({}, formData, { [addTo]: fieldVal });
      onChange(change);
    }
    this.setState({ collapsed: false });
  };

  handleCollapsed = () => {
    this.setState(function(state) {
      return { collapsed: !state.collapsed };
    });
  };

  render() {
    let {
      schema: { title },
      uiSchema,
      registry: { fields },
      name,
    } = this.props;
    let { collapsed } = this.state;
    let { collapse: { field } } = uiSchema;
    let CollapseElement = fields[field];

    title = uiSchema["ui:title"] ? uiSchema["ui:title"] : title ? title : name;

    return (
      <div>
        <CollapseMenu
          title={title}
          uiSchema={uiSchema}
          collapsed={collapsed}
          onAdd={this.handleAdd}
          onChange={this.handleCollapsed}
        />
        <div className="form-group">
          {!collapsed && <CollapseElement {...this.props} />}
        </div>
      </div>
    );
  }
}

CollapsibleField.propTypes = {
  uiSchema: PropTypes.shape({
    collapse: PropTypes.shape({
      field: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  registry: PropTypes.shape({
    fields: PropTypes.object.isRequired,
  }).isRequired,
};

export default CollapsibleField;
