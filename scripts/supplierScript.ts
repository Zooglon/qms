// Using the incredible open source https://postcodes.io/

/**
 * Autocomplete function declaration, do not delete
 * @param {import('./__schema__.js').Payload} options
 */
import wixData from "wix-data";
import { fetch } from "wix-fetch";


async function getPostcodeData(postcode) {    
    const url = `https://api.postcodes.io/postcodes/${postcode}`;
    const res = fetch(url, { method: "get" }).then((httpResponse) => {
    if (httpResponse.ok) {
      return httpResponse.json();
    } else {
      return Promise.reject("Fetch did not succeed");
    }
  }).then((json) => ({lat: json.result.latitude, lng: json.result.longitude})).catch((err) => console.log(err));

  return res
  }

  const isValidPostcode = (i) =>
    /[a-zA-Z]{1,2}[0-9]{1,2}[a-zA-Z]{0,1} ?[0-9][a-zA-Z]{2}/i.test(i.replace(/\s/g, ""));

export const invoke = async ({ payload }) => {
  console.log("PL", payload)
    const pc = payload.contact.address.postalCode        
    
    if (isValidPostcode(pc)) {
     const coords = await getPostcodeData(pc)
      
      if (coords) {     
      const insertObj = {
        supplierName: payload.contact.company ?? `${payload.contact.name.first} ${payload.contact.name.last}`,
        emailAddress: payload.contact.emailAddres,
        planId: payload.plan_id,
        isActive: true,
        quoteTypesProvided: "",
        address: payload.contact.address,    
        postcode: pc,
        longitude: coords.lng,
        latitude: coords.lat,
        subscriptionDate: new Date(payload.plan_start_date).toLocaleDateString('en-GB'),
        subscriptionEndDate: new Date(payload.plan_start_date.replace(/\d\d$/, (Number(payload.plan_start_date.slice(-2)) + 1))).toLocaleDateString('en-GB'),
        agreesToMarketing: true,
      };      

      try {
        const results = await wixData.insert("SupplierList", insertObj);
        console.log("Supplier plan added successfully", results._id); 
      } catch (error) {
        console.error("Error inserting data:", error);        
      }
      } else {
        console.log("SUPPLIER COORDS VALIDATION FAILED")
      }

  } else {
    console.log("SUPPLIER POSTCODE VALIDATION FAILED")
  }


  return {}; // The function must return an empty object
};

