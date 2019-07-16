import React from "react";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import getMentionDecorators from "./helpers/mention";
import ModalHandler from "./helpers/event-handler/modals";

export default function(props) {
  let customDecorators = [];
  customDecorators.push(
    ...getMentionDecorators({
      // ...props.mention,
      separator: " ",
      trigger: "@",
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
    { text: "APPLE", value: "apple", url: "apple" },
    { text: "BANANA", value: "banana", url: "banana" },
    { text: "CHERRY", value: "cherry", url: "cherry" },
    { text: "DURIAN", value: "durian", url: "durian" },
    { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
    { text: "FIG", value: "fig", url: "fig" },
    { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
    { text: "HONEYDEW", value: "honeydew", url: "honeydew" },
  ];
}
