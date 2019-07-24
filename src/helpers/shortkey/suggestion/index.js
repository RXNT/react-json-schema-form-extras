import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import addMention from "../addMention";
import KeyDownHandler from "../../event-handler/keyDown";
import SuggestionHandler from "../../event-handler/suggestions";
import "./styles.css";

class Suggestion {
  constructor(config) {
    const {
      separator,
      getTriggers,
      getSuggestions,
      onChange,
      getEditorState,
      getWrapperRef,
      caseSensitive,
      dropdownClassName,
      optionClassName = "",
      modalHandler,
    } = config;
    this.config = {
      separator,
      getTriggers,
      getSuggestions,
      onChange,
      getEditorState,
      getWrapperRef,
      caseSensitive,
      dropdownClassName,
      optionClassName,
      modalHandler,
    };
  }

  findSuggestionEntities = (contentBlock, callback) => {
    if (this.config.getEditorState()) {
      const {
        separator,
        getTriggers,
        getSuggestions,
        getEditorState,
      } = this.config;
      const selection = getEditorState().getSelection();
      if (
        selection.get("anchorKey") === contentBlock.get("key") &&
        selection.get("anchorKey") === selection.get("focusKey")
      ) {
        let text = contentBlock.getText();
        text = text.substr(
          0,
          selection.get("focusOffset") === text.length - 1
            ? text.length
            : selection.get("focusOffset") + 1
        );
        //Need to find the latest match with mutiple triggers, then pass that trigger along through.
        let index;
        let currentTrigger;
        getTriggers().some(trigger => {
          currentTrigger = trigger;
          index = text.lastIndexOf(separator + trigger);
          if (index >= 0) {
            return true;
          }
        });
        //let index = text.lastIndexOf(separator + trigger);
        let preText = separator + currentTrigger;
        if ((index === undefined || index < 0) && text[0] === currentTrigger) {
          index = 0;
          preText = currentTrigger;
        }
        if (index >= 0) {
          const mentionText = text.substr(index + preText.length, text.length);
          const suggestionPresent = getSuggestions().some(suggestion => {
            if (suggestion.phrase) {
              if (this.config.caseSensitive) {
                this.config.trigger = currentTrigger;
                return suggestion.phrase.indexOf(mentionText) >= 0;
              }
              this.config.trigger = currentTrigger;
              return (
                suggestion.phrase
                  .toLowerCase()
                  .indexOf(mentionText && mentionText.toLowerCase()) >= 0
              );
            }
            return false;
          });
          if (suggestionPresent) {
            callback(index === 0 ? 0 : index, text.length);
          }
        }
      }
    }
  };

  getSuggestionComponent = getSuggestionComponent.bind(this);

  getSuggestionDecorator = () => ({
    strategy: this.findSuggestionEntities,
    component: this.getSuggestionComponent(),
  });
}

function getSuggestionComponent() {
  const { config } = this;
  return class SuggestionComponent extends Component {
    static propTypes = {
      children: PropTypes.array,
    };

    state: Object = {
      style: { left: 15 },
      activeOption: 0,
      showSuggestions: true,
    };

    componentDidMount() {
      // originally this is gotten from the parent ref. Need to do more research on this.
      let wrapper = document.getElementById("rdw-wrapper-draftRte-wrapper-id");
      const editorRect = wrapper.getBoundingClientRect();
      const suggestionRect = this.suggestion.getBoundingClientRect();
      const dropdownRect = this.dropdown.getBoundingClientRect();
      let left;
      let right;
      let bottom;
      if (
        editorRect.width <
        suggestionRect.left - editorRect.left + dropdownRect.width
      ) {
        right = 15;
      } else {
        left = 15;
      }
      if (editorRect.bottom < dropdownRect.bottom) {
        bottom = 0;
      }
      this.setState({
        // eslint-disable-line react/no-did-mount-set-state
        style: { left, right, bottom },
      });
      KeyDownHandler.registerCallBack(this.onEditorKeyDown);
      SuggestionHandler.open();
      config.modalHandler.setSuggestionCallback(this.closeSuggestionDropdown);
      this.filterSuggestions(this.props);
    }

    componentWillReceiveProps(props) {
      if (this.props.children !== props.children) {
        this.filterSuggestions(props);
        this.setState({
          showSuggestions: true,
        });
      }
    }

    componentWillUnmount() {
      KeyDownHandler.deregisterCallBack(this.onEditorKeyDown);
      SuggestionHandler.close();
      config.modalHandler.removeSuggestionCallback();
    }

    onEditorKeyDown = event => {
      const { activeOption } = this.state;
      const newState = {};
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (activeOption === this.filteredSuggestions.length - 1) {
          newState.activeOption = 0;
        } else {
          newState.activeOption = activeOption + 1;
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (activeOption <= 0) {
          newState.activeOption = this.filteredSuggestions.length - 1;
        } else {
          newState.activeOption = activeOption - 1;
        }
      } else if (event.key === "Escape") {
        newState.showSuggestions = false;
        SuggestionHandler.close();
      } else if (event.key === "Enter") {
        this.addMention();
      } else if (
        event.keyCode === 32 &&
        this.filteredSuggestions.length === 1
      ) {
        this.addMention();
      }
      this.setState(newState);
    };

    onOptionMouseEnter = event => {
      const index = event.target.getAttribute("data-index");
      this.setState({
        activeOption: index,
      });
    };

    onOptionMouseLeave = () => {
      this.setState({
        activeOption: 0,
      });
    };

    setSuggestionReference: Function = (ref: Object): void => {
      this.suggestion = ref;
    };

    setDropdownReference: Function = (ref: Object): void => {
      this.dropdown = ref;
    };

    closeSuggestionDropdown: Function = (): void => {
      this.setState({
        showSuggestions: false,
      });
    };

    filteredSuggestions = [];

    filterSuggestions = props => {
      const separator = config.separator;
      const shortkeyText = props.children[0].props.text.substr(
        separator.length + 1
      );
      const suggestions = config.getSuggestions();
      const trigger = config.trigger;
      this.filteredSuggestions =
        suggestions &&
        suggestions.filter(suggestion => {
          if (!shortkeyText || shortkeyText.length === 0) {
            if (trigger === suggestion.hotkey) {
              return true;
            }
          }
          if (config.caseSensitive) {
            return suggestion.phrase.indexOf(shortkeyText) >= 0;
          }

          if (trigger === suggestion.hotkey) {
            return (
              suggestion.phrase
                .toLowerCase()
                .indexOf(shortkeyText && shortkeyText.toLowerCase()) >= 0
            );
          }
        });
    };

    addMention = () => {
      const { activeOption } = this.state;
      const editorState = config.getEditorState();
      const { onChange, separator, trigger } = config;
      const selectedMention = this.filteredSuggestions[activeOption];
      if (selectedMention) {
        addMention(editorState, onChange, separator, trigger, selectedMention);
      }
    };

    render() {
      const { children } = this.props;
      const { activeOption, showSuggestions } = this.state;
      const { dropdownClassName, optionClassName } = config;
      return (
        <span
          className="rdw-suggestion-wrapper"
          ref={this.setSuggestionReference}
          onClick={config.modalHandler.onSuggestionClick}
          aria-haspopup="true"
          aria-label="rdw-suggestion-popup">
          <span>{children}</span>
          {showSuggestions && (
            <span
              className={classNames(
                "rdw-suggestion-dropdown",
                dropdownClassName
              )}
              contentEditable="false"
              suppressContentEditableWarning
              style={this.state.style}
              ref={this.setDropdownReference}>
              {this.filteredSuggestions.map((suggestion, index) => (
                <span
                  key={index}
                  spellCheck={false}
                  onClick={this.addMention}
                  data-index={index}
                  onMouseEnter={this.onOptionMouseEnter}
                  onMouseLeave={this.onOptionMouseLeave}
                  className={classNames(
                    "rdw-suggestion-option",
                    optionClassName,
                    { "rdw-suggestion-option-active": index == activeOption }
                  )}>
                  {suggestion.phrase}
                  <br />
                  <span style={{ fontSize: "11px" }}>{suggestion.text}</span>
                </span>
              ))}
            </span>
          )}
        </span>
      );
    }
  };
}

module.exports = Suggestion;
