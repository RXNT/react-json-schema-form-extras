import React from "react";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import getShortkeyDecorators from "./helpers/shortkey";
import ModalHandler from "./helpers/event-handler/modals";

export default function(props) {
  let customDecorators = [];
  customDecorators.push(
    ...getShortkeyDecorators({
      separator: "",
      getTriggers: props.customSuggestionTriggers,
      onChange: props.onEditorStateChange,
      getEditorState: props.getEditorState,
      getSuggestions: props.customSuggestions,
      getWrapperRef: () => props.wrapperRef,
      modalHandler: new ModalHandler(),
    })
  );

  return <Editor {...props} customDecorators={customDecorators} />;
}

/* 
function getSuggestions() {
  return [
    { hotkey: "{", phrase: "one", text: "1andone" },
    { hotkey: "{", phrase: "two", text: "2and two" },
    { hotkey: "{", phrase: "three", text: "3" },
    { hotkey: "{", phrase: "four", text: "4" },
    { hotkey: "@", phrase: "one", text: "5and six" },
    { hotkey: "@", phrase: "two", text: "6" },
    { hotkey: "@", phrase: "three", text: "7andtw" },
    { hotkey: "@", phrase: "four", text: "8" },
  ];
} */
