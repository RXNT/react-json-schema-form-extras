import React, { useState, useEffect, useCallback, useRef } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
  TextField,
  Chip,
  CircularProgress,
  ClickAwayListener,
  IconButton
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import selectn from "selectn";

// Default search function
function defaultSearch(url, query, queryKey = "query") {
  return fetch(`${url}?${queryKey}=${encodeURIComponent(query)}`).then(res =>
    res.json()
  );
}

/**
 * MultiTypeaheadField - A custom multi-select dropdown component with search capability.
 * Supports both static options and URL-based options with search functionality.
 * Compatible with react-jsonschema-form
 */
// Styled components for MUI v5 - converted from original withStyles
const StyledContainer = styled("div")({
  position: "relative",
  width: "100%"
});

const StyledDropdown = styled("div")({
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
});

const StyledOptionItem = styled("div")({
  padding: "8px 16px",
  cursor: "pointer",
  fontFamily: "Mulish",
  fontWeight: 400,
  lineHeight: "12px",
  letterSpacing: "0.15px",
  color: "#003B5CBF",
  "&:hover": {
    backgroundColor: "#f5f5f5"
  }
});

const StyledLoadingContainer = styled("div")({
  padding: "16px",
  textAlign: "center",
  fontFamily: "Mulish",
  color: "#003B5CBF"
});

const StyledNoOptionsContainer = styled("div")({
  padding: "16px",
  textAlign: "center",
  fontFamily: "Mulish",
  color: "#003B5CBF"
});

const StyledChipContainer = styled("div")({
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
});

const StyledChip = styled(Chip)({
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
  },
  "& .MuiChip-deleteIcon": {
    color: "#fff"
  }
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    paddingTop: 8,
    paddingBottom: 8,
    minHeight: 48, // Ensure consistent height
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
      minWidth: "120px", // Ensure minimum input width
      fontFamily: "Mulish",
      fontWeight: 400,
      letterSpacing: "0.15px",
      fontSize: "16px",
      lineHeight: "12px",
      boxSizing: "border-box", // Ensure consistent box model
      color: "#003B5C", // Set visible text color for user input
      "&::placeholder": {
        color: "#003B5CBF",
        opacity: 1, // Keep placeholder visible
        display: "block" // Ensure placeholder is always displayed
      }
    }
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #DFE6EB !important"
  },
  "& .MuiInputLabel-root": {
    fontFamily: "Mulish",
    fontWeight: 400,
    letterSpacing: "0.15px",
    color: "#003B5CBF",
    "&.Mui-focused": {
      color: "#003B5CBF !important"
    }
  }
});

const StyledClearButton = styled(IconButton)({
  padding: "4px",
  color: "#00629B",
  "&:hover": {
    backgroundColor: "rgba(0, 98, 155, 0.04)"
  }
});

/**
 * MultiTypeaheadField - A custom multi-select dropdown component with search capability.
 * Supports both static options and URL-based options with search functionality.
 * Compatible with react-jsonschema-form and MUI v5
 */
function MultiTypeaheadField(props) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const { uiSchema = {}, formData = [], onChange } = props;
  const multiTypeaheadConfig = uiSchema.multiTypeahead || {};
  const {
    url,
    options: staticOptions,
    search: customSearch,
    queryKey = "query",
    optionsPath
  } = multiTypeaheadConfig;

  // Debounced fetch function
  const fetchOptions = useCallback(
    query => {
      if (!url || !query.trim()) {
        setOptions([]);
        return;
      }

      setLoading(true);

      // Use custom search function if provided, otherwise use defaultSearch
      const searchFn =
        typeof customSearch === "function" ? customSearch : defaultSearch;

      searchFn(url, query, queryKey)
        .then(data => {
          // Extract options from response using optionsPath if provided
          let newOptions;
          if (optionsPath && typeof optionsPath === "string") {
            newOptions = selectn(optionsPath, data);
            newOptions = Array.isArray(newOptions) ? newOptions : [];
          } else {
            // Always expect data to be an array if no optionsPath specified
            newOptions = Array.isArray(data) ? data : [];
          }

          setOptions(newOptions);
        })
        .catch(error => {
          console.error("Error fetching options:", error);
          setOptions([]);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [url, customSearch, queryKey, optionsPath]
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
          // Use the last part of the key chain instead of the full key
          const lastKeyPart = key.split(".").pop();
          valueObj[lastKeyPart] = value;
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

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <StyledContainer ref={containerRef}>
        <StyledTextField
          label={label}
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onClick={handleContainerClick}
          inputRef={inputRef}
          InputProps={{
            startAdornment:
              selectedOptions.length > 0 ? (
                <StyledChipContainer>
                  {selectedOptions.map((option, index) => {
                    // Create a stable key based on the option content
                    const optionValue = getOptionValue(option);
                    const stableKey =
                      typeof optionValue === "object"
                        ? JSON.stringify(optionValue)
                        : String(optionValue);

                    return (
                      <StyledChip
                        key={stableKey}
                        label={getOptionLabel(option)}
                        size="small"
                        onDelete={() => handleChipDelete(index)}
                      />
                    );
                  })}
                </StyledChipContainer>
              ) : null,
            endAdornment: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  flexShrink: 0
                }}
              >
                {loading && !isOpen ? <CircularProgress size={20} /> : null}
                {selectedOptions.length > 0 ? (
                  <StyledClearButton
                    size="small"
                    onClick={handleClearAll}
                    title="Clear all selections"
                  >
                    <ClearIcon fontSize="small" />
                  </StyledClearButton>
                ) : null}
              </div>
            )
          }}
        />

        {/* Dropdown */}
        {isOpen &&
        (filteredOptions.length > 0 || (loading && inputValue.trim())) ? (
          <StyledDropdown>
            {loading && inputValue.trim() ? (
              <StyledLoadingContainer>
                <CircularProgress size={20} />
                <span style={{ marginLeft: "8px" }}>Loading...</span>
              </StyledLoadingContainer>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <StyledOptionItem
                  key={index}
                  onClick={() => handleOptionClick(option)}
                >
                  {getOptionLabel(option)}
                </StyledOptionItem>
              ))
            ) : (
              <StyledNoOptionsContainer>
                No options available
              </StyledNoOptionsContainer>
            )}
          </StyledDropdown>
        ) : null}
      </StyledContainer>
    </ClickAwayListener>
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
      search: PropTypes.func, // Optional custom search function
      queryKey: PropTypes.string, // Optional query parameter key (default: "query")
      optionsPath: PropTypes.string // Optional path to extract options array from API response
    })
  }),
  schema: PropTypes.object
};

export default MultiTypeaheadField;
