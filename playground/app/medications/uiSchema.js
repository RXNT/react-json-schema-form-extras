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
                search: (url, query) => {
                  // Enhanced search with query parameters
                  const searchUrl = `${url}?q=${encodeURIComponent(
                    query
                  )}&_limit=10`;
                  return fetch(searchUrl, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json"
                    }
                  }).then(res => res.json());
                },
                bodyContainer: true,
                mapping: {
                  drugName: "name",
                  drugId: "id"
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
      "allergiesGet",
      "allergyCategoriesPost",
      "allergies"
    ],
    "ui:field": "collapsible",
    noKnownAllergies: {
      classNames: "col-md-6"
    },
    noKnownDrugAllergies: {
      classNames: "col-md-6"
    },
    // GET allergies search
    allergiesGet: {
      classNames: "col-md-12",
      "ui:field": "collapsible",
      items: {
        "ui:field": "multiTypeahead",
        classNames: "col-md-6",
        multiTypeahead: {
          url: "https://jsonplaceholder.typicode.com/posts",
          queryKey: "q", // Use "q" instead of default "query"
          search: (url, query, queryKey) => {
            // Search using GET with custom query parameter
            const searchUrl = `${url}?${queryKey}=${encodeURIComponent(
              query
            )}&_limit=10&_sort=title&_order=asc`;

            return fetch(searchUrl, {
              method: "GET",
              headers: { "Content-Type": "application/json" }
            })
              .then(res => res.json())
              .then(posts => {
                // Format posts data as allergies
                return posts.map(post => ({
                  id: `allergy_${post.id}`,
                  title: `${post.title}`,
                  type: "allergy",
                  originalId: post.id,
                  body: post.body,
                  userId: post.userId
                }));
              });
          },
          labelTemplate: "{title}",
          valueKeys: ["id", "title", "type", "originalId"],
          label: "Allergies (GET Search with custom queryKey)",
          placeholder: "Search allergies...",
          minLength: 2
        }
      },
      "ui:options": {
        label: false
      },
      collapse: {
        field: "ObjectField",
        collapsed: false,
        actions: [],
        addTo: "items"
      }
    },
    // POST search using public API
    allergyCategoriesPost: {
      classNames: "col-md-12",
      "ui:field": "collapsible",
      categories: {
        "ui:field": "multiTypeahead",
        classNames: "col-md-6",
        multiTypeahead: {
          url: "https://jsonplaceholder.typicode.com/posts",
          search: (url, query) => {
            // POST request using JSONPlaceholder (public API)
            return fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                title: query,
                body: `Search query for: ${query}`,
                userId: 1
              })
            })
              .then(res => res.json())
              .then(response => {
                // Simulate categories response from POST
                return [
                  {
                    id: response.id || "1",
                    name: `Category for "${query}"`,
                    username: "category_user",
                    email: "category@example.com",
                    phone: "123-456-7890",
                    website: "category.example.com"
                  }
                ];
              });
          },
          labelTemplate: "{name} ({username}) - {email}",
          valueKeys: ["id", "name", "username", "email", "phone", "website"],
          label: "Allergy Categories (POST)",
          placeholder: "Search with POST request...",
          minLength: 2
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
                search: (url, query) => {
                  // GET search only to avoid authorization issues
                  const searchUrl = `${url}?q=${encodeURIComponent(
                    query
                  )}&_limit=10`;
                  return fetch(searchUrl, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json"
                    }
                  }).then(res => res.json());
                },
                bodyContainer: true,
                mapping: {
                  allergyId: "id",
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
