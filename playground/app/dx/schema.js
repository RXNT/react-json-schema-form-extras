export default {
  type: "object",
  properties: {
    diagnosis: {
      type: "array",
      title: "Diagnosis",
      default: [],
      items: {
        type: "object",
        properties: {
          description: {
            type: "string",
            title: "Description",
          },
          icd10: {
            type: "string",
            title: "ICD10-CM",
          },
          icd9: {
            type: "string",
            title: "ICD9-CM",
          },
          onSetDat: {
            type: "date",
            title: "Onset Date",
          },
          status: {
            title: "Status",
            type: "string",
            enum: [
              "notIndicated",
              "inActive",
              "active",
              "resolved",
              "chronic",
              "intermittent",
              "recurrent",
              "ruleOut",
              "ruledOut",
            ],
            enumNames: [
              "Not Indicated",
              "In-Active",
              "Active",
              "Resolved",
              "Chronic",
              "Intermittent",
              "Recurrent",
              "Rule Out",
              "Ruled Out",
            ],
          },
          statusDate: {
            type: "date",
            title: "Status Date",
          },
          type: {
            title: "Type",
            type: "string",
            enum: [
              "diagnosis",
              "admitting",
              "final",
              "working",
              "condition",
              "symptom",
              "finding",
              "complaint",
              "functionalLimitation",
              "problem",
            ],
            enumNames: [
              "Diagnosis",
              "Admitting",
              "Final",
              "Working",
              "Condition",
              "Symptom",
              "Finding",
              "Complaint",
              "Functional Limitation",
              "Problem",
            ],
          },
          diagnosedDate: {
            type: "date",
            title: "Date Diagnosed",
          },
          severity: {
            type: "string",
            title: "Severity",
          },
        },
      },
    },
  },
};
