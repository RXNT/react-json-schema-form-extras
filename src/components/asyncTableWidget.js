import React from 'react';
import {BootstrapTable} from 'react-bootstrap-table';

class AsyncTableWidget extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: props.widgetData.list
    };


  }

  componentWillMount(){
    this.props.onChange(JSON.stringify(this.state.list));
  }

  render() {
    return (
      <BootstrapTable data={this.state.list}>
        <TableHeaderColumn dataField='col1' isKey>Col 1</TableHeaderColumn>
        <TableHeaderColumn dataField='col2'>Col 2</TableHeaderColumn>
        <TableHeaderColumn dataField='col3'>Col 3</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default AsyncTableWidget;
