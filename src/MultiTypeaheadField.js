import React, { useState, useEffect, useCallback, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  TextField,
  Chip,
  CircularProgress,
  ClickAwayListener,
  IconButton
} from "@material-ui/core";
import { Clear as ClearIcon } from "@material-ui/icons";
import selectn from "selectn";

// Default search function
async function defaultSearch(url, query) {
  const res = await fetch(`${url}?query=${encodeURIComponent(query)}`);
  return await res.json();
}

/**
 * MultiTypeaheadField - A custom multi-select dropdown component with search capability.
 * Supports both static options and URL-based options with search functionality.
 * Compatible with react-jsonschema-form
 */
const styles = {
  "@global": {
    ".MuiAutocomplete-clearIndicator": {
      color: "#00629B !important"
    },
    ".MuiAutocomplete-popupIndicator": {
      color: "#00629B !important"
    }
  },
  endAdornment: {
    color: "#fff"
  },
  clearIndicator: {
    color: "#fff"
  },
  popupIndicator: {
    color: "#fff"
  },
  inputIcon: {
    color: "#fff"
  },
  option: {
    fontFamily: "Mulish",
    fontWeight: 400,
    fontSize: "1rem",
    letterSpacing: "0.15px",
    color: "#003B5CBF"
  },
  inputBase: {
    fontFamily: "Mulish",
    fontWeight: 400,
    fontSize: "1rem",
    letterSpacing: "0.15px",
    lineHeight: "2.2",
    paddingTop: 10,
    paddingBottom: 10,
    boxSizing: "border-box", // Ensure consistent box model
    color: "#003B5C", // Set visible text color for user input
    "&::placeholder": {
      color: "#003B5CBF",
      opacity: 1, // Keep placeholder visible
      display: "block" // Ensure placeholder is always displayed
    }
  },
  inputRoot: {
    paddingTop: 8,
    paddingBottom: 8,
    minHeight: 56, // Ensure consistent height
    alignItems: "center", // Center align for better appearance
    display: "flex", // Ensure flex display
    flexWrap: "wrap", // Allow wrapping when needed
    "& .MuiChip-root": {
      marginTop: 2,
      marginBottom: 2
    },
    "& .MuiInputBase-input": {
      paddingTop: 6,
      paddingBottom: 6,
      flex: "1 1 120px", // Allow input to take remaining space with minimum width
      minWidth: "120px" // Ensure minimum input width
    }
  },
  notchedOutline: {
    border: "1px solid #DFE6EB !important"
  },
  inputLabel: {
    fontFamily: "Mulish",
    fontWeight: 400,
    fontSize: "1rem",
    letterSpacing: "0.15px",
    color: "#003B5CBF"
  },
  inputLabelFocused: {
    color: "#003B5CBF !important"
  },
  chipRoot: {
    background: "#00629B !important",
    color: "#fff !important",
    fontFamily: "Mulish",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "0.16px",
    "&:hover": {
      background: "#00629B !important",
      color: "#fff !important"
    },
    "&:focus": {
      background: "#00629B !important",
      color: "#fff !important"
    },
    "&:active": {
      background: "#00629B !important",
      color: "#fff !important"
    },
    "&.Mui-focusVisible": {
      background: "#00629B !important",
      color: "#fff !important"
    }
  },
  chipDeleteIcon: {
    color: "#fff"
  },
  // Custom dropdown styles
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 1300,
    maxHeight: 200,
    overflow: "auto",
    backgroundColor: "#fff",
    border: "1px solid #DFE6EB",
    borderTop: "none",
    borderRadius: "0 0 4px 4px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  optionItem: {
    padding: "8px 16px",
    cursor: "pointer",
    fontFamily: "Mulish",
    fontWeight: 400,
    fontSize: "1rem",
    letterSpacing: "0.15px",
    color: "#003B5CBF",
    "&:hover": {
      backgroundColor: "#f5f5f5"
    }
  },
  container: {
    position: "relative",
    width: "100%"
  },
  loadingContainer: {
    padding: "16px",
    textAlign: "center",
    fontFamily: "Mulish",
    color: "#003B5CBF"
  },
  noOptionsContainer: {
    padding: "16px",
    textAlign: "center",
    fontFamily: "Mulish",
    color: "#003B5CBF"
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
    alignItems: "center",
    overflow: "hidden",
    flex: "1 1 auto", // Allow container to grow and shrink as needed
    minWidth: 0, // Allow shrinking below content size
    minHeight: "20px", // Reduce minimum height for better alignment
    paddingTop: "2px",
    paddingBottom: "2px"
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%"
  },
  clearButton: {
    padding: "4px",
    color: "#00629B",
    "&:hover": {
      backgroundColor: "rgba(0, 98, 155, 0.04)"
    }
  },
  inputFieldWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: "8px"
  }
};

function MultiTypeaheadField(props) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const { uiSchema = {}, formData = [], onChange, classes } = props;
  const multiTypeaheadConfig = uiSchema.multiTypeahead || {};
  const {
    url,
    options: staticOptions,
    search: customSearch
  } = multiTypeaheadConfig;

  // Debounced fetch function
  const fetchOptions = useCallback(
    async query => {
      if (!url || !query.trim()) {
        setOptions([]);
        return;
      }

      setLoading(true);
      try {
        // Use custom search function if provided, otherwise use defaultSearch
        const searchFn =
          typeof customSearch === "function" ? customSearch : defaultSearch;
        const data = await searchFn(url, query);
        // Always expect data to be an array
        const newOptions = Array.isArray(data) ? data : [];
        setOptions(newOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    },
    [url, customSearch]
  );

  // Debounce the fetch with useEffect
  useEffect(() => {
    if (!url) {
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchOptions(inputValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, fetchOptions, url]);

  // Initialize options for static data
  useEffect(() => {
    if (staticOptions) {
      setOptions(staticOptions);
    } else if (url) {
      setOptions([]);
    }
  }, [staticOptions, url]);

  const getOptionLabel = useCallback(
    option => {
      const labelTemplate = multiTypeaheadConfig.labelTemplate;

      if (typeof option === "string") {
        return option;
      }

      // Always use labelTemplate if provided
      if (labelTemplate && typeof labelTemplate === "string") {
        return labelTemplate.replace(/\{([^}]+)\}/g, (match, path) => {
          const value = selectn(path, option);
          return value != null ? String(value) : "";
        });
      }

      // Fallback to common label fields
      return option.label || option.name || option.title || String(option);
    },
    [multiTypeaheadConfig.labelTemplate]
  );

  const getOptionValue = useCallback(
    option => {
      const valueKeys = multiTypeaheadConfig.valueKeys || ["value"];

      if (typeof option === "string") {
        return option;
      }

      // Always create an object with specified valueKeys
      const valueObj = {};
      valueKeys.forEach(key => {
        const value = selectn(key, option);
        if (value !== undefined) {
          valueObj[key] = value;
        }
      });
      return valueObj;
    },
    [multiTypeaheadConfig.valueKeys]
  );

  const getSelectedOptions = useCallback(() => {
    const selectedOptions = [];

    formData.forEach(value => {
      const option = options.find(opt => {
        const optValue = getOptionValue(opt);

        // Handle object comparison for complex values
        if (typeof value === "object" && typeof optValue === "object") {
          return JSON.stringify(optValue) === JSON.stringify(value);
        }

        // Otherwise do string comparison
        return String(optValue) === String(value);
      });

      if (option) {
        selectedOptions.push(option);
      } else {
        // If option not found in current options, create a representation
        // This ensures selected values persist even when not in current search results
        if (typeof value === "object") {
          // For object values, create a representation that can be displayed
          const label = getOptionLabel(value);
          selectedOptions.push({ ...value, _displayLabel: label });
        } else {
          // For string values, create a simple option object
          selectedOptions.push({ label: String(value), value: value });
        }
      }
    });

    return selectedOptions;
  }, [formData, options, getOptionValue, getOptionLabel]);

  const handleInputChange = useCallback(event => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setIsOpen(true);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClickAway = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOptionClick = useCallback(
    option => {
      const selectedOptions = getSelectedOptions();
      const optionValue = getOptionValue(option);

      // Check if already selected
      const isSelected = selectedOptions.some(selected => {
        const selectedValue = getOptionValue(selected);
        if (
          typeof optionValue === "object" &&
          typeof selectedValue === "object"
        ) {
          return JSON.stringify(optionValue) === JSON.stringify(selectedValue);
        }
        return String(optionValue) === String(selectedValue);
      });

      if (!isSelected) {
        const newValues = [...formData, optionValue];
        onChange(newValues);
      }

      // Clear input and close dropdown
      setInputValue("");
      setIsOpen(false);
    },
    [getSelectedOptions, getOptionValue, formData, onChange]
  );

  const handleChipDelete = useCallback(
    indexToDelete => {
      const newValues = formData.filter((_, index) => index !== indexToDelete);
      onChange(newValues);
    },
    [formData, onChange]
  );

  const handleClearAll = useCallback(() => {
    onChange([]);
  }, [onChange]);

  const handleContainerClick = useCallback(event => {
    // Don't focus if clicking on chips, buttons, or other interactive elements
    if (
      event.target.closest(".MuiChip-root") ||
      event.target.closest(".MuiIconButton-root") ||
      event.target.closest("input")
    ) {
      return;
    }

    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus();
      setIsOpen(true);
    }
  }, []);

  const selectedOptions = getSelectedOptions();

  // Filter options to show
  let filteredOptions = options;
  if (!url && inputValue.trim()) {
    // For static options, filter locally
    filteredOptions = options.filter(option => {
      const label = getOptionLabel(option).toLowerCase();
      return label.includes(inputValue.toLowerCase());
    });
  }

  // Remove already selected options from dropdown
  filteredOptions = filteredOptions.filter(option => {
    const optionValue = getOptionValue(option);
    return !selectedOptions.some(selected => {
      const selectedValue = getOptionValue(selected);
      if (
        typeof optionValue === "object" &&
        typeof selectedValue === "object"
      ) {
        return JSON.stringify(optionValue) === JSON.stringify(selectedValue);
      }
      return String(optionValue) === String(selectedValue);
    });
  });

  const label = multiTypeaheadConfig.label;
  const placeholder = multiTypeaheadConfig.placeholder || "Select...";

  return React.createElement(
    ClickAwayListener,
    { onClickAway: handleClickAway },
    React.createElement(
      "div",
      { className: classes.container, ref: containerRef },
      React.createElement(TextField, {
        label: label,
        placeholder: placeholder,
        variant: "outlined",
        fullWidth: true,
        value: inputValue,
        onChange: handleInputChange,
        onFocus: handleInputFocus,
        onClick: handleContainerClick,
        inputRef: inputRef,
        InputLabelProps: {
          classes: {
            root: classes.inputLabel,
            focused: classes.inputLabelFocused
          }
        },
        inputProps: {
          className: classes.inputBase
        },
        InputProps: {
          classes: {
            root: classes.inputRoot,
            notchedOutline: classes.notchedOutline
          },
          startAdornment:
            selectedOptions.length > 0
              ? React.createElement(
                  "div",
                  { className: classes.chipContainer },
                  selectedOptions.map((option, index) => {
                    // Create a stable key based on the option content
                    const optionValue = getOptionValue(option);
                    const stableKey =
                      typeof optionValue === "object"
                        ? JSON.stringify(optionValue)
                        : String(optionValue);

                    return React.createElement(Chip, {
                      key: stableKey,
                      label: getOptionLabel(option),
                      size: "small",
                      onDelete: () => handleChipDelete(index),
                      classes: {
                        root: classes.chipRoot,
                        deleteIcon: classes.chipDeleteIcon
                      }
                    });
                  })
                )
              : null,
          endAdornment: React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "4px",
                flexShrink: 0 // Prevent shrinking
              }
            },
            loading && !isOpen
              ? React.createElement(CircularProgress, { size: 20 })
              : null,
            selectedOptions.length > 0
              ? React.createElement(
                  IconButton,
                  {
                    size: "small",
                    onClick: handleClearAll,
                    className: classes.clearButton,
                    title: "Clear all selections"
                  },
                  React.createElement(ClearIcon, { fontSize: "small" })
                )
              : null
          )
        }
      }),

      // Dropdown
      isOpen && (filteredOptions.length > 0 || (loading && inputValue.trim()))
        ? React.createElement(
            "div",
            { className: classes.dropdown },
            loading && inputValue.trim()
              ? React.createElement(
                  "div",
                  { className: classes.loadingContainer },
                  React.createElement(CircularProgress, { size: 20 }),
                  React.createElement(
                    "span",
                    { style: { marginLeft: "8px" } },
                    "Loading..."
                  )
                )
              : filteredOptions.length > 0
              ? filteredOptions.map((option, index) =>
                  React.createElement(
                    "div",
                    {
                      key: index,
                      className: classes.optionItem,
                      onClick: () => handleOptionClick(option)
                    },
                    getOptionLabel(option)
                  )
                )
              : React.createElement(
                  "div",
                  { className: classes.noOptionsContainer },
                  "No options available"
                )
          )
        : null
    )
  );
}

MultiTypeaheadField.propTypes = {
  formData: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  uiSchema: PropTypes.shape({
    multiTypeahead: PropTypes.shape({
      url: PropTypes.string, // URL for API-based options
      options: PropTypes.array, // Static options alternative to URL
      labelTemplate: PropTypes.string,
      valueKeys: PropTypes.array,
      label: PropTypes.string,
      placeholder: PropTypes.string,
      search: PropTypes.func // Optional custom search function
    })
  }),
  schema: PropTypes.object
};

export default withStyles(styles)(MultiTypeaheadField);
