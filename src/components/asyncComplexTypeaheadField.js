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

    console.log('item received: ' + stringifiedItem);
    //let newFieldData = this.props.value.concat(item);

    //this.props.onChange(JSON.stringify(newWidgetData));
  }
}

export default AsyncComplexTypeaheadField;
