import React from "react";
import PropTypes from "prop-types";

class Shortkey {
  constructor(className) {
    this.className = className;
  }
  getShortkeyComponent = () => {
    const ShortkeyComponent = ({ entityKey, children, contentState }) => {
      // const { text } = contentState.getEntity(entityKey).getData();
      return <span>{children}</span>;
    };
    ShortkeyComponent.propTypes = {
      entityKey: PropTypes.number,
      children: PropTypes.array,
      contentState: PropTypes.object,
    };
    return ShortkeyComponent;
  };
  getShortkeyDecorator = () => ({
    strategy: this.findShortkeyEntities,
    component: this.getShortkeyComponent(),
  });
}

Shortkey.prototype.findShortkeyEntities = (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "SHORTKEY"
    );
  }, callback);
};

module.exports = Shortkey;
