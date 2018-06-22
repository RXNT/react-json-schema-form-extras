import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import PropTypes from "prop-types";
import _ from "lodash";
import { DefaultLabel } from "./Label";

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
      entityMap,
    );

    let editorState = null;

    if (autoFocus) {
      editorState = EditorState.moveFocusToEnd(EditorState.createWithContent(contentState));
    } else {
      editorState = EditorState.createWithContent(contentState);
    }

    this.state = {
      editorState,
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
      ? _.debounce(
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
   * react render function
   */
  render() {
    const { editorState } = this.state;
    let { uiSchema: { draftRte }, idSchema: { $id } = {} } = this.props;

    return (
      <div id={$id}>
        <DefaultLabel {...this.props} />
        <Editor
          wrapperClassName="draftRte-wrapper"
          editorClassName="draftRte-editor"
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          onBlur={this.handleBlur}
          editorRef={this.setEditorReference}
          handlePastedText={() => false}
          {...draftRte}
        />
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
