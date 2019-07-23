// import Shortkey from "./shortkey";
import Suggestion from "./Suggestion";

const getDecorators = config => {
  return [
    // new Shortkey(config.mentionClassName).getShortkeyDecorator(),
    new Suggestion(config).getSuggestionDecorator(),
  ];
};

module.exports = getDecorators;
