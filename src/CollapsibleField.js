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

class CollapseLegend extends Component {
  render() {
    let {
      uiSchema: { collapse: { legend } },
      formContext: { legends = {} } = {},
    } = this.props;
    if (!legend) {
      return null;
    }
    if (typeof legend === "string") {
      return <div>{legend}</div>;
    } else if (typeof legend === "object") {
      const Component = legends[legend.component];
      if (!Component) {
        console.error(`Can't find ${legend.components} in formContext.legends`);
        return (
          <h2 className="warning bg-error" style={{ color: "red" }}>
            Can't find <b>{legend.component}</b> in <b>formContext</b>.<b>legends</b>
          </h2>
        );
      }
      return <Component {...legend.props} />;
    }
    return <div>I'm a legend</div>;
  }
}

class CollapsibleField extends Component {
  constructor(props) {
    super(props);

    let { uiSchema: { collapse: { collapsed = true } = {} } } = props;

    this.state = { collapsed };
  }

  appendToArray = (formData = [], newVal) => {
    if (formData.some(v => deepEquals(v, newVal))) {
      return formData;
    } else {
      // newVal can be either array or a single element, concat flattens value
      return formData.concat(newVal);
    }
  };

  doAdd = (field, formData, newVal) => {
    if (field === "self") {
      this.props.onChange(this.appendToArray(formData, newVal));
    } else {
      let fieldVal = this.appendToArray(formData[field], newVal);
      let change = Object.assign({}, formData, { [field]: fieldVal });
      this.props.onChange(change);
    }
  };

  handleAdd = () => {
    this.setState({ collapsed: false });
    this.forceUpdate(() => {
      let { schema, uiSchema, formData, registry: { fields } } = this.props;
      let { collapse: { addTo, addElement } } = uiSchema;

      let fieldSchema =
        addTo === "self" ? schema.items : schema.properties[addTo].items;
      let fieldUiSchema = addTo === "self" ? uiSchema : uiSchema[addTo];

      if (addElement) {
        if (typeof addElement === "function") {
          let onSubmit = newVal => {
            this.setState({ AddElement: undefined });
            this.doAdd(addTo, formData, newVal);
          };
          let AddElement = addElement(fieldSchema, fieldUiSchema, onSubmit);
          this.setState({ AddElement });
        } else {
          let FieldElement = fields[addElement];
          let onBlur = newVal => {
            this.setState({ AddElement: undefined });
            this.doAdd(addTo, formData, newVal);
          };
          let AddElement = () => (
            <FieldElement
              schema={fieldSchema}
              uiSchema={fieldUiSchema}
              onChange={formData => {
                onBlur(formData);
              }}
            />
          );
          this.setState({ AddElement });
        }
      } else {
        let newVal = getDefaultFormState(fieldSchema, {});
        this.doAdd(addTo, formData, newVal);
      }
    });
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
    let { collapsed, AddElement } = this.state;
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
          {AddElement && <AddElement />}
          {!collapsed && <CollapseLegend {...this.props} />}
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
      icon: PropTypes.shape({
        enabled: PropTypes.string,
        disabled: PropTypes.string,
        add: PropTypes.string,
      }),
      separate: PropTypes.boolean,
      addTo: PropTypes.string,
      addElement: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
      legend: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          component: PropTypes.string.isRequired,
          props: PropTypes.object,
        }),
      ]),
      wrapClassName: PropTypes.string,
    }).isRequired,
  }).isRequired,
  registry: PropTypes.shape({
    fields: PropTypes.object.isRequired,
  }).isRequired,
};

export default CollapsibleField;
