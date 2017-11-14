import React from "react";

export default {
  medications: {
    classNames: "col-md-12",
    "ui:field": "collapsible",
    collapse: {
      field: "table",
      collapsed: false,
      addTo: "self",
      addElement: (schema, uiSchema, onSubmit) => () => (
        <button className="btn" onClick={() => onSubmit({ refills: "20" })}>
          {" "}
          Add new
        </button>
      ),
    },
    "ui:options": {
      label: false,
    },
    table: {
      tableCols: [
        {
          dataField: "drugId",
          hidden: true,
        },
        {
          dataField: "drugName",
          field: "typeahead",
          uiSchema: {
            typeahead: {
              options: [
                {
                  DrugId: 471154,
                  DrugName:
                    "AmLactin Distribution Pack (pramoxine) 1 %-12 % topical kit",
                },
                {
                  DrugId: 471211,
                  DrugName: "AmLactin Distribution Pack 12 %-12 % topical kit",
                },
                {
                  DrugId: 237930,
                  DrugName: "ceftibuten 180 mg/5 mL oral suspension",
                },
                {
                  DrugId: 195800,
                  DrugName: "ceftibuten 400 mg capsule",
                },
                {
                  DrugId: 445980,
                  DrugName: "Child Ibuprofen 100 mg/5 mL oral suspension",
                },
                {
                  DrugId: 273242,
                  DrugName:
                    "Children's Ibu-Drops 50 mg/1.25 mL oral drops,suspension",
                },
                {
                  DrugId: 436727,
                  DrugName: "Children's Ibuprofen 100 mg/5 mL oral suspension",
                },
                {
                  DrugId: 557123,
                  DrugName: "Comfort Pac-Ibuprofen 800 mg kit",
                },
                {
                  DrugId: 219132,
                  DrugName: "dibucaine 1 % topical ointment",
                },
                {
                  DrugId: 292795,
                  DrugName: "dibucaine HCl (bulk) 100 % powder",
                },
                {
                  DrugId: 554201,
                  DrugName: "hydrocodone 10 mg-ibuprofen 200 mg tablet",
                },
                {
                  DrugId: 469644,
                  DrugName: "hydrocodone 5 mg-ibuprofen 200 mg tablet",
                },
                {
                  DrugId: 156812,
                  DrugName: "hydrocodone 7.5 mg-ibuprofen 200 mg tablet",
                },
                {
                  DrugId: 290029,
                  DrugName: "Ibu-Drops 50 mg/1.25 mL oral drops,suspension",
                },
                { DrugId: 554209, DrugName: "Ibudone 10 mg-200 mg tablet" },
                {
                  DrugId: 554208,
                  DrugName: "Ibudone 5 mg-200 mg tablet",
                },
                { DrugId: 227645, DrugName: "ibuprofen (bulk) 100 % powder" },
                {
                  DrugId: 298404,
                  DrugName: "ibuprofen 100 mg chewable tablet",
                },
                { DrugId: 234997, DrugName: "ibuprofen 100 mg tablet" },
                {
                  DrugId: 278995,
                  DrugName: "ibuprofen 100 mg/5 mL oral suspension",
                },
                { DrugId: 182478, DrugName: "ibuprofen 200 mg capsule" },
                {
                  DrugId: 256217,
                  DrugName: "ibuprofen 200 mg tablet",
                },
                { DrugId: 250621, DrugName: "ibuprofen 400 mg tablet" },
                {
                  DrugId: 237650,
                  DrugName: "ibuprofen 50 mg/1.25 mL oral drops,suspension",
                },
                { DrugId: 275877, DrugName: "ibuprofen 600 mg tablet" },
                {
                  DrugId: 173420,
                  DrugName: "ibuprofen 800 mg tablet",
                },
                {
                  DrugId: 449425,
                  DrugName:
                    "Ibuprofen Cold-Sinus (with pseudoephedrine) 30 mg-200 mg tablet",
                },
                {
                  DrugId: 472085,
                  DrugName: "Ibuprofen IB 100 mg chewable tablet",
                },
                {
                  DrugId: 281309,
                  DrugName: "Ibuprofen IB 200 mg tablet",
                },
                {
                  DrugId: 471498,
                  DrugName: "Ibuprofen Jr Strength 100 mg chewable tablet",
                },
                {
                  DrugId: 545552,
                  DrugName:
                    "ibuprofen lysine (PF) 20 mg/2 mL intravenous solution",
                },
                {
                  DrugId: 581894,
                  DrugName: "Ibuprofen PM 200 mg-25 mg capsule",
                },
                {
                  DrugId: 557264,
                  DrugName: "Ibuprofen PM 200 mg-38 mg tablet",
                },
                {
                  DrugId: 550378,
                  DrugName:
                    "ibuprofen-diphenhydramine citrate 200 mg-38 mg tablet",
                },
                {
                  DrugId: 472620,
                  DrugName: "ibuprofen-oxycodone 400 mg-5 mg tablet",
                },
                {
                  DrugId: 281153,
                  DrugName: "ibutilide fumarate 0.1 mg/mL intravenous solution",
                },
                {
                  DrugId: 449511,
                  DrugName:
                    "Infant's Ibuprofen 50 mg/1.25 mL oral drops,suspension",
                },
                {
                  DrugId: 472123,
                  DrugName:
                    "Infants Ibu-Drops 50 mg/1.25 mL oral drops,suspension",
                },
                {
                  DrugId: 454370,
                  DrugName: "squaric acid dibutylest.(bulk) 100 % liquid",
                },
                {
                  DrugId: 185726,
                  DrugName: "squaric acid dibutylester powder",
                },
              ],
              mapping: {
                drugName: "DrugName",
                drugId: "DrugId",
              },
              minLength: 2,
              labelKey: "DrugName",
              bodyContainer: true,
              cleanAfterSelection: true,
            },
          },
        },
        {
          dataField: "dosage",
          className: "col-md-1",
          columnClassName: "col-md-1",
          editColumnClassName: "col-md-1",
        },
        {
          dataField: "quantity",
          className: "col-md-1",
          columnClassName: "col-md-1",
          editColumnClassName: "col-md-1",
        },
        {
          dataField: "unit",
          className: "col-md-1",
          columnClassName: "col-md-1",
          editColumnClassName: "col-md-1",
        },
        {
          dataField: "refills",
          className: "col-md-1",
          columnClassName: "col-md-1",
          editColumnClassName: "col-md-1",
        },
        {
          dataField: "useGeneric",
          className: "col-md-1",
          columnClassName: "col-md-1",
          editColumnClassName: "col-md-1",
        },
      ],
      rightActions: [
        {
          action: "delete",
          className: "col-md-1",
          columnClassName: "col-md-1",
          editColumnClassName: "col-md-1",
          icon: "glyphicon glyphicon-minus",
        },
      ],
    },
  },
  medications_no_active: {
    classNames: "col-md-6",
    nav: ["medications"],
  },
};
