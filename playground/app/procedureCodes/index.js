import schema from "./schema.json";
import uiSchema from "./uiSchema.json";
import rules from "./rules.json";

export default Object.assign({}, schema, uiSchema, rules, {
  formData: {
    procedureCodes: [
      {
        diagnosis: {
          diagnosis_A: {
            code: 1,
            description: "Pain Head"
          },
          diagnosis_B: {
            code: 1,
            description: "Stoelinga-de Koomen-Davis syndrome"
          },
          diagnosis_C: {
            code: 1,
            description: "Stoelinga-de Koomen-Davis "
          },
          diagnosis_D: {
            code: 1,
            description: "Stoelinga-de "
          }
        },
        modifiers: {
          modifier_1: {
            code: 1,
            description: "modifier_1 Pain Back"
          },
          modifier_2: {
            code: 1,
            description: "modifier_2-de Koomen-Davis syndrome"
          },
          modifier_3: {
            code: 1,
            description: "modifier_3-de Koomen-Davis "
          },
          modifier_4: {
            code: 1,
            description: "modifier_4-de "
          }
        },
        advancedInformation: {
          placeOfService: {
            code: 1,
            description: "quis ut nam facilis et officia qui"
          },
          renderingProvider: {
            code: 2,
            description: "voluptas quo tenetur perspiciatis explicabo natus"
          },
          supervisingPhysician: {
            code: 3,
            description: "nam qui rerum fugiat accusamus"
          },
          orderingProvider: {
            code: 5,
            description: "incidunt ut saepe autem"
          },
          referringProvider: {
            code: 7,
            description: "aut quasi autem iste tempore illum possimus"
          },
          purchaseServiceProvider: {
            code: 8,
            description:
              "maiores accusantium architecto necessitatibus reiciendis ea aut"
          },
          toDate: "",
          serviceDate: "2020-01-01"
        },
        code: 1,
        description: "delectus aut autem"
      }
    ]
  }
});
