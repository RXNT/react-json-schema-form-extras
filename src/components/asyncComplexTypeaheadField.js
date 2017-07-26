import React from 'react';
import AsyncTypeaheadWidget from './asyncTypeaheadWidget';
import AsyncTableWidget from './asyncTableWidget';

class AsyncComplexTypeaheadField extends React.Component{
  constructor(props){
    super(props);

    this._appendToItemList = this._appendToItemList.bind(this);
  }

  render() {
    console.log('full props obj in parent field is: ' + JSON.stringify(this.props, null, '\t'));

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

  //TODO: handle alternate input scenarios.
  _appendToItemList(event){
    let item = event[0];
    let tableObject = this.tableObjFactory(this.props.schema);

    tableObject = this.convertResponseToSchemaFormat(tableObject, item);
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

  //TODO: improve robustness of mapping.
  convertResponseToSchemaFormat(tableObject, item){
    for (var field in item) {
      if (item.hasOwnProperty(field)) {
        let mappedField = this.props.data.typeaheadData.responseSchemaMapping[field];
        if (mappedField) {tableObject[mappedField] = item[field];}
      }
    }

    return tableObject;
  }

}

export default AsyncComplexTypeaheadField;
