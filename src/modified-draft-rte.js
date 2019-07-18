import React from "react";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import getShortkeyDecorators from "./helpers/shortkey";
import ModalHandler from "./helpers/event-handler/modals";

export default function(props) {
  let customDecorators = [];
  customDecorators.push(
    ...getShortkeyDecorators({
      // ...props.mention,
      separator: "",
      triggers: ["@", "{"],
      onChange: props.onEditorStateChange,
      getEditorState: props.getEditorState,
      getSuggestions: getSuggestions,
      getWrapperRef: () => props.wrapperRef,
      modalHandler: new ModalHandler(),
    })
  );

  return <Editor {...props} customDecorators={customDecorators} />;
}

function getSuggestions() {
  return [
    { hotkey: "{", phrase: "one", text: "1" },
    { hotkey: "{", phrase: "two", text: "2" },
    { hotkey: "{", phrase: "three", text: "3" },
    { hotkey: "{", phrase: "four", text: "4" },
    { hotkey: "@", phrase: "one", text: "5" },
    { hotkey: "@", phrase: "two", text: "6" },
    { hotkey: "@", phrase: "three", text: "7" },
    { hotkey: "@", phrase: "four", text: "8" },
  ];
}
