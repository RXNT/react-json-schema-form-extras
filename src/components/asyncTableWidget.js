import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import DateField from './tableComponents/dateInputField';

class AsyncTableWidget extends React.Component{
  constructor(props){
    super(props);

  }

  componentWillMount(){
    this.props.onChange(JSON.stringify(this.props.widgetData));
  }

  render() {
    const cellEditProp = {
      mode: 'click',
      blurToSave: true
    };

    const options = {
      handleConfirmDeleteRow: this._deleteConfirmation
    };

    const selectRowProp = {
      mode: 'checkbox'
    };

    const dateEditor = (onUpdate, props) => (<DateField onUpdate={ onUpdate } {...props}/>);

    console.log('widget data is: ' + JSON.stringify(this.props.widgetData));

    return (
      <BootstrapTable data={this.props.widgetData.list} keyField={this.props.widgetData.keyField} cellEdit={cellEditProp} deleteRow={ true } selectRow={ selectRowProp } options={ options }>
        {this.props.widgetData.tableCols.map(function(row, i){
            if(row.customFieldType) return <TableHeaderColumn dataField={row.field} customEditor={ { getElement: dateEditor } } key={i} editable={true}> {row.displayName} </TableHeaderColumn>;
            else return <TableHeaderColumn dataField={row.field} key={i} editable={row.editable}> {row.displayName} </TableHeaderColumn>;
        })}
      </BootstrapTable>
    );
  }

  _deleteConfirmation(next, dropRowKeys) {
    const dropRowKeysStr = dropRowKeys.join(',');
    if (confirm(`Are you sure you want to delete ${dropRowKeysStr}?`)) {
      next();
    }
  }
}

export default AsyncTableWidget;
