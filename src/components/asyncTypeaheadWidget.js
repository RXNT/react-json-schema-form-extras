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
          labelKey="name"
          minLength={3}
          onSearch={this._handleSearch}
          placeholder="Search..."
          renderMenuItemChildren={this._renderMenuItemChildren}
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

    let asyncRequestObj = {
       method: 'POST',
       mode: 'cors',
       body: {
         test: 'test'
       }
     };

    var asyncRequest = new Request('http://www.mocky.io/v2/595ff1500f0000f00d0eadf0', asyncRequestObj);

    fetch(asyncRequest)
      .then(resp => resp.json())
      .then(json => {this.setState({options: json.ItemList}); });
  }
}

export default AsyncTypeaheadWidget;
