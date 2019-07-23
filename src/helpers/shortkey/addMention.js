import { EditorState, Modifier } from "draft-js";
import { getSelectedBlock } from "draftjs-utils";

export default function addMention(
  editorState: EditorState,
  onChange: Function,
  separator: string,
  trigger: string,
  suggestion: Object
): void {
  const { text } = suggestion;
  // const entityKey = editorState
  //   .getCurrentContent()
  //   .createEntity("SHORTKEYS", "MUTABLE", { text: text })
  //   .getLastCreatedEntityKey();
  const selectedBlock = getSelectedBlock(editorState);
  const selectedBlockText = selectedBlock.getText();
  let focusOffset = editorState.getSelection().focusOffset;
  const mentionIndex =
    selectedBlockText.lastIndexOf(separator + trigger, focusOffset) || 0;
  let spaceAlreadyPresent = false;
  if (selectedBlockText.length === mentionIndex + 1) {
    focusOffset = selectedBlockText.length;
  }
  if (selectedBlockText[focusOffset] === " ") {
    spaceAlreadyPresent = true;
  }
  let updatedSelection = editorState.getSelection().merge({
    anchorOffset: mentionIndex + separator.length,
    focusOffset: focusOffset + separator.length,
  });

  let newEditorState = EditorState.acceptSelection(
    editorState,
    updatedSelection
  );
  let contentState = Modifier.replaceText(
    newEditorState.getCurrentContent(),
    updatedSelection,
    `${text}`,
    newEditorState.getCurrentInlineStyle(),
    undefined
  );
  newEditorState = EditorState.push(
    newEditorState,
    contentState,
    "insert-characters"
  );

  if (!spaceAlreadyPresent) {
    // insert a blank space after mention
    updatedSelection = newEditorState.getSelection().merge({
      anchorOffset: mentionIndex + text.length + separator.length,
      focusOffset: mentionIndex + text.length + separator.length,
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
