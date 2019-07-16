import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

class Mention {
  constructor(className) {
    this.className = className;
  }
  getMentionComponent = () => {
    const MentionComponent = ({ entityKey, children, contentState }) => {
      const { value } = contentState.getEntity(entityKey).getData();
      return <span>{value}</span>;
    };
    MentionComponent.propTypes = {
      entityKey: PropTypes.number,
      children: PropTypes.array,
      contentState: PropTypes.object,
    };
    return MentionComponent;
  };
  getMentionDecorator = () => ({
    strategy: this.findMentionEntities,
    component: this.getMentionComponent(),
  });
}

Mention.prototype.findMentionEntities = (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "MENTION"
    );
  }, callback);
};

module.exports = Mention;
