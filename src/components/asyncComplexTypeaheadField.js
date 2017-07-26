import React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import AsyncTypeaheadWidget from './asyncTypeaheadWidget';
import AsyncTableWidget from './asyncTableWidget';

class AsyncComplexTypeaheadField extends React.Component{
  constructor(props){
    super(props);

    this._appendToItemList = this._appendToItemList.bind(this);
  }

  render() {
    console.log('full props obj in parent field is: ' + JSON.stringify(this.props, null, '\t'));

    let self = this;
    let configs = Object.assign({}, this.props);
    delete configs.onChange;

    return (
      <div>
        <AsyncTypeaheadWidget
          {...configs}
          onChange={this._appendToItemList}
          widgetData={this.props.data.typeaheadData}
        />
        <AsyncTableWidget
          {...configs}
          onChange={this.props.onChange}
          widgetData={this.props.data.tableData}
        />
      </div>
    );
  }

  _appendToItemList(stringifiedItem){
    let item = JSON.parse(stringifiedItem);
    let tableObject = this.tableObjFactory(this.props.schema);

    tableObject = this.replaceThisMergeWithExternalDef(tableObject, item);
    let newTable = this.props.formData.concat(tableObject);

    this.props.onChange(newTable);
  }

  tableObjFactory(schema){
    let tableCols = {};
    //TODO: define checks or errors around schema format.
    //TODO: currently we assume this is an array with a single object sub-property
    let arrItemSchema = schema.items.properties;

    for (var field in arrItemSchema) {
      if (arrItemSchema.hasOwnProperty(field)) {
        tableCols[field] = "";
      }
    }

    return tableCols;
  }

  //merge data retrieved from an external source into
  //the format used by JSON schema.
  replaceThisMergeWithExternalDef(defaultObj, retrievedData){
    defaultObj.drugName = retrievedData[0].name;
    return defaultObj;
  }
}

export default AsyncComplexTypeaheadField;
