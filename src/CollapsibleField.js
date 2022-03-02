import React, { Component } from "react";
import {
  deepEquals,
  getDefaultFormState
} from "react-jsonschema-form/lib/utils";
import PropTypes from "prop-types";

class CollapseMenuAction extends Component {
  render() {
    let { action, allActions = {} } = this.props;
    if (!action) {
      return null;
    }
    if (typeof action === "string") {
      return <div>{action}</div>;
    } else if (typeof action === "object") {
      const Component = allActions[action.component];
      if (!Component) {
        console.error(
          `Can't find ${action.component} in formContext.allActions`
        );
        return (
          <h2 className="warning bg-error" style={{ color: "red" }}>
            Can't find <b>{action.component}</b> in <b>formContext</b>.<b>allActions</b>
          </h2>
        );
      }
      return <Component {...action.props} />;
    }
  }
}

function CollapseMenu(props) {
  let {
    uiSchema: {
      collapse: {
        icon: {
          enabled = "glyphicon glyphicon-chevron-down",
          disabled = "glyphicon glyphicon-chevron-right",
          add = "glyphicon glyphicon-plus-sign"
        } = {},
        separate = true,
        addTo,
        wrapClassName = "lead",
        actions = [],
        classNames = "collapsibleHeading",
        collapseDivStyles: {
          textColor = "white",
          background = "linear-gradient(to right, #0472B6, white)",
          collapseGlyphColor = "white",
          addGlyphColor = "white",
          padding = "14px",
          margin = "",
          marginLeft = "-5px",
          marginBottom = "5px",
          zIndex = -1,
          divCursor = "pointer",
          addCursor = "copy"
        } = {}
      }
    },
    formContext = {},
    onChange,
    onAdd,
    title,
    name,
    collapsed
  } = props;

  const handleAdd = event => {
    event.stopPropagation();
    onAdd(event);
  };

  return (
    <div className={`${wrapClassName}`}>
      <div
        className={classNames}
        onClick={onChange}
        style={{
          padding,
          margin,
          marginLeft,
          marginBottom,
          zIndex,
          cursor: divCursor,
          background
        }}
      >
        <span style={{ color: textColor }}>{title || name}</span>&nbsp;
        {addTo && (
          <a
            onClick={handleAdd}
            style={{ color: addGlyphColor, cursor: addCursor }}
          >
            <i style={{ cursor: addCursor }} className={add} />
          </a>
        )}
        <a>
          <i
            style={{ color: collapseGlyphColor }}
            className={collapsed ? disabled : enabled}
          />
        </a>
        {actions.map((action, i) => (
          <CollapseMenuAction
            key={i}
            action={action}
            allActions={formContext.allActions}
          />
        ))}
      </div>
      {separate && <hr />}
    </div>
  );
}

class CollapseLegend extends Component {
  render() {
    let {
      uiSchema: { collapse: { legend } },
      formContext: { legends = {} } = {}
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
    let { uiSchema: { collapse: { addToBottom = true } = {} } } = this.props;
    if (formData.some(v => deepEquals(v, newVal))) {
      return formData;
    } else {
      // newVal can be either array or a single element, concat flattens value
      if (addToBottom) {
        return formData.concat(newVal);
      } else {
        return [newVal].concat(formData);
      }
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
      let {
        schema,
        uiSchema,
        formData,
        registry: { fields },
        formContext
      } = this.props;
      let { collapse: { addTo, addElement } } = uiSchema;

      let fieldSchema =
        addTo === "self"
          ? schema.items
          : schema.properties
            ? schema.properties[addTo] ? schema.properties[addTo].items : null
            : null;
      if (!fieldSchema) {
        return false;
      }
      let fieldUiSchema = addTo === "self" ? uiSchema : uiSchema[addTo];
      let fieldFormData = addTo === "self" ? formData : formData[addTo];

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
              formContext={formContext}
              formData={fieldFormData}
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
      idSchema: { $id } = {},
      name,
      formContext
    } = this.props;
    let { collapsed, AddElement } = this.state;
    let { collapse: { field } } = uiSchema;
    let CollapseElement = fields[field];

    // uischema retains the value for the state
    uiSchema.collapse.collapsed = this.state.collapsed;

    title = uiSchema["ui:title"] ? uiSchema["ui:title"] : title ? title : name;
    let customizedId = collapsed ? $id : undefined;
    return (
      <div id={customizedId}>
        <CollapseMenu
          title={title}
          uiSchema={uiSchema}
          collapsed={collapsed}
          formContext={formContext}
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
        add: PropTypes.string
      }),
      separate: PropTypes.boolean,
      addTo: PropTypes.string,
      addElement: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
      legend: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          component: PropTypes.string.isRequired,
          props: PropTypes.object
        })
      ]),
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          component: PropTypes.string.isRequired,
          props: PropTypes.object
        })
      ),
      wrapClassName: PropTypes.string
    }).isRequired
  }).isRequired,
  registry: PropTypes.shape({
    fields: PropTypes.object.isRequired
  }).isRequired
};

export default CollapsibleField;
