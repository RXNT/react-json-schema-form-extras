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
// Styled components for MUI v5
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
  flex: "1 1 auto",
  minWidth: 0,
  minHeight: "20px",
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
    minHeight: 48,
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    "& .MuiChip-root": {
      marginTop: 2,
      marginBottom: 2
    },
    "& .MuiInputBase-input": {
      paddingTop: 6,
      paddingBottom: 6,
      flex: "1 1 120px",
      minWidth: "120px",
      fontFamily: "Mulish",
      fontWeight: 400,
      letterSpacing: "0.15px",
      fontSize: "16px",
      lineHeight: "12px",
      boxSizing: "border-box",
      color: "#003B5C",
      "&::placeholder": {
        color: "#003B5CBF",
        opacity: 1,
        display: "block"
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
  const [isTyping, setIsTyping] = useState(false);
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

  // Fetch options (debounced)
  const fetchOptions = useCallback(
    query => {
      if (!url || !query.trim()) {
        setOptions([]);
        return;
      }

      setLoading(true);

      // Use custom search function if provided
      const searchFn =
        typeof customSearch === "function" ? customSearch : defaultSearch;

      searchFn(url, query, queryKey)
        .then(data => {
          // Extract options from response
          let newOptions;
          if (optionsPath && typeof optionsPath === "string") {
            newOptions = selectn(optionsPath, data);
            newOptions = Array.isArray(newOptions) ? newOptions : [];
          } else {
            // Expect data to be an array if no optionsPath specified
            newOptions = Array.isArray(data) ? data : [];
          }

          // Transform options using valueKeys
          const valueKeys = multiTypeaheadConfig.valueKeys || ["value"];
          const transformedOptions = newOptions.map(option => {
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
          });

          setOptions(transformedOptions);
        })
        .catch(error => {
          console.error("Error fetching options:", error);
          setOptions([]);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [url, customSearch, queryKey, optionsPath, multiTypeaheadConfig.valueKeys]
  );

  // Debounce the fetch with useEffect
  useEffect(() => {
    if (!url) {
      return;
    }

    // When inputValue changes, user is typing
    if (inputValue.trim()) {
      setIsTyping(true);
      setLoading(false);
    }

    const timeoutId = setTimeout(() => {
      if (inputValue.trim()) {
        setIsTyping(false);
        setLoading(true);
        fetchOptions(inputValue);
      }
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [inputValue, fetchOptions, url]);

  // Initialize options for static data
  useEffect(() => {
    if (staticOptions) {
      // Transform static options using valueKeys immediately
      const valueKeys = multiTypeaheadConfig.valueKeys || ["value"];
      const transformedOptions = staticOptions.map(option => {
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
      });
      setOptions(transformedOptions);
    } else if (url) {
      setOptions([]);
    }
  }, [staticOptions, url, multiTypeaheadConfig.valueKeys]);

  // Common template rendering logic
  const renderTemplate = useCallback((template, obj) => {
    if (!template || typeof template !== "string") {
      return "";
    }
    return template.replace(/\{([^}]+)\}/g, (match, path) => {
      const value = selectn(path, obj);
      return value != null ? String(value) : "";
    });
  }, []);

  // Dropdown label rendering (options are already transformed)
  const getOptionLabel = useCallback(
    option => {
      if (typeof option === "string") {
        return option;
      }

      const template = multiTypeaheadConfig.labelTemplate;
      if (template) {
        return renderTemplate(template, option);
      }
      return "";
    },
    [multiTypeaheadConfig.labelTemplate, renderTemplate]
  );

  const getSelectedOptions = useCallback(() => {
    const selectedOptions = [];

    formData.forEach(value => {
      // For existing formData values, we don't need to find them in current options
      // since they may not be present in current search results
      // Just use the formData value directly for chip display
      selectedOptions.push(value);
    });

    return selectedOptions;
  }, [formData]);

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
      // Option is already transformed, use it directly
      const optionValue = option;

      // Check if already selected by comparing with formData directly
      const isSelected = formData.some(selectedValue => {
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
    [formData, onChange]
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
    // Option is already transformed, use it directly
    const optionValue = option;
    return !formData.some(selectedValue => {
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

  // Show dropdown only if input is not empty or there are options
  // Show dropdown only after typing is finished
  const shouldShowDropdown = isOpen && !isTyping && inputValue.trim();

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
                    // Option is already in transformed format
                    const stableKey =
                      typeof option === "object"
                        ? JSON.stringify(option)
                        : String(option);

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
        {shouldShowDropdown && (
          <StyledDropdown>
            {loading ? (
              <StyledLoadingContainer>
                <CircularProgress size={20} />
                <span style={{ marginLeft: "8px" }}>Loading...</span>
              </StyledLoadingContainer>
            ) : filteredOptions.length === 0 ? (
              <StyledNoOptionsContainer>
                No options available
              </StyledNoOptionsContainer>
            ) : (
              filteredOptions.map((option, index) => (
                <StyledOptionItem
                  key={index}
                  onClick={() => handleOptionClick(option)}
                >
                  {getOptionLabel(option)}
                </StyledOptionItem>
              ))
            )}
          </StyledDropdown>
        )}
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
