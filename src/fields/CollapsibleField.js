import React from "react";

function CollapseMenu(props) {
  let { onChange, schema: { title }, collapsed } = props;
  let {
    uiSchema: {
      collapse: {
        icon: {
          enabled = "glyphicon glyphicon-chevron-down",
          disabled = "glyphicon glyphicon-chevron-right",
        } = {},
      },
      separate = true,
      wrapClassName = "lead",
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

class CollapsibleField extends React.Component {
  constructor(props) {
    super(props);

    let { uiSchema: { collapse: { active = true } = {} } } = props;

    this.state = { collapsed: active };
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

export default CollapsibleField;
