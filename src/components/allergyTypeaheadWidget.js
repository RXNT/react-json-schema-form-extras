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
          filterBy={this.filterByCallback}
          labelKey="AllergyName"
          minLength={3}
          onSearch={this._handleSearch}
          placeholder="Search for allergies..."
          renderMenuItemChildren={this._renderMenuItemChildren}
        />
      </div>
    );
  }

  _renderMenuItemChildren(option, props, index) {
    return (
      <div key={option.AllergyID}>
        <span>{option.AllergyName}</span>
      </div>
    );
  }

  _handleSearch(query) {
    if (!query) {
      return;
    }

    fetch(`http://www.mocky.io/v2/595943b71100002802a6adf4?q=${query}&token=${this.props.token}`)
      .then(resp => resp.json())
      .then(json => {this.setState({options: json.AllergiesList}); console.log('query executed: ' + query + ' , submitted with token: ' + this.props.token); });
  }

  /*
  //ADJUST FILTERING RULES HERE, TO REDUCE API CALLS
  filterByCallback(option, text) {
    return true;
  }
  */
}

export default AsyncTypeaheadWidget;
