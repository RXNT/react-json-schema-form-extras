export default function goalsField() {
  let schema = {
    type: "object",
    properties: {
      rte: {
        type: "string",
        title: "RTE",
        default: "<p><br></p>",
      },
      draftRte: {
        type: "string",
        title: "Draft RTE",
        default: "<p>Lets see if this works</p>",
      },
    },
  };

  let uiSchema = {
    rte: {
      updateOnBlur: true,
      "ui:field": "collapsible",
      collapse: {
        field: "rte",
        collapsed: true,
      },
      "ui:autofocus": true,
      classNames: "col-md-12",
    },
    draftRte: {
      updateOnBlur: true,
      "ui:field": "collapsible",
      collapse: {
        field: "draftRte",
        collapsed: false,
        collapseDivStyles: {
          textColor: "white",
          background: "linear-gradient(to right, blue, black)",
        },
      },
      draftRte: {
        debounce: { interval: 600, shouldDebounce: true },
        toolbar: {
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "colorPicker",
            "link",
            "history",
          ],
          inline: {
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
            ],
          },
        },
        enableAutocomplete: true,
        autocomplete: {
          url: "https://jsonplaceholder.typicode.com/users",
          separator: "",
          keyToMaping: { hotkey: "@", phrase: "name" },
          keyToDisplay: "phone",
          shortKeysPath: "",
        },
      },
      "ui:autofocus": true,
      classNames: "col-md-12",
    },
    draftRte1: {
      updateOnBlur: true,
      "ui:field": "collapsible",
      collapse: {
        field: "draftRte",
        collapsed: false,
        collapseDivStyles: {
          textColor: "white",
          background: "linear-gradient(to right, blue, black)",
        },
      },
      draftRte: {
        debounce: { interval: 600, shouldDebounce: true },
        toolbar: {
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "colorPicker",
            "link",
            "history",
          ],
          inline: {
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
            ],
          },
        },
      },
      "ui:autofocus": true,
      classNames: "col-md-12",
    },
  };

  let formData = {
    rte: "This must <b>be rendered</b>",
  };

  return { schema, uiSchema, formData };
}
