let schema = {
  type: "object",
  properties: {
    dateTimePicker: {
      type: "string",
      title: "Date Time Picker",
      format: "date-time",
    },
    datePicker: {
      type: "string",
      title: "Date Picker",
      format: "date",
    },
  },
};

let uiSchema = {
  dateTimePicker: {
    "ui:autofocus": true,
    classNames: "col-md-12",
    "ui:field": "rdp",
    rdp: {
      dayPickerProps: {
        todayButton: "Today",
      },
    },
  },
  datePicker: {
    classNames: "col-md-12",
    "ui:field": "rdp",
    yearStartFrom: 2000,
  },
};

let formData = {
  dateTimePicker: new Date().toISOString(),
  datePicker: "2017-12-20",
};

export default { schema, uiSchema, formData };
