import schema from "./schema";
import uiSchema from "./uiSchema";

export default {
  schema,
  uiSchema,
  formData: { medicationData: { medications: [

    {drugName:'test', dosage:'23',unit:'1', drugId :0,refills:'tey', quantity: 21, useGeneric: true, isSelected:false,  },
    { drugId :1,quantity: 22, useGeneric: true, isSelected:true },
    { drugId :3,quantity: 23, useGeneric: true, isSelected:true },
    { drugId :1,quantity: 24,useGeneric: true, isSelected:true }] } },
};
