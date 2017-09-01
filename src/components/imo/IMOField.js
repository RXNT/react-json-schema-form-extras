import React, { Component } from "react";
import IMOModal from "./IMOModal";
import Modal from "react-bootstrap-modal";

const AddButton = ({ onAdd }) => (
  <div className="btn btn-success btn-sm" onClick={onAdd}>
    <i className="glyphicon glyphicon-plus" /> Add
  </div>
);

const FreeTextButton = ({ onAdd }) => (
  <a className="btn btn-success btn-sm" onClick={onAdd}>
    <i className="glyphicon glyphicon-list-alt" /> Free text
  </a>
);

class IMOField extends Component {
  constructor(props) {
    super(props);

    this.state = { showAdd: true };
  }

  handleAdd = () => {
    this.setState({ showAdd: false });
  };

  handleFreeTextAdd = () => {
    this.props.onChange([{}]);
  };

  handleChange = rows => {
    this.props.onChange(rows);
    this.setState({ showAdd: true });
  };

  render() {
    let { showAdd } = this.state;

    return (
      <div>
        <div className="btn-group pull-right">
          <AddButton onAdd={this.handleAdd} disabled={!showAdd} />
          <FreeTextButton onAdd={this.handleFreeTextAdd} disabled={!showAdd} />
        </div>
        <Modal show={!showAdd} onHide={() => this.setState({ showAdd: true })}>
          <IMOModal {...this.props} onChange={this.handleChange} />
        </Modal>
      </div>
    );
  }
}

export default IMOField;
