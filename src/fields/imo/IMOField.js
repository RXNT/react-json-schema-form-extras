import React, { Component } from "react";
import IMOModal from "./IMOModal";

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

    this.state = { showModal: false };
  }

  handleAdd = () => {
    this.setState({ showModal: true });
  };

  handleFreeTextAdd = () => {
    this.props.onChange([{}]);
  };

  handleChange = rows => {
    this.props.onChange(rows);
    this.setState({ showModal: false });
  };

  render() {
    let { uiSchema: { imo: { freeText = true } = {} } } = this.props;
    let { showModal } = this.state;
    return (
      <div>
        <div className="btn-group pull-right">
          <AddButton onAdd={this.handleAdd} disabled={showModal} />
          {freeText && (
            <FreeTextButton
              onAdd={this.handleFreeTextAdd}
              disabled={showModal}
            />
          )}
        </div>
        {showModal && <IMOModal {...this.props} onChange={this.handleChange} />}
      </div>
    );
  }
}

export default IMOField;
