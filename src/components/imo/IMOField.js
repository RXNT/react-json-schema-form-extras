import React, { Component } from "react";
import IMOModal from "./IMOModal";
import Modal from "react-bootstrap-modal";

const AddButton = ({ onAdd }) =>
  <div className="btn btn-default" onClick={onAdd}>
    Add
  </div>;

class IMOField extends Component {
  constructor(props) {
    super(props);

    this.state = { showAdd: true };
  }

  handleAdd = () => {
    this.setState({ showAdd: false });
  };

  handleChange = rows => {
    this.props.onChange(rows);
    this.setState({ showAdd: true });
  };

  render() {
    let { showAdd } = this.state;

    return (
      <div>
        <AddButton onAdd={this.handleAdd} disabled={!showAdd} />
        <Modal show={!showAdd} onHide={() => this.setState({ showAdd: true })}>
          <IMOModal {...this.props} onChange={this.handleChange} />
        </Modal>
      </div>
    );
  }
}

export default IMOField;
