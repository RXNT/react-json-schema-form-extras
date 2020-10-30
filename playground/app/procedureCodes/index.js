import schema from "./schema.json";
import uiSchema from "./uiSchema.json";

export default Object.assign({}, schema, uiSchema, {
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
          diagnosis_A: {
            code: 1,
            description: "Pain Back"
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
