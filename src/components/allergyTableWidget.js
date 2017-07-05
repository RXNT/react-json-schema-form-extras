import React from 'react';
import {BootstrapTable} from 'react-bootstrap-table';

class AllergyTableWidget extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      allergyList: this.props.rxntProps.allergyList
    };
  }

  render() {
    return (
      <BootstrapTable data={this.state.allergyList}>
        <TableHeaderColumn dataField='name' isKey>Drug Name</TableHeaderColumn>
        <TableHeaderColumn dataField='dosage'>Dosage</TableHeaderColumn>
        <TableHeaderColumn dataField='quantity'>Quantity</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default AllergyTableWidget;
