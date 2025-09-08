import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Chip } from "@material-ui/core";
import selectn from "selectn";

/**
 * MultiSelectField - A multi-select dropdown component using MUI Autocomplete with multiple=true.
 * Compatible with react-jsonschema-form
 * Supports both static options and URL-based options
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
    "&::placeholder": {
      color: "#003B5CBF",
      opacity: 1, // Keep placeholder visible
      display: "block" // Ensure placeholder is always displayed
    }
  },
  inputRoot: {
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: "auto",
    margin: 0, // Removed unnecessary margins to prevent extra line
    "& .MuiChip-root": {
      marginTop: 2,
      marginBottom: 2
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
    background: "#00629B",
    color: "#fff",
    fontFamily: "Mulish",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "0.16px"
  },
  chipDeleteIcon: {
    color: "#fff"
  }
};

class MultiSelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      isLoading: false
    };
  }

  componentDidMount() {
    var uiSchema = this.props.uiSchema || {};
    var multiSelectConfig = uiSchema.multiSelect || {};

    // If static options are provided, use them
    if (multiSelectConfig.options) {
      this.setState({ options: multiSelectConfig.options });
    }
    // If URL is provided, fetch options
    else if (multiSelectConfig.url) {
      this.fetchOptions();
    }
  }

  fetchOptions() {
    var uiSchema = this.props.uiSchema || {};
    var multiSelectConfig = uiSchema.multiSelect || {};
    var url = multiSelectConfig.url;
    var optionsPath = multiSelectConfig.optionsPath;

    if (!url) {
      return;
    }

    this.setState({ isLoading: true });

    fetch(url)
      .then(function(res) {
        return res.json();
      })
      .then(function(json) {
        return optionsPath ? selectn(optionsPath, json) : json;
      })
      .then(
        function(options) {
          this.setState({
            options: options || [],
            isLoading: false
          });
        }.bind(this)
      )
      .catch(
        function(error) {
          console.error("Error fetching options:", error);
          this.setState({
            options: [],
            isLoading: false
          });
        }.bind(this)
      );
  }

  getOptionLabel(option) {
    var uiSchema = this.props.uiSchema || {};
    var multiSelectConfig = uiSchema.multiSelect || {};
    var labelKey = multiSelectConfig.labelKey || "label";

    if (typeof option === "string") {
      return option;
    }
    return option[labelKey] || option.label || String(option);
  }

  getOptionValue(option) {
    var uiSchema = this.props.uiSchema || {};
    var multiSelectConfig = uiSchema.multiSelect || {};
    var valueKey = multiSelectConfig.valueKey || "value";

    if (typeof option === "string") {
      return option;
    }
    return option[valueKey] || option.value || String(option);
  }

  getSelectedOptions() {
    var formData = this.props.formData || [];
    var options = this.state.options;
    var selectedOptions = [];

    formData.forEach(
      function(value) {
        var option = options.find(
          function(opt) {
            return String(this.getOptionValue(opt)) === String(value);
          }.bind(this)
        );

        if (option) {
          selectedOptions.push(option);
        } else {
          // If option not found in current options, create a simple string option
          selectedOptions.push(value);
        }
      }.bind(this)
    );

    return selectedOptions;
  }

  handleChange = (event, value) => {
    var newValues = value.map(
      function(option) {
        return String(this.getOptionValue(option));
      }.bind(this)
    );
    this.props.onChange(newValues);
  };

  render() {
    var uiSchema = this.props.uiSchema || {};
    var multiSelectConfig = uiSchema.multiSelect || {};
    var options = this.state.options;
    var label = multiSelectConfig.label;
    var placeholder = multiSelectConfig.placeholder || "Select...";
    var isLoading = this.state.isLoading;
    var selectedOptions = this.getSelectedOptions();

    const { classes } = this.props;
    return React.createElement(Autocomplete, {
      multiple: true,
      options: options,
      value: selectedOptions,
      onChange: this.handleChange,
      getOptionLabel: this.getOptionLabel.bind(this),
      getOptionSelected: function(option, value) {
        return (
          String(this.getOptionValue(option)) ===
          String(this.getOptionValue(value))
        );
      }.bind(this),
      loading: isLoading,
      loadingText: "Loading...",
      noOptionsText: "No options available",
      renderOption: (option, { selected }) => {
        return React.createElement(
          "span",
          {
            style: {
              fontFamily: "Mulish",
              fontWeight: 400,
              fontSize: "1rem",
              letterSpacing: "0.15px",
              color: "#003B5CBF"
            }
          },
          this.getOptionLabel(option)
        );
      },
      renderTags: function(value, getTagProps) {
        return value.map(
          function(option, index) {
            return React.createElement(Chip, {
              ...getTagProps({ index }),
              label: this.getOptionLabel(option),
              size: "small",
              classes: {
                root: classes.chipRoot,
                deleteIcon: classes.chipDeleteIcon
              }
            });
          }.bind(this)
        );
      }.bind(this),
      renderInput: function(params) {
        return React.createElement(TextField, {
          ...params,
          label: label,
          placeholder: placeholder, // Always show placeholder text
          variant: "outlined",
          fullWidth: true,
          InputLabelProps: {
            ...params.InputLabelProps,
            classes: {
              root: classes.inputLabel,
              focused: classes.inputLabelFocused
            }
          },
          inputProps: {
            ...params.inputProps,
            className: classes.inputBase
          },
          InputProps: {
            ...params.InputProps,
            classes: {
              root: classes.inputRoot,
              notchedOutline: classes.notchedOutline,
              adornedEnd: classes.inputIcon,
              adornedStart: classes.inputIcon
            }
          },
          InputAdornmentProps: {
            classes: {
              root: classes.endAdornment
            }
          },
          clearIndicatorProps: {
            classes: {
              root: classes.clearIndicator
            }
          },
          popupIndicatorProps: {
            classes: {
              root: classes.popupIndicator
            }
          }
        });
      }.bind(this)
    });
  }
}

MultiSelectField.propTypes = {
  formData: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  uiSchema: PropTypes.shape({
    multiSelect: PropTypes.shape({
      options: PropTypes.array,
      url: PropTypes.string,
      optionsPath: PropTypes.string,
      labelKey: PropTypes.string,
      valueKey: PropTypes.string,
      label: PropTypes.string,
      placeholder: PropTypes.string
    })
  }),
  schema: PropTypes.object
};

export default withStyles(styles)(MultiSelectField);
