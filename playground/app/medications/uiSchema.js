export default {
  medicationData: {
    "ui:field": "collapsible",
    "ui:order": ["medications_no_active", "medications"],
    "ui:options": {
      label: false
    },
    label: false,
    collapse: {
      collapsibleHeaderElements: {
        className: "header-elements-wrapper",
        elements: ["medications_no_active"]
      },
      field: "ObjectField",
      collapsed: false,
      legend: {
        component: "LanguageLegend"
      },
      actions: [
        {
          component: "Button"
        }
      ],
      addTo: "medications"
    },
    medications_no_active: {
      "ui:widget": "checkbox",
      nav: ["medications"]
    },
    medications: {
      "ui:field": "table",
      "ui:options": {
        label: false
      },
      classNames: "col-md-12",
      table: {
        selectRow: {
          mode: "checkbox",
          clickToSelect: true,
          bgColor: "grey",
          onSelectRow: { fieldToUpdate: "picked" },
          onSelectAllRow: { fieldToUpdate: "picked" }
        },
        focusOnAdd: 1,
        insertRow: true,
        tableCols: [
          {
            dataField: "drugId",
            hidden: true
          },
          {
            dataField: "drugName",
            field: "asyncTypeahead",
            uiSchema: {
              focusOnMount: true,
              asyncTypeahead: {
                url: "https://jsonplaceholder.typicode.com/users",
                bodyContainer: true,
                mapping: {
                  drugName: "name",
                  allergyName: "username"
                },
                labelKey: "name",
                minLength: 2,
                multiple: false
              }
            }
          },
          {
            dataField: "allergyReaction",
            className: "col-md-1",
            columnClassName: "col-md-1",
            editColumnClassName: "col-md-1"
          },
          {
            dataField: "dosage",
            className: "col-md-1",
            columnClassName: "col-md-1",
            editColumnClassName: "col-md-1"
          },
          {
            dataField: "quantity",
            className: "col-md-1",
            columnClassName: "col-md-1",
            editColumnClassName: "col-md-1",
            enableHelpText: true,
            cellCustomEditor: {
              type: "number",
              cellCustomEditorProps: {
                allowDigitAfterDecimal: 3,
                roundDecimal: false,
                maxlength: 10
              },
              editorFieldProps: {
                min: 0.001,
                max: 9999999999,
                style: { display: "inline", width: "100%" }
              }
            }
          },
          {
            dataField: "unit",
            className: "col-md-1",
            columnClassName: "col-md-1",
            editColumnClassName: "col-md-1",
            enableHelpText: true
          },
          {
            dataField: "refills",
            className: "col-md-1",
            columnClassName: "col-md-1",
            editColumnClassName: "col-md-1"
          },
          {
            dataField: "useGeneric",
            className: "col-md-1",
            columnClassName: "col-md-1",
            editColumnClassName: "col-md-1"
          },
          {
            dataField: "startDate",
            dataFormat: "MM/DD/YYYY",
            field: "rdp",
            uiSchema: {
              rdp: {
                placeholder: "MM/DD/YYYY",
                inputProps: {
                  className: "form-control",
                  type: "text"
                }
              }
            },
            defaultCurrentDate: true
          },
          {
            dataField: "isSelected"

            //  filter : { type: 'SelectFilter', options: {true : 'Active', false : 'InActive'}, defaultValue: true }  ,
          }
        ],
        tableConfig: {
          // row, added by manually by external action
          customRowConfiguration: {
            mandatoryField: ["description"],
            action: {
              updateClassNames: {
                // Upadating Class Names for the custom rows
                classToAdd: {
                  classNameToAdd: "disableEdit",
                  columnsToAdd: ["drugName"]
                },
                classToDelete: {
                  classNameToDelete: "DeleteClass",
                  columnsToDelete: []
                },
                validate: {
                  field: "isCustomRow"
                }
              }
            }
          }
        },
        rightActions: [
          {
            action: "update",
            className: "table-action",
            columnClassName: "table-action",
            editColumnClassName: "table-action",
            icon: "glyphicon glyphicon-plus",
            actionConfiguration: {
              action: "update",
              fieldToUpdate: ["isSelected"],
              filterField: "isSelected",
              actionCompletedIcon: "glyphicon glyphicon-refresh",
              actionCompletedClassName: "deleted-row",
              mandatoryField: ["drugName"]
            }
          },
          {
            action: "moveup",
            className: "col-md-1",
            columnClassName: "col-md-1",
            editColumnClassName: "col-md-1",
            icon: "glyphicon glyphicon-arrow-up"
          },
          {
            action: "movedown",
            className: "col-md-1",
            columnClassName: "col-md-1",
            editColumnClassName: "col-md-1",
            icon: "glyphicon glyphicon-arrow-down"
          }
        ]
      }
    }
  },
  allergyData: {
    classNames: "col-md-12",
    nav: "intake",
    "ui:order": [
      "noKnownAllergies",
      "noKnownDrugAllergies",
      "allergies",
      "allergyCategoriesStatic",
      "allergyCategoriesUrlBased"
    ],
    "ui:field": "collapsible",
    noKnownAllergies: {
      classNames: "col-md-6"
    },
    noKnownDrugAllergies: {
      classNames: "col-md-6"
    },
    allergyCategoriesStatic: {
      classNames: "col-md-12",
      "ui:field": "collapsible",
      categories: {
        "ui:field": "multiSelect",
        classNames: "col-md-3",
        multiSelect: {
          options: [
            { label: "Food Allergies", value: "food" },
            { label: "Drug Allergies", value: "drug" },
            { label: "Environmental Allergies", value: "environmental" },
            { label: "Seasonal Allergies", value: "seasonal" },
            { label: "Pet Allergies", value: "pet" },
            { label: "Insect Allergies", value: "insect" }
          ],
          label: "Allergy Categories (Static Options)",
          placeholder: "Select allergy categories..."
        }
      },
      "ui:options": {
        label: false
      },
      collapse: {
        field: "ObjectField",
        collapsed: false,
        actions: [],
        addTo: "categories"
      }
    },
    allergyCategoriesUrlBased: {
      classNames: "col-md-12",
      "ui:field": "collapsible",
      categories: {
        "ui:field": "multiSelect",
        classNames: "col-md-3",
        multiSelect: {
          url: "https://jsonplaceholder.typicode.com/users",
          optionsPath: null,
          labelKey: "name",
          valueKey: "id",
          label: "Allergy Categories (URL-Based)",
          placeholder: "Select allergy categories..."
        }
      },
      "ui:options": {
        label: false
      },
      collapse: {
        field: "ObjectField",
        collapsed: false,
        actions: [],
        addTo: "categories"
      }
    },
    allergies: {
      classNames: "col-md-12",
      "ui:field": "table",
      table: {
        tableCols: [
          {
            dataField: "allergyId",
            hidden: true
          },
          {
            dataField: "allergyName",
            enableHelpText: true

            // hidden : true,
            // filter : { type: 'SelectFilter', options: {true : 'Active', false : 'InActive'}, defaultValue: true }  ,
          },
          {
            dataField: "allergyReaction",
            className: "col-md-1",
            columnClassName: "col-md-1",
            editColumnClassName: "col-md-1"
          },
          {
            dataField: "isSelected"

            // hidden : true,
            // filter : { type: 'SelectFilter', options: {true : 'Active', false : 'InActive'}, defaultValue: true }  ,
          },
          {
            dataField: "allergyActive"
            // hidden : true,
            // filter : { type: 'SelectFilter', options: {true : 'Active', false : 'InActive'}, defaultValue: true }  ,
          },
          {
            dataField: "allergyName",
            field: "asyncTypeahead",
            enableHelpText: true,
            uiSchema: {
              focusOnMount: true,
              asyncTypeahead: {
                url: "https://jsonplaceholder.typicode.com/users",
                bodyContainer: true,
                mapping: {
                  allergyId: "username",
                  allergyName: "name"
                },
                labelKey: "name",
                minLength: 2
              }
            }
          }
        ],
        focusOnAdd: 1,
        rightActions: [
          {
            action: "delete",
            className: "table-action",
            columnClassName: "table-action",
            editColumnClassName: "table-action",
            icon: "glyphicons glyphicons-remove-circle "
          }
        ]
      }
    },
    "ui:options": {
      label: false
    },
    collapse: {
      field: "ObjectField",
      collapsed: false,
      icon: {
        add: "glyphicon glyphicon-plus-sign glyPhiconGreen"
      },
      actions: [],
      addTo: "allergies"
    }
  }
};
