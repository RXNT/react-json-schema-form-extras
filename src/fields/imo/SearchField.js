import React, { Component } from "react";

class SearchField extends Component {
  constructor(props) {
    super(props);

    this.state = { value: "" };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSearch(this.state.value);
  };

  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          value={this.state.value}
          className="form-control"
          placeholder="Search for..."
          onChange={this.handleChange}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-default"
            type="button"
            onClick={this.handleSubmit}>
            Search
          </button>
        </span>
      </div>
    );
  }
}

export default SearchField;
