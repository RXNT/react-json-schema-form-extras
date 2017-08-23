import React, { Component } from "react";
import LoadingScreen from "./LoadingScreen";

import selectn from "selectn";

import Error from "./Error";
import SearchField from "./SearchField";
import Modifiers, { ANY_CODE } from "./Modifiers";
import SelectTable from "./SelectTable";
import Modal from "react-bootstrap-modal";

const isSelectable = option =>
  option["ALT_LEX_TEXT_IMO_CODE"] === option["IMO_LEXICAL_CODE"];

const parseOption = (json, root, mapping) => {
  let options = selectn(root, json);
  let mappedOptions = options.map(option => {
    let mappedOption = Object.keys(mapping).reduce((agg, field) => {
      let respKey = mapping[field];
      agg[field] = option[respKey];
      return agg;
    }, {});
    mappedOption.selectable = isSelectable(option);
    mappedOption.modifiers = option.Modifiers
      ? option.Modifiers.split(",").map(m => m.trim())
      : [];
    return mappedOption;
  });
  return mappedOptions;
};

const parseModifiers = json => {
  let modifiers = json.ModifierTypeList.map(modifier => {
    let name = modifier.tITLEField;
    let options = modifier.mODIFIERSField.map(option => {
      let code = option.mODIFIER_CODEField;
      let title = option.mODIFIER_TITLEField;
      return { code, title };
    });
    return { name, options };
  });
  return modifiers;
};

const DEFAULT_STATE = {
  isError: false,
  options: [],
  origOptions: [],
  modifiers: [],
};

class IMOModal extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;
  }

  search = (query, { url, root, mapping }) => {
    this.setState({ isLoading: true });
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ SearchQuery: query }),
    })
      .then(resp => resp.json())
      .then(json => parseOption(json, root, mapping))
      .then(options => this.setState({ options, isLoading: false }))
      .catch(err => this.setState({ isError: true, isLoading: false }));
  };

  handleSearch = ({ formData }) => {
    let { uiSchema: { imo: { problem } } } = this.props;
    this.search(formData, problem);
  };

  searchDetails = (code, { url, root, mapping }) => {
    this.setState({ isLoading: true });
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ LexicalItemCode: code }),
    })
      .then(resp => resp.json())
      .then(json => {
        let options = parseOption(json, root, mapping);
        let modifiers = parseModifiers(json);
        this.setState({
          options,
          origOptions: options,
          modifiers,
          isLoading: false,
        });
      })
      .catch(err => this.setState({ isError: true, isLoading: false }));
  };

  handleRowClick = row => {
    if (row.selectable) {
      let { uiSchema: { imo: { detail } } } = this.props;
      this.searchDetails(row.query, detail);
    } else {
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
        {modifiers.length > 0
          ? <Modifiers
              modifiers={modifiers}
              activeModifiers={activeModifiers}
              onChange={this.handleModifiersChange}
            />
          : <div />}
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
        <Modal.Body>
          {this.modalBody()}
        </Modal.Body>
      </div>
    );
  }
}

export default IMOModal;
