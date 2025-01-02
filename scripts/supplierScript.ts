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

export const invoke = async ({ payload }) => {
    // const postCode = payload.contact.address.postalCode
    const postCode = "st16 1ld"    
    // Insert the customer data into our site collection
    // of contact data for plan purchasers
    
    if (/^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i.test(postCode.replace(/\s/g, ""))) {
     const coords = await getPostcodeData(postCode)
      
      if (coords) {     
      const insertObj = {
        supplierName: payload.contact.company ?? `${payload.contact.name.first} ${payload.contact.name.last}`,
        planId: payload.plan_id,
        isActive: true,
        address: payload.contact.address,    
        postcode: postCode,
        longitude: coords.lng,
        latitude: coords.lat,
        subscriptionDate: new Date(payload.plan_start_date).toLocaleDateString('en-GB'),
        subscriptionEndDate: new Date(payload.plan_start_date.replace(/\d\d$/, (Number(payload.plan_start_date.slice(-2)) + 1))).toLocaleDateString('en-GB'),
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

