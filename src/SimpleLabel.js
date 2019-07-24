import React, { Component } from "react";
import renderHTML from "react-render-html";

export default class SimpleLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
    };
  }

  componentDidMount() {
    let { schema: { title }, name } = this.props;

    this.setState({
      label: title ? title : name,
    });
  }

  render() {
    let {
      uiSchema: { simpleLabel: { styles, classNames = "simpleLabel" } = {} },
    } = this.props;
    return (
      <span className={classNames} style={styles}>
        {renderHTML(this.state.label)}
      </span>
    );
  }
}
