import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

class AsyncTypeaheadWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };

    this._renderMenuItemChildren = this._renderMenuItemChildren.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
    this._handleSelectionChange = this._handleSelectionChange.bind(this);
  }

  render() {
    return (
      <div>
        <AsyncTypeahead
          required={this.props.required}
          options={this.state.options}
          labelKey="name"
          minLength={3}
          onSearch={this._handleSearch}
          placeholder="Search..."
          renderMenuItemChildren={this._renderMenuItemChildren}
          onChange={this._handleSelectionChange}
          ref="typeahead"
        />
      </div>
    );
  }

  _renderMenuItemChildren(option, props, index) {
    return (
      <div key={option.key}>
        <span>{option.name}</span>
      </div>
    );
  }

  _handleSearch(query) {
    if (!query) {
      return;
    }

    let authObj = {
      DoctorCompanyId: window.encounterTemplateV2User.DoctorCompanyId,
      Token: window.encounterTemplateV2User.AppLoginTokens[0].Token,
    };

    let body = Object.assign(authObj, { Name: query });
    let asyncRequestObj = {
      method: "POST",
      headers: {
        RequestInfo: `TestUser#TestPass#${authObj.DoctorCompanyId}##${authObj.Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch(this.props.widgetData.queryURL, asyncRequestObj)
      .then(resp => resp.json())
      .then(json => {
        this.setState({ options: json.ItemList });
      });
  }

  _handleSelectionChange(event) {
    if (!event) {
      return;
    }

    if (event.length > 0) {
      this.props.onChange(event);
    }

    this.refs.typeahead.getInstance().clear();
  }
}

export default AsyncTypeaheadWidget;
