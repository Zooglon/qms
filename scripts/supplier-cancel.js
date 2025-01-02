/**
 * Autocomplete function declaration, do not delete
 * @param {import('./__schema__.js').Payload} options
 */
import wixData from "wix-data";

async function getSuppliersCollection(planId) {
    const cn = "SupplierList";
    try {        
        const res = await wixData.query(cn).eq("isActive", true).eq("planId", planId).limit(1).find().then((results) => results.items);
        return res[0]
    } catch (error) {
        console.log(`Error could not find collection ${cn}, details-\n${error}`);
    }
}

export const invoke = async ({ payload }) => {         
    const supplier = await getSuppliersCollection(payload.plan_order_id)
      const uObj = {
        _id: supplier._id,
        isActive: false,
        ...supplier
      };            
      try {
        await wixData.update("SupplierList", uObj);        
        console.log("Supplier plan cancelled successfully", results._id); 
      } catch (error) {
        console.error("Error inserting data:", error);        
      }      

  return {}; // The function must return an empty object
};

