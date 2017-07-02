import React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

class AsyncTypeaheadWidget extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      options: []
    };

    this._renderMenuItemChildren = this._renderMenuItemChildren.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
  }

  render() {
    return (
      <div>
        <AsyncTypeahead
          {...this.state}
          labelKey="login"
          onSearch={this._handleSearch}
          placeholder="Search for a Github user..."
          renderMenuItemChildren={this._renderMenuItemChildren}
        />
      </div>
    );
  }

  _renderMenuItemChildren(option, props, index) {
    return (
      <div key={option.id}>
        <img
          src={option.avatar_url}
          style={{
            height: '24px',
            marginRight: '10px',
            width: '24px',
          }}
        />
        <span>{option.login}</span>
      </div>
    );
  }

  _handleSearch(query) {
    if (!query) {
      return;
    }

    fetch(`https://api.github.com/search/users?q=${query}`)
      .then(resp => resp.json())
      .then(json => this.setState({options: json.items}));
  }
}

export default AsyncTypeaheadWidget;
