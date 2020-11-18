import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import Editor from "./modified-draft-rte";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import PropTypes from "prop-types";
import { DefaultLabel } from "./Label";
import KeyDownHandler from "./helpers/event-handler/keyDown";
import selectn from "selectn";
const debounce = require("lodash.debounce");

export function mapFromObject(data, mapping, defVal) {
  return Object.keys(mapping).reduce((agg, field) => {
    let eventField = mapping[field];
    if (typeof eventField === "object") {
      Object.assign(agg, mapFromObject(data[field], mapping, {}));
    } else {
      if (data[eventField]) {
        agg[field] = data[eventField];
      } else {
        agg[field] = eventField;
      }
    }
    return agg;
  }, defVal);
}
/**
 *
 * @param {*} data
 * @param {*} mapping
 * Mapped object is converted to the object mapping takes
 */
export function mapFromSchema(data, mapping) {
  /* if (isEmpty(data)) {
    return;
  } */
  if (!mapping || mapping === null) {
    return data;
  } else if (typeof mapping === mapping) {
    return { [mapping]: data };
  } else if (typeof mapping === "object") {
    return mapFromObject(data, mapping, {});
  } else {
    return data;
  }
}

/**
 *
 * @param {*} data
 * @param {*} mapping
 * prepare the String to display
 */
export function optionToString(fields, separator) {
  return option => {
    return fields
      .map(field => selectn(field, option))
      .filter(fieldVal => fieldVal)
      .reduce((agg, fieldVal, i) => {
        if (i === 0) {
          return fieldVal;
        } else {
          if (Array.isArray(separator)) {
            return `${agg}${separator[i - 1]}${fieldVal}`;
          }
          return `${agg}${separator}${fieldVal}`;
        }
      }, "");
  };
}
/**
 *
 * @param {*} data
 * @param {*} mapping
 * maping the label
 */
export function mapLabelKey(labelKey) {
  if (Array.isArray(labelKey)) {
    return this.optionToString(labelKey, " ");
  } else if (
    typeof labelKey === "object" &&
    labelKey.fields &&
    labelKey.separator
  ) {
    let { fields, separator } = labelKey;
    return optionToString(fields, separator);
  }
  return labelKey;
}

export default class DraftRTE extends Component {
  /**
   *
   * @param {*} props
   * Currently only supports HTML
   */
  constructor(props) {
    super(props);
    let { formData = "", uiSchema } = props;
    let autoFocus = uiSchema["ui:autofocus"] ? uiSchema["ui:autofocus"] : false;

    // Initializing the editor state (ref: https://jpuri.github.io/react-draft-wysiwyg/#/docs)
    const blocksFromHtml = htmlToDraft(formData);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );

    let editorState = null;

    if (autoFocus) {
      editorState = EditorState.moveFocusToEnd(
        EditorState.createWithContent(contentState)
      );
    } else {
      editorState = EditorState.createWithContent(contentState);
    }

    this.state = {
      editorState,
      suggestions: [],
      triggers: [],
    };
  }
  /**
   * updates formData by calling parent's onChange function with current html content
   */
  updateFormData = () => {
    let { onChange } = this.props;
    let { editorState } = this.state; //eslint-disable-line
    if (onChange) {
      onChange(
        draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
      );
    }
  };

  /**
   * handles editor's onChange
   * handles logic to update form data based on props supplied to the component
   */
  onEditorStateChange = editorState => {
    let {
      uiSchema: {
        updateOnBlur = false,
        draftRte: { debounce: { interval, shouldDebounce = false } = {} } = {},
      },
    } = this.props;
    this.setState({ editorState }, () => {
      !updateOnBlur && !shouldDebounce && this.updateFormData();
      if (shouldDebounce && interval) {
        this.handleDebounce();
      }
    });
  };

  handleDebounce = this.props.uiSchema.draftRte
    ? this.props.uiSchema.draftRte.debounce
      ? debounce(
          this.updateFormData,
          this.props.uiSchema.draftRte.debounce.interval
        )
      : () => {}
    : () => {}; //will only be executed if debounce is present

  /**
   * handles the logic to update formData on blur
   */
  handleBlur = () => {
    let { uiSchema: { updateOnBlur = false } } = this.props;
    if (updateOnBlur) {
      this.updateFormData();
    }
  };

  setEditorReference = ref => {
    let autoFocus = this.props.uiSchema["ui:autofocus"]
      ? this.props.uiSchema["ui:autofocus"]
      : false;
    ref && autoFocus && ref.focus();
  };

  /**
   * handles the logic to load the suggestions on the time of focus
   */
  handleOnFocus = () => {
    const { suggestions = [] } = this.state;
    let {
      uiSchema: { draftRte: { enableAutocomplete = false, autocomplete = {} } },
    } = this.props;
    if (!enableAutocomplete) {
      return false;
    }
    if (suggestions.length <= 0) {
      const {
        url,
        shortKeysPath,
        keyToDisplay,
        keyToMaping,
        loadSuggestions = url => fetch(`${url}`).then(res => res.json()),
      } = autocomplete;

      loadSuggestions(url)
        .then(
          json => (shortKeysPath !== "" ? selectn(shortKeysPath, json) : json)
        )
        .then(suggestions => {
          let dynamicSuggestions = []; //
          let dynamicShortkeys = [];
          if (suggestions.length > 0) {
            suggestions.map(item => {
              //Dynamically set theSuggestion Triggers
              //deciding the field name to display on the RTE field
              let labelKey = mapLabelKey(keyToDisplay);
              labelKey =
                typeof labelKey === "function"
                  ? labelKey(item)
                  : item[labelKey];
              //Mapping the needed values with API data
              const mapping = mapFromSchema(item, keyToMaping);
              //collecting the Triigers from the API data
              if (dynamicShortkeys.indexOf(mapping.hotkey) == -1) {
                dynamicShortkeys.push(mapping.hotkey);
              }
              //Consolidating the suggestion
              dynamicSuggestions.push(
                Object.assign({}, mapping, { text: labelKey })
              );
            });
          }
          this.setState({
            suggestions: dynamicSuggestions,
            triggers: dynamicShortkeys,
          });
        });
    }
  };

  /**
   * react render function
   */
  render() {
    const { editorState } = this.state;
    let { uiSchema: { draftRte }, idSchema: { $id } = {} } = this.props;

    return (
      <div id={$id} onKeyDown={KeyDownHandler.onKeyDown}>
        <DefaultLabel {...this.props} />
        <div id="rjfe-draft-rte-wrapper">
          <Editor
            wrapperClassName="draftRte-wrapper"
            editorClassName="draftRte-editor"
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            onBlur={this.handleBlur}
            editorRef={this.setEditorReference}
            spellCheck={true}
            handlePastedText={() => false}
            getEditorState={() => this.state.editorState}
            onFocus={this.handleOnFocus}
            customSuggestions={() => this.state.suggestions}
            customSuggestionTriggers={() => this.state.triggers}
            startingCharacter={this.state.startingCharacter}
            endingCharacter={this.state.endingCharacter}
            placeholderKeyPairs={this.state.placeholderKeyPairs}
            {...draftRte}
          />
        </div>
      </div>
    );
  }
}

DraftRTE.propTypes = {
  uiSchema: PropTypes.shape({
    updateOnBlur: PropTypes.bool,
    draftRte: PropTypes.object,
  }),
};
