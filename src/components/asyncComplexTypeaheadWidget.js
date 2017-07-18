import React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import AsyncTypeaheadWidget from './asyncTypeaheadWidget';
import AsyncTableWidget from './asyncTableWidget';

class AsyncComplexTypeaheadWidget extends React.Component{
  constructor(props){
    super(props);
    console.log("tableData is: " + JSON.stringify(this.props.widgetData.tableData));
    this.state = {
      tableData: this.props.widgetData.tableData
    };

    this._appendToItemList = this._appendToItemList.bind(this);
  }

  render() {
    return (
      <div>
        <AsyncTypeaheadWidget
          {...this.props}
          onAddition={this._appendToItemList}
        />
        <AsyncTableWidget
          {...this.props}
          widgetData={this.state.tableData}
        />
      </div>
    );
  }

  _appendToItemList(item){
    let modItemList = this.state.tableData.list;
    let modTableData = this.state.tableData;

    modItemList = modItemList.concat(item);
    modTableData.list = modItemList;

    this.setState({tableData: modTableData});
  }
}

export default AsyncComplexTypeaheadWidget;
