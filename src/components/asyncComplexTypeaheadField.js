import React from 'react';

class AsyncComplexTypeaheadField extends React.Component{
  constructor(props){
    super(props);

  }

  render() {
    let self = this;

    return (
      <div>
        <p> Dummy field, defined inside wrapper. </p>
        <input type="text" />
      </div>
    );
  }
}

export default AsyncComplexTypeaheadField;
