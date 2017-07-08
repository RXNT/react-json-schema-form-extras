import React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

class AsyncTypeaheadWidget extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      options: [],
      selected: []
    };

    this._renderMenuItemChildren = this._renderMenuItemChildren.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
    this._handleSelectionChange = this._handleSelectionChange.bind(this);
  }

  render() {
    return (
      <div>
        <AsyncTypeahead
          selected={this.state.selected}
          options={this.state.options}
          labelKey="name"
          minLength={3}
          onSearch={this._handleSearch}
          placeholder="Search..."
          renderMenuItemChildren={this._renderMenuItemChildren}
          onChange={this._handleSelectionChange}
          multiple={true}
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

  _handleSelectionChange(event){
    if(!event){
      return;
    }

    console.log('event is: ' + JSON.stringify(event, null, '\t'));

    this.props.onChange(JSON.stringify(event));
    this.setState({selected: event});
  }
}

export default AsyncTypeaheadWidget;
