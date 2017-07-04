import React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

class AllergyTypeaheadWidget extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      options: []
    };

    this._renderMenuItemChildren = this._renderMenuItemChildren.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
  }

  render() {
    console.log('rxnt props test: ' + JSON.stringify(this.props.rxntProps));
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

    //Currently on hold until RxNT provides support for CORS (preflighted OPTIONS requests are giving 400s)
    let allergyRequestObj = {
       method: 'POST',
       mode: 'cors',
       headers: new Headers({
         'Content-Type': 'application/json',
         'RequestInfo': this.props.rxntProps.requestInfoHeader
       }),
       body: {
         AllergyName: query,
         DoctorGroupId: this.props.rxntProps.doctorGroupId,
         DoctorCompanyId: this.props.rxntProps.doctorCompanyId,
         Token: this.props.rxntProps.token
       }
     };

    var allergyRequest = new Request('http://devqa.rxnt.com/PatientDashboardApiServices/ehrv8/patientallergies/SearchAllergies', allergyRequestObj);

    fetch(allergyRequest)
      .then(resp => resp.json())
      .then(json => {this.setState({options: json.AllergiesList}); console.log('query executed: ' + query + ' , submitted with token: ' + this.props.rxntProps.token); });
  }
}

export default AllergyTypeaheadWidget;
