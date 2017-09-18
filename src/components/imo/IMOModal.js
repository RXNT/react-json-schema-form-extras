import React, { Component } from "react";
import LoadingScreen from "./LoadingScreen";

import IMOAPI from "./IMOAPI";

import Error from "./Error";
import SearchField from "./SearchField";
import Modifiers, { ANY_CODE } from "./Modifiers";
import SelectTable from "./SelectTable";
import ReactModal from "react-modal";

const DEFAULT_STATE = {
  isOpen: true,
  isLoading: false,
  isError: false,
  options: [],
  origOptions: [],
  modifiers: [],
};

const IMO_SCHEMA = {
  type: "object",
  properties: {
    description: {
      type: "string",
      title: "Description",
    },
    icd10: {
      type: "string",
      title: "ICD10",
    },
    icd10Description: {
      type: "string",
      title: "ICD10 Description",
    },
    icd9: {
      type: "string",
      title: "ICD9",
    },
    snomed: {
      type: "string",
      title: "SNOMED",
    },
  },
};

class IMOModal extends Component {
  constructor(props) {
    super(props);

    this.api = new IMOAPI();
    this.state = Object.assign({}, DEFAULT_STATE);
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

  handleSearch = query => {
    let { uiSchema: { imo: { problem } } } = this.props;
    this.search(query, problem);
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
        <br />
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
          schema={{ items: IMO_SCHEMA }}
          onRowClick={this.handleRowClick}
        />
      </div>
    );
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false });
    this.props.onChange([]);
  };

  render() {
    let { isOpen } = this.state;
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={this.handleCloseModal}
        contentLabel={"IMO"}>
        {this.modalBody()}
      </ReactModal>
    );
  }
}

export default IMOModal;
