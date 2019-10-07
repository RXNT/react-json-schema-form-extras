import React from "react";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import getShortkeyDecorators from "./helpers/shortkey";
import ModalHandler from "./helpers/event-handler/modals";

export default function(props) {
  let customDecorators = [];
  customDecorators.push(
    ...getShortkeyDecorators({
      separator: '',
      getTriggers: props.customSuggestionTriggers,
      onChange: props.onEditorStateChange,
      getEditorState: props.getEditorState,
      getSuggestions: props.customSuggestions,
      startingCharacter: props.startingCharacter,
      endingCharacter: props.endingCharacter,
      placeholderKeyPairs: props.placeholderKeyPairs,
      getWrapperRef: () => props.wrapperRef,
      modalHandler: new ModalHandler(),
    })
  );

  return <Editor {...props} customDecorators={customDecorators} />;
}

