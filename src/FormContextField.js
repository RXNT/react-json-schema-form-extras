import React, { Component } from "react";

export default class FormContextField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { formContext, uiSchema: { actions } } = this.props;
    const Component = formContext["allActions"][actions[0].component];

    return (
      <div>
          <Component {...this.props} />
      </div>
    );
  }
}
