import React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import AsyncTypeaheadWidget from './asyncTypeaheadWidget';
import AsyncTableWidget from './asyncTableWidget';

class AsyncComplexTypeaheadWidget extends React.Component{
  constructor(props){
    super(props);

    this._appendToItemList = this._appendToItemList.bind(this);
  }

  render() {
    let self = this;
    let configs = Object.assign({}, this.props);
    delete configs.onChange;

    console.log('re-rendering complex widget, props: ' + JSON.stringify(this.props.widgetData.tableData));
    return (
      <div>
        <AsyncTypeaheadWidget
          {...configs}
          onChange={this._appendToItemList}
        />
        <AsyncTableWidget
          {...configs}
          onChange={this.props.onChange}
          widgetData={this.props.widgetData.tableData}
        />
      </div>
    );
  }

  _appendToItemList(stringifiedItem){
    let item = JSON.parse(stringifiedItem);

    let newWidgetData = this.props.widgetData.tableData;
    newWidgetData.list = newWidgetData.list.concat(item);

    this.props.onChange(JSON.stringify(newWidgetData));
  }
}

export default AsyncComplexTypeaheadWidget;
