import { EditorState, Modifier } from "draft-js";
import { getSelectedBlock } from "draftjs-utils";
import htmlToDraft from "html-to-draftjs";
import { List } from "immutable";

export default function addMention(
  editorState,
  onChange,
  separator,
  trigger,
  suggestion,
  startingCharacter,
  endingCharacter,
  placeholderKeyPairs = []
) {
  let { text } = suggestion;
  // Before we start our manipulation to insert this into the editor, lets process our placeholder replacements first.
  let availableReplacements = true;
  let searchStartingIndex = 0;
  while (availableReplacements) {
    let startIndex = 0;
    let endIndex = 0;
    startIndex = text.indexOf(startingCharacter, searchStartingIndex);
    // If we don't even find a starting character, we can just return now.
    if (startIndex === -1) {
      availableReplacements = false;
    }
    endIndex = text.indexOf(endingCharacter, searchStartingIndex);
    // If we don't find an ending character, just return
    if (endIndex === -1) {
      availableReplacements = false;
    }
    // Lets make sure that our endingCharacter is not located before the starting one.
    if (endIndex < startIndex) {
      // If we do find an end character, it could be possible that there is still another valid replacement afterwards.
      // Need to implement logic here to check for that, adjust index to search past inital ending bracket.
      searchStartingIndex = endIndex;
    }

    let textToMatch = text.slice(startIndex + 1, endIndex);
    let fullText = text.slice(startIndex, endIndex + 1);
    //Now that we have the text in our match, lets see if there is a pair for it.
    let matchedReplacement = null;
    placeholderKeyPairs.some(pair => {
      if (pair.match === textToMatch) {
        // match found, return this pair.
        matchedReplacement = pair;
        return true;
      }
    });

    // Let's replace it, and then repeat until we don't find any more matches to replace.
    if (
      matchedReplacement &&
      matchedReplacement !== undefined &&
      matchedReplacement !== null
    ) {
      text = text.replace(fullText, matchedReplacement.replacement);
    } else {
      availableReplacements = false;
    }
  }

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
    focusOffset: focusOffset + separator.length
  });

  let newEditorState = EditorState.acceptSelection(
    editorState,
    updatedSelection
  );
  let contentState = {};
  const contentBlock = htmlToDraft(text);
  if (suggestion.advanced) {
    contentState = editorState.getCurrentContent();
    contentBlock.entityMap.forEach((value, key) => {
      contentState = contentState.mergeEntityData(key, value);
    });
    contentState = Modifier.replaceWithFragment(
      contentState,
      updatedSelection,
      new List(contentBlock.contentBlocks)
    );
  } else {
    contentState = Modifier.replaceText(
      newEditorState.getCurrentContent(),
      updatedSelection,
      `${text}`,
      newEditorState.getCurrentInlineStyle(),
      undefined
    );
  }

  newEditorState = EditorState.push(
    newEditorState,
    contentState,
    "insert-characters"
  );

  if (!spaceAlreadyPresent) {
    // insert a blank space after mention
    if (suggestion.advanced) {
      updatedSelection = newEditorState.getSelection().merge({
        anchorOffset:
          mentionIndex +
          contentBlock.contentBlocks[0].text.length +
          separator.length,
        focusOffset:
          mentionIndex +
          contentBlock.contentBlocks[0].text.length +
          separator.length
      });
    } else {
      updatedSelection = newEditorState.getSelection().merge({
        anchorOffset: mentionIndex + text.length + separator.length,
        focusOffset: mentionIndex + text.length + separator.length
      });
    }
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
