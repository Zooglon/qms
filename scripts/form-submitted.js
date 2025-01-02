/**
 * Autocomplete function declaration, do not delete
 * @param {import('./__schema__.js').Payload} options
 */

import { fetch } from "wix-fetch";
import wixData from "wix-data";
import { collections } from "wix-data.v2";


async function getSuppliersCollection() {
    const cn = "SupplierList"

    try {
        // const retrievedCollection = await collections.getDataCollection(cn);
        const retrievedCollection = await wixData
        .query(cn)
        .find()
        .then((results) => results.items);
        return retrievedCollection;
    } catch (error) {
        console.log(`Error could not find collection ${cn}, details-\n${error}`)
    }
}

async function getPostcodeData(postcode) {
    const url = `https://api.postcodes.io/postcodes/${postcode}`;
    const res = fetch(url, { method: "get" }).then((httpResponse) => {
        if (httpResponse.ok) {
            return httpResponse.json();
        } else {
            return Promise.reject("Error, failed to fetched valid postcode");
        }
    }).then((json) => ({ lat: json.result.latitude, lng: json.result.longitude })).catch((err) => console.log(err));

    return res
}

const isValid = (i) => /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i.test(i.replace(/\s/g, ""))

export const invoke = async ({ payload }) => {

    console.log("PAYLOAD", payload)

    // Get postcode of quote site 
    const sa = payload["field:site_address_multi"]
    const pc = sa.postalCode

    // Test postcode is valid
    // if (!pc || !isValid(pc)) {
    //     return {}
    // }

    // Get coords of postcode
    const pcc = await getPostcodeData(pc)
    // Get supplier collection 
    const sl = await getSuppliersCollection()
    // Filter suppliers by same quotation type


    console.log(sl)
    // quoteTypesProvided



    // ["monoPitch", "concreteSlab", "mezzanineFloor", "roundHouse", "portalFrame", "solarPanels", "rollerDoors"]





    return {} // The function must return an empty object, do not delete
};

// Get postcodes from supplier collection 
// Calc distance from each one 
// Return x nearest suppliers 


// Field key form number of quotes - number_of_quotes
// If no number of quotes field AND form is round house return 3 (should only be one supplier) 


// Field key for multi-line address - site_address_multi


// Concrete Slab form payload 
// {
//     "site_level_mono": "No",
//     "building_size": "30m",
//     "animal_handling_internals": "No",
//     "first_name_0185": "Test",
//     "last_name_ad90": "McTesterson",
//     "email_ba34": "test@supertest.com",
//     "phone_c095": "+447123456789",
//     "company_name_0ff8": "super farm ltd",
//     "site_address_multi": {
//         "country": "GB",
//         "addressLine": "123 farm road",
//         "addressLine2": null,
//         "city": "Farmville",
//         "subdivision": "ENG",
//         "postalCode": "st16 1ld"
//     }
// }

// SupplierLisy paylod 
// [
//     {
//         "subscriptionEndDate": "12/10/2021",
//         "latitude": 52.826453,
//         "_id": "e93363e1-324e-473b-a91c-ef335ff55991",
//         "_owner": "85839425-0cfe-471f-94da-e4086b1dc961",
//         "_createdDate": "2025-01-01T14:29:37.589Z",
//         "postcode": "st16 1ld",
//         "quoteTypesProvided": [
//             "monoPitch",
//             "concreteSlab",
//             "mezzanineFloor",
//             "roundHouse",
//             "portalFrame",
//             "solarPanels",
//             "rollerDoors"
//         ],
//         "_updatedDate": "2025-01-02T08:09:51.383Z",
//         "longitude": -2.12949,
//         "subscriptionDate": "12/10/2020",
//         "isActive": true,
//         "supplierName": "ACME Inc.",
//         "address": {
//             "city": "San Francisco",
//             "addressLine": "123 Main Street",
//             "formattedAddress": "123 Main Street, San Francisco, United States",
//             "country": "US",
//             "postalCode": "94158",
//             "addressLine2": "Building 6, 3rd floor",
//             "subdivision": "US-CA"
//         },
//         "planId": "02be614d-dd1e-49bd-b08a-a37a2fe2e0b1"
//     },
//     {
//         "subscriptionEndDate": "2022-05-15",
//         "_id": "ebb9f9a5-5d0f-4eb5-b620-f3ea0801714a",
//         "_owner": "85839425-0cfe-471f-94da-e4086b1dc961",
//         "_createdDate": "2025-01-01T13:40:30.829Z",
//         "quoteTypesProvided": [
//             "monoPitch",
//             "concreteSlab",
//             "mezzanineFloor",
//             "roundHouse",
//             "portalFrame"
//         ],
//         "_updatedDate": "2025-01-02T08:10:11.336Z",
//         "subscriptionDate": "2021-05-15",
//         "isActive": true,
//         "supplierName": "ABC Company"
//     },
//     {
//         "subscriptionEndDate": "2022-08-20",
//         "_id": "6b1a26fa-56d7-429e-a6da-f12211db6a73",
//         "_owner": "85839425-0cfe-471f-94da-e4086b1dc961",
//         "_createdDate": "2025-01-01T13:40:30.828Z",
//         "quoteTypesProvided": [
//             "monoPitch",
//             "concreteSlab",
//             "mezzanineFloor",
//             "roundHouse",
//             "portalFrame"
//         ],
//         "_updatedDate": "2025-01-02T08:10:19.267Z",
//         "subscriptionDate": "2021-08-20",
//         "isActive": true,
//         "supplierName": "XYZ Corporation"
//     },
//     {
//         "subscriptionEndDate": "2022-06-10",
//         "_id": "8f4a0b9a-85af-4d3d-8637-ecf8c286bdbd",
//         "_owner": "85839425-0cfe-471f-94da-e4086b1dc961",
//         "_createdDate": "2025-01-01T13:40:30.827Z",
//         "quoteTypesProvided": [
//             "solarPanels",
//             "rollerDoors"
//         ],
//         "_updatedDate": "2025-01-02T08:10:26.746Z",
//         "subscriptionDate": "2021-06-10",
//         "isActive": false,
//         "supplierName": "DEF Enterprises"
//     },
//     {
//         "subscriptionEndDate": "2022-04-30",
//         "_id": "c87d7673-5a4b-4746-8431-9de93c11557d",
//         "_owner": "85839425-0cfe-471f-94da-e4086b1dc961",
//         "_createdDate": "2025-01-01T13:40:30.826Z",
//         "quoteTypesProvided": [
//             "solarPanels",
//             "rollerDoors"
//         ],
//         "_updatedDate": "2025-01-02T08:10:30.311Z",
//         "subscriptionDate": "2021-04-30",
//         "isActive": true,
//         "supplierName": "123 Suppliers"
//     },
//     {
//         "subscriptionEndDate": "2022-07-25",
//         "_id": "379e8f74-f36a-4986-9e23-4d8d3238e04f",
//         "_owner": "85839425-0cfe-471f-94da-e4086b1dc961",
//         "_createdDate": "2025-01-01T13:40:30.825Z",
//         "quoteTypesProvided": [
//             "monoPitch",
//             "concreteSlab",
//             "mezzanineFloor",
//             "roundHouse",
//             "portalFrame",
//             "solarPanels",
//             "rollerDoors"
//         ],
//         "_updatedDate": "2025-01-02T08:10:34.800Z",
//         "subscriptionDate": "2021-07-25",
//         "isActive": true,
//         "supplierName": "LMN Partners"
//     }
// ]
