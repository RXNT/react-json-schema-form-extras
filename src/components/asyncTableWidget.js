import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DateField from './tableComponents/dateInputField';

class AsyncTableWidget extends React.Component{
  constructor(props){
    super(props);

    this._handleRowDelete = this._handleRowDelete.bind(this);
    this._afterSaveCell = this._afterSaveCell.bind(this);
  }

  _afterSaveCell(row, cellName, cellValue){
    const keyField = this.props.widgetData.keyField;
    const currKey = row[keyField];
    let updatedTable = this.props.formData.slice();

    let i = 0;

    for (let row of updatedTable){
      if (row[keyField] === currKey) {updatedTable[i] = row;}
      i++;
    }

    return updatedTable;
  }

  _handleRowDelete(rowKeys){
    let filteredRows = [];

    for (let row of this.props.formData){
      let flag = true;
      for (let key of rowKeys) {
        if (row[this.props.widgetData.keyField] === key) {flag = false;}
      }
      if (flag) {filteredRows = filteredRows.concat(row);}
    }

    this.props.onChange(filteredRows);
  }

  render() {

    console.log('formData obj in props is: ' + JSON.stringify(this.props.formData));

    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      afterSaveCell: this._afterSaveCell
    };

    const options = {
      handleConfirmDeleteRow: this._deleteConfirmation,
      afterDeleteRow: this._handleRowDelete
    };

    const selectRowProp = {
      mode: 'checkbox'
    };

    const dateEditor = (onUpdate, props) => (<DateField onUpdate={ onUpdate } {...props}/>);


    let configs = Object.assign({}, this.props);

    return (
      <BootstrapTable data={configs.formData} keyField={this.props.widgetData.keyField} cellEdit={cellEditProp} deleteRow={ true } selectRow={ selectRowProp } options={ options }>
        {this.props.widgetData.tableCols.map(function(row, i){
            if (row.customFieldType) {return <TableHeaderColumn dataField={row.field} customEditor={ { getElement: dateEditor } } key={i} editable={true}> {row.displayName} </TableHeaderColumn>;}
            else {return <TableHeaderColumn dataField={row.field} key={i} editable={row.editable}> {row.displayName} </TableHeaderColumn>;}
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
