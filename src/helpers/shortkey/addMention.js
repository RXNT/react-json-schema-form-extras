import { EditorState, Modifier } from "draft-js";
import { getSelectedBlock } from "draftjs-utils";

export default function addMention(
  editorState: EditorState,
  onChange: Function,
  separator: string,
  trigger: string,
  suggestion: Object
): void {
  const { phrase, text } = suggestion;
  const entityKey = editorState
    .getCurrentContent()
    .createEntity("SHORTKEY", "MUTABLE", {text: text})
    .getLastCreatedEntityKey();
  const selectedBlock = getSelectedBlock(editorState);
  const selectedBlockText = selectedBlock.getText();
  let focusOffset = editorState.getSelection().focusOffset;
  const mentionIndex =
    (selectedBlockText.lastIndexOf(separator + trigger, focusOffset) || 0) + 1;
  let spaceAlreadyPresent = false;
  if (selectedBlockText.length === mentionIndex + 1) {
    focusOffset = selectedBlockText.length;
  }
  if (selectedBlockText[focusOffset] === " ") {
    spaceAlreadyPresent = true;
  }
  let updatedSelection = editorState.getSelection().merge({
    anchorOffset: mentionIndex,
    focusOffset,
  });
  console.log('updatedSelection', updatedSelection)
  let newEditorState = EditorState.acceptSelection(
    editorState,
    updatedSelection
  );
  let contentState = Modifier.replaceText(
    newEditorState.getCurrentContent(),
    updatedSelection,
    `${text}`,
    newEditorState.getCurrentInlineStyle(),
    entityKey
  );
  console.log('text', text)
  newEditorState = EditorState.push(
    newEditorState,
    contentState,
    "insert-characters"
  );

  if (!spaceAlreadyPresent) {
    // insert a blank space after mention
    console.log('phrasae and trigger', phrase, trigger)
    updatedSelection = newEditorState.getSelection().merge({
      
      anchorOffset: mentionIndex + phrase.length + trigger.length,
      focusOffset: mentionIndex + phrase.length + trigger.length,
    });
    newEditorState = EditorState.acceptSelection(
      newEditorState,
      updatedSelection
    );
    contentState = Modifier.insertText(
      newEditorState.getCurrentContent(),
      updatedSelection,
      " ",
      newEditorState.getCurrentInlineStyle(),
      undefined
    );
  }
  onChange(EditorState.push(newEditorState, contentState, "insert-characters"));
}
