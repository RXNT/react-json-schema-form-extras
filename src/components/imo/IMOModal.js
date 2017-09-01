import React, { Component } from "react";
import LoadingScreen from "./LoadingScreen";

import IMOAPI from "./IMOAPI";

import Error from "./Error";
import SearchField from "./SearchField";
import Modifiers, { ANY_CODE } from "./Modifiers";
import SelectTable from "./SelectTable";
import Modal from "react-bootstrap-modal";

const DEFAULT_STATE = {
  isLoading: false,
  isError: false,
  options: [],
  origOptions: [],
  modifiers: [],
};

class IMOModal extends Component {
  constructor(props) {
    super(props);

    this.api = new IMOAPI();
    this.state = DEFAULT_STATE;
  }

  handleError = () => {
    this.setState({ isError: true, isLoading: false });
  };

  search = (query, conf) => {
    this.setState({ isLoading: true });
    this.api
      .search(query, conf)
      .then(options => this.setState({ options, isLoading: false }))
      .catch(this.handleError);
  };

  handleSearch = ({ formData }) => {
    let { uiSchema: { imo: { problem } } } = this.props;
    this.search(formData, problem);
  };

  searchDetails = (code, conf) => {
    this.setState({ isLoading: true });
    this.api
      .searchDetails(code, conf)
      .then(({ options, modifiers }) => {
        this.setState({
          options,
          origOptions: options,
          modifiers,
          isLoading: false,
        });
      })
      .catch(this.handleError);
  };

  handleRowClick = row => {
    if (row.selectable) {
      let { uiSchema: { imo: { detail } } } = this.props;
      this.searchDetails(row.query, detail);
    } else {
      let changedRow = Object.assign(row);
      delete changedRow.selectable;
      delete changedRow.modifiers;
      delete changedRow.query;
      this.props.onChange([row]);
      this.setState(DEFAULT_STATE);
    }
  };

  handleModifiersChange = activeModifiers => {
    let modifiers = Object.keys(activeModifiers)
      .map(field => activeModifiers[field])
      .filter(modifier => modifier !== ANY_CODE);
    let options = this.state.origOptions.filter(option =>
      modifiers.every(modifier => option.modifiers.includes(modifier))
    );
    this.setState({ options, activeModifiers });
  };

  modalBody = () => {
    let {
      isError,
      isLoading,
      options,
      modifiers,
      activeModifiers,
    } = this.state;

    if (isLoading) {
      return <LoadingScreen />;
    }

    if (isError) {
      return <Error />;
    }

    return (
      <div>
        <SearchField onSearch={this.handleSearch} />
        {modifiers.length > 0 ? (
          <Modifiers
            modifiers={modifiers}
            activeModifiers={activeModifiers}
            onChange={this.handleModifiersChange}
          />
        ) : (
          <div />
        )}
        <SelectTable
          data={options}
          schema={this.props.schema}
          onRowClick={this.handleRowClick}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        <Modal.Header>
          <Modal.Title id="ModalHeader">IMO problem search</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.modalBody()}</Modal.Body>
      </div>
    );
  }
}

export default IMOModal;
