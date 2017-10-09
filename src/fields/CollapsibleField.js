import React, { Component } from "react";
import PropTypes from "prop-types";

function CollapseMenu(props) {
  let { onChange, schema: { title }, collapsed } = props;
  let {
    uiSchema: {
      collapse: {
        icon: {
          enabled = "glyphicon glyphicon-chevron-down",
          disabled = "glyphicon glyphicon-chevron-right",
        } = {},
        separate = true,
        wrapClassName = "lead",
      },
    },
  } = props;
  return (
    <div className={wrapClassName}>
      <span>{title}</span>&nbsp;
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

  handleCollapsed = () => {
    this.setState(function(state) {
      return { collapsed: !state.collapsed };
    });
  };

  render() {
    let { schema, uiSchema, registry: { fields } } = this.props;
    let { collapsed } = this.state;
    let { collapse: { field } } = uiSchema;
    let CollapseElement = fields[field];

    return (
      <div>
        <CollapseMenu
          schema={schema}
          uiSchema={uiSchema}
          collapsed={collapsed}
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
