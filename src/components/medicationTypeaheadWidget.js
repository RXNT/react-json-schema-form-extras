import React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

class MedicationTypeaheadWidget extends React.Component{
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
          labelKey="DrugId"
          minLength={3}
          onSearch={this._handleSearch}
          placeholder="Search for medicines..."
          renderMenuItemChildren={this._renderMenuItemChildren}
        />
      </div>
    );
  }

  _renderMenuItemChildren(option, props, index) {
    return (
      <div key={option.DrugId}>
        <span>{option.DrugName}</span>
      </div>
    );
  }

  _handleSearch(query) {
    if (!query) {
      return;
    }

    //Currently on hold until RxNT provides support for CORS (preflighted OPTIONS requests are giving 400s)
    let drugRequestObj = {
       method: 'POST',
       mode: 'cors',
       headers: new Headers({
         'Content-Type': 'application/json',
         'RequestInfo': this.props.rxntProps.requestInfoHeader
       }),
       body: {
         Name: query,
         DoctorGroupId: this.props.rxntProps.doctorGroupId,
         DoctorCompanyId: this.props.rxntProps.doctorCompanyId,
         Token: this.props.rxntProps.token
       }
     };

    var drugRequest = new Request('http://devqa.rxnt.com/PatientDashboardApiServices/ehrv8/currentmedications/SearchMedications', drugRequestObj);

    fetch(drugRequest)
      .then(resp => resp.json())
      .then(json => {this.setState({options: json.DrugList}); console.log('query executed: ' + query + ' , submitted with token: ' + this.props.rxntProps.token); });
  }
}

export default MedicationTypeaheadWidget;
