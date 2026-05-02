/**
 * formSubmission.test.js
 *
 * Pure unit tests — no Wix runtime needed.
 * Run with: node --experimental-vm-modules formSubmission.test.js
 * Or with Jest: jest formSubmission.test.js
 *
 * Each integration-style test drives the pure functions (prepareFormData,
 * filterSuppliers, stringifyForm etc.) using real payload and API-response
 * fixtures, then prints what emails each supplier would receive.
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import {
    prepareFormData,
    findCollectionName,
    buildingSizes,
    stringifyForm,
    filterSuppliers,
    getRequiredSupplierTypes,
    sortSuppliersByDistance,
    getAllFieldsWith,
} from "../backend/formSubmission.js";

// ─── Fixture loader ───────────────────────────────────────────────────────────


describe("testFuncs", () => {

    test("formatString", () => {
        const formatKey = (key) =>
            typeof key === "string"
                ? key.replace(/.+_/gi, "").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase())
                : key;

        expect(formatKey("buildingLength")).toBe("Building Length");
        expect(formatKey("BuildingLength")).toBe("Building Length");
    })
})

// const __dir = dirname(fileURLToPath(import.meta.url));
// const fixture = (path) => JSON.parse(readFileSync(join(__dir, path), "utf8"));

// const SUPPLIER_LIST = fixture("APIResponses/SupplierList.json");
// const SUPPLIER_TYPES = fixture("APIResponses/SupplierTypes.json");

// const DB = {
//     concrete: fixture("APIResponses/collectionResponses/concrete.json"),
//     portalFrame: fixture("APIResponses/collectionResponses/portalFrame.json"),
//     dismantle: fixture("APIResponses/collectionResponses/dismantle.json"),
//     cladding: fixture("APIResponses/collectionResponses/cladding.json"),
//     walls: fixture("APIResponses/collectionResponses/walls.json"),
//     monoPitch: fixture("APIResponses/collectionResponses/monoPitch.json"),
//     polytunnel: fixture("APIResponses/collectionResponses/polytunnel.json"),
//     solarPanels: fixture("APIResponses/collectionResponses/solarPanels.json"),
//     rainwater: fixture("APIResponses/collectionResponses/rainwater.json"),
//     roundhouse: fixture("APIResponses/collectionResponses/roundhouse.json"),
//     mezzanine: fixture("APIResponses/collectionResponses/mezzanineFloor.json"),
// };

// const PAYLOADS = {
//     concrete: fixture("formSubmissions/concreteSlab.json"),
//     portalFrame: fixture("formSubmissions/portalFrame.json"),
//     dismantle: fixture("formSubmissions/dismantleRepair.json"),
//     dismantleRaw: fixture("formSubmissions/dismantleRepairRaw.json"),
//     monoPitch: fixture("formSubmissions/monoPitch.json"),
//     mezzanine: fixture("formSubmissions/mezzanineFloor.json"),
//     doors: fixture("formSubmissions/doorsRepair.json"),
//     solarPanels: fixture("formSubmissions/solarPanelsRepair.json"),
//     rainwater: fixture("formSubmissions/rainwaterRepair.json"),
//     roundhouse: fixture("formSubmissions/roundhouse.json"),
// };

// // ─── Test harness ─────────────────────────────────────────────────────────────

// let passed = 0;
// let failed = 0;
// const failures = [];

// function assert(description, condition, extra = "") {
//     if (condition) {
//         console.log(`  ✓  ${description}`);
//         passed++;
//     } else {
//         console.error(`  ✗  ${description}${extra ? `\n       ${extra}` : ""}`);
//         failed++;
//         failures.push(description);
//     }
// }

// function assertEq(description, actual, expected) {
//     const ok = JSON.stringify(actual) === JSON.stringify(expected);
//     assert(description, ok, `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
// }

// function section(title) {
//     console.log(`\n${"─".repeat(60)}`);
//     console.log(`  ${title}`);
//     console.log("─".repeat(60));
// }

// // ─── Helper: simulate the full per-form pipeline ──────────────────────────────

// /**
//  * Merges payload + DB record (as invoke does), runs the supplier pipeline,
//  * and returns { form, suppliers, emails } so each test can assert on them.
//  */
// function runPipeline(rawPayload, dbRecord) {
//     const parsedPayload = prepareFormData(rawPayload);

//     // Merge DB record on top (same as Step 2 in invoke)
//     let form = { ...parsedPayload, ...dbRecord };

//     // Re-resolve lat/lng after merge (payload address takes priority)
//     const payloadAddress = rawPayload.address ?? rawPayload[`field:${rawPayload.formId}:address`] ?? null;
//     if (payloadAddress?.location?.latitude) {
//         form.lat = payloadAddress.location.latitude;
//         form.lng = payloadAddress.location.longitude;
//     }

//     const requiredTypes = getRequiredSupplierTypes(SUPPLIER_TYPES, form);
//     const groups = filterSuppliers(SUPPLIER_LIST, requiredTypes, form);

//     const seenIds = new Set();
//     const suppliers = groups
//         .flatMap((g) => g.suppliers.map((s) => ({
//             ...s, supplierType: g.supplierType, baseSupplierType: g.baseSupplierType,
//         })))
//         .filter((s) => !seenIds.has(s._id) && seenIds.add(s._id));

//     const emailForm = stringifyForm(form);
//     const buildingSize = buildingSizes(form);
//     const sizeString = [buildingSize.length, buildingSize.width, buildingSize.height]
//         .filter(Boolean).map((v) => `${v}${buildingSize.units}`).join(" x ") || "N/A";
//     const projectType = `New ${(form.formType ?? form.formName).replace(/Quotes$/i, "").trim()} project`;

//     const emails = suppliers.map((s) => ({
//         to: s.supplierName,
//         supplierType: s.supplierType,
//         distanceKm: s.distanceInMetres != null ? Math.trunc(s.distanceInMetres / 1000) : "N/A",
//         variables: {
//             supplierName: s.supplierName,
//             submittedName: `${form.firstName ?? ""} ${form.lastName ?? ""}`.trim(),
//             submittedEmail: form.email ?? "",
//             submittedPhone: form.phoneNumber ?? "No phone number provided",
//             submittedType: projectType,
//             buildingSize: sizeString,
//             submittedDistance: s.distanceInMetres ? Math.trunc(s.distanceInMetres / 1000) : "N/A",
//             ...(emailForm["Fields"] && { formDetails: emailForm["Fields"] }),
//             ...(emailForm["Form Contact"] && { formContact: emailForm["Form Contact"] }),
//         },
//     }));

//     return { form, suppliers, emails, requiredTypes, groups };
// }

// function printEmails(emails) {
//     if (emails.length === 0) {
//         console.log("    (no emails would be sent)");
//         return;
//     }
//     for (const email of emails) {
//         console.log(`\n    ┌─ To: ${email.to} [${email.supplierType}] (~${email.distanceKm} km away)`);
//         for (const [key, val] of Object.entries(email.variables)) {
//             if (val && val !== "N/A") {
//                 const lines = String(val).split("\n");
//                 console.log(`    │  ${key}: ${lines[0]}`);
//                 for (const line of lines.slice(1)) console.log(`    │    ${line}`);
//             }
//         }
//         console.log("    └─────────────────────────────────────────────");
//     }
// }

// // ─── Unit tests: prepareFormData ──────────────────────────────────────────────

// section("prepareFormData — prefixed payload (concrete slab)");
// {
//     const form = prepareFormData(PAYLOADS.concrete);
//     assert("formName strips prefix and collection suffix",
//         form.formName === "Concrete", `got "${form.formName}"`);
//     assert("formGuid is extracted", !!form.formGuid);
//     assert("firstName is stripped of field prefix", form.firstName === "Test");
//     assert("email is extracted", form.email === "testuser@test.com");
//     assert("internal _owner field is dropped", form._owner === undefined);
//     assert("internal _context field is dropped", form._context === undefined);
//     assert("lat is null (no address in payload)", form.lat === null);
// }

// section("prepareFormData — prefixed payload (portal frame — has address with location)");
// {
//     const form = prepareFormData(PAYLOADS.portalFrame);
//     assert("formName extracted correctly", form.formName === "Portal Frame", `got "${form.formName}"`);
//     assert("lat extracted from address.location", typeof form.lat === "number");
//     assert("lng extracted from address.location", typeof form.lng === "number");
//     assertEq("lat value", form.lat, 52.629205);
//     assertEq("lng value", form.lng, -2.048218);
// }

// section("prepareFormData — dismantleRepairRaw flat payload");
// {
//     const form = prepareFormData(PAYLOADS.dismantleRaw);
//     assert("formName extracted correctly",
//         form.formName === "Dismantle", `got "${form.formName}"`);
//     assert("lat extracted", typeof form.lat === "number");
// }

// // ─── Unit tests: findCollectionName ───────────────────────────────────────────

// section("findCollectionName");
// {
//     assertEq("Concrete → ConcreteQuotes", findCollectionName("Concrete"), "ConcreteQuotes");
//     assertEq("Portal Frame → PortalFrameQuotes", findCollectionName("Portal Frame"), "PortalFrameQuotes");
//     assertEq("Dismantle → DismantleQuotes", findCollectionName("Dismantle"), "DismantleQuotes");
//     assertEq("Mono Pitch → MonoPitchQuotes", findCollectionName("Mono Pitch"), "MonoPitchQuotes");
//     assertEq("Solar Panels → SolarPanelsQuotes", findCollectionName("Solar Panels"), "SolarPanelsQuotes");
//     assertEq("Rainwater Harvesting → RainwaterHarvestingQuotes",
//         findCollectionName("Rainwater Harvesting"), "RainwaterHarvestingQuotes");
//     assertEq("Round House → RoundHouseForm", findCollectionName("Round House"), "RoundHouseForm");
//     assert("No match returns null", findCollectionName("Completely Unknown Form xyz") === null);
// }

// // ─── Unit tests: buildingSizes ────────────────────────────────────────────────

// section("buildingSizes — concrete slab DB record");
// {
//     const sizes = buildingSizes(DB.concrete);
//     assertEq("length (digoutLength)", sizes.length, 5);
//     assertEq("width (digoutWidth)", sizes.width, 6);
//     assertEq("height (digoutDepth)", sizes.height, 1);
//     assertEq("units (no measurementUnits field → ft)", sizes.units, "ft");
// }

// section("buildingSizes — dismantle DB record (metric, uses buildingLength/Width/Height)");
// {
//     const sizes = buildingSizes(DB.dismantle);
//     assert("length is a number", typeof sizes.length === "number");
//     assert("width is a number", typeof sizes.width === "number");
// }

// section("buildingSizes — polytunnel DB record");
// {
//     const sizes = buildingSizes(DB.polytunnel);
//     // Polytunnel uses polytunnelLength / polytunnelWidth which takes priority
//     assert("polytunnel length resolved", sizes.length !== null);
// }

// // ─── Unit tests: getAllFieldsWith ─────────────────────────────────────────────

// section("getAllFieldsWith");
// {
//     const form = { roofMaterial: "asbestos", buildingHeight: "10", sitePrepared: "yes" };
//     const byKey = getAllFieldsWith(form, "roof");
//     assert("finds fields by key", byKey.length === 1 && byKey[0].field === "roofMaterial");

//     const byVal = getAllFieldsWith(form, "asbestos", true);
//     assert("finds fields by value", byVal.length === 1 && byVal[0].field === "roofMaterial");

//     const none = getAllFieldsWith(form, "nonexistent");
//     assert("returns empty array when no match", none.length === 0);
// }

// // ─── Unit tests: stringifyForm ────────────────────────────────────────────────

// section("stringifyForm — contact fields separated from form fields");
// {
//     const form = {
//         firstName: "Test", lastName: "User", email: "t@t.com", phoneNumber: "07123",
//         companyName: "Acme", address: { formatted: "London, UK" },
//         sitePrepared: "yes", concreteThickness: "100mm",
//         formGuid: "should-not-appear", lat: 51.5, lng: -0.1,
//         _id: "should-not-appear", formType: "ConcreteQuotes",
//     };
//     const result = stringifyForm(form);

//     assert("Form Contact section present", "Form Contact" in result);
//     assert("Fields section present", "Fields" in result);
//     assert("formGuid not in Fields", !result["Fields"]?.includes("formGuid"));
//     assert("lat not in Fields", !result["Fields"]?.includes("lat"));
//     assert("_id not in Fields", !result["Fields"]?.includes("_id"));
//     assert("formType not in Fields", !result["Fields"]?.includes("formType"));
//     assert("sitePrepared appears in Fields", result["Fields"]?.includes("Site Prepared"));
//     assert("concreteThickness appears in Fields", result["Fields"]?.includes("Concrete Thickness"));
//     assert("contact name in Form Contact", result["Form Contact"]?.includes("Test"));
//     assert("address in Form Contact", result["Form Contact"]?.includes("London, UK"));
// }

// section("stringifyForm — camelCase keys are humanised");
// {
//     const form = {
//         firstName: "A", lastName: "B", phoneNumber: "123",
//         quoteForQuantitySurveyor: "yes", interiorOrExteriorPlacement: "exterior"
//     };
//     const result = stringifyForm(form);
//     assert("camelCase key split to words in Fields",
//         result["Fields"]?.includes("Quote For Quantity Surveyor") ||
//         result["Fields"]?.includes("Interior Or Exterior Placement"));
// }

// section("stringifyForm — formResponse.fields branch (older format)");
// {
//     const form = {
//         firstName: "A", lastName: "B", email: "a@b.com", phoneNumber: "123",
//         formResponse: {
//             fields: [
//                 { elementId: "x", label: "Site Prepared", value: "yes", order: 1 },
//                 { elementId: "y", label: "First Name", value: "A", order: 0 },
//                 { elementId: "z", label: "Thickness", value: null, order: 2 },
//             ]
//         }
//     };
//     const result = stringifyForm(form);
//     assert("contact field (First Name) not in Fields", !result["Fields"]?.includes("First Name"));
//     assert("form field (Site Prepared) in Fields", result["Fields"]?.includes("Site Prepared"));
//     assert("null value fields excluded", !result["Fields"]?.includes("Thickness"));
// }

// // ─── Integration tests: supplier filtering per form ───────────────────────────

// section("INTEGRATION — Concrete Slab: supplier selection + email preview");
// {
//     const { form, suppliers, emails, requiredTypes } = runPipeline(PAYLOADS.concrete, DB.concrete);

//     console.log(`\n  Form parsed as: "${form.formName}"`);
//     console.log(`  Required supplier types: ${requiredTypes.map(t => t.supplierType).join(", ") || "(none from field matching)"}`);
//     console.log(`  Suppliers who would receive emails (${suppliers.length}):`);
//     suppliers.forEach(s => console.log(`    - ${s.supplierName} [${s.supplierType}]`));

//     // Nath's Test Supplier provides "concreteFloorSupplyAndInstall" etc. → should match
//     const nathsSupplier = suppliers.find(s => s.supplierName === "Nath's Test Supplier");
//     // LMN Partners provides "Concrete Slab" in quoteTypesProvided → should match via mainFormGroup
//     const lmnSupplier = suppliers.find(s => s.supplierName === "LMN Partners");

//     assert("At least one supplier selected for concrete form", suppliers.length > 0);
//     assert("Nath's Test Supplier included (provides concreteFloor types)", !!nathsSupplier);
//     assert("LMN Partners included (provides 'Concrete Slab')", !!lmnSupplier);
//     assert("No supplier appears more than once",
//         suppliers.length === new Set(suppliers.map(s => s._id)).size);

//     console.log("\n  📧 Email previews:");
//     printEmails(emails);
// }

// section("INTEGRATION — Portal Frame: supplier selection + email preview");
// {
//     const { form, suppliers, emails, requiredTypes } = runPipeline(PAYLOADS.portalFrame, DB.portalFrame);

//     console.log(`\n  Form parsed as: "${form.formName}"`);
//     console.log(`  lat: ${form.lat}, lng: ${form.lng}`);
//     console.log(`  Required supplier types: ${requiredTypes.map(t => t.supplierType).join(", ") || "(none from field matching)"}`);
//     console.log(`  Suppliers who would receive emails (${suppliers.length}):`);
//     suppliers.forEach(s => console.log(`    - ${s.supplierName} [${s.supplierType}] (~${Math.trunc((s.distanceInMetres ?? 0) / 1000)}km)`));

//     const lmnSupplier = suppliers.find(s => s.supplierName === "LMN Partners");
//     assert("At least one supplier selected for portal frame", suppliers.length > 0);
//     assert("LMN Partners included (provides 'Portal Frame')", !!lmnSupplier);

//     // Portal frame has building dimensions — check LMN's min/max is respected
//     if (lmnSupplier) {
//         assert("LMN supplier has distance calculated", lmnSupplier.distanceInMetres != null);
//     }

//     // Nath's supplier provides steelErector/steelFabricator types with minMaxMeasurements
//     const nathsSupplier = suppliers.find(s => s.supplierName === "Nath's Test Supplier");
//     console.log(`  Nath's Test Supplier ${nathsSupplier ? "INCLUDED" : "EXCLUDED"} (has min 20m length constraint)`);

//     assert("No duplicate supplier emails",
//         suppliers.length === new Set(suppliers.map(s => s._id)).size);

//     console.log("\n  📧 Email previews:");
//     printEmails(emails);
// }

// section("INTEGRATION — Dismantle/Repair: asbestos detection + email preview");
// {
//     // dismantleRepair.json has roofMaterial: "asbestos"
//     const { form, suppliers, emails } = runPipeline(PAYLOADS.dismantle, DB.dismantle);

//     console.log(`\n  Form parsed as: "${form.formName}"`);
//     const roofMaterialFields = getAllFieldsWith(form, "asbestos", true);
//     const asbestosDetected = roofMaterialFields.length > 0;
//     console.log(`  Asbestos fields found: ${roofMaterialFields.map(f => `${f.field}=${f.value}`).join(", ") || "none"}`);

//     // When asbestos is present, only handlesAsbestos:true suppliers should be selected
//     const nonAsbestosSuppliers = suppliers.filter(s => !s.handlesAsbestos);
//     assert("No non-asbestos-capable suppliers selected when asbestos present",
//         nonAsbestosSuppliers.length === 0,
//         `non-asbestos suppliers: ${nonAsbestosSuppliers.map(s => s.supplierName).join(", ")}`);

//     console.log(`  Suppliers who would receive emails (${suppliers.length}):`);
//     suppliers.forEach(s => console.log(`    - ${s.supplierName} [handlesAsbestos: ${s.handlesAsbestos}]`));

//     console.log("\n  📧 Email previews:");
//     printEmails(emails);
// }

// section("INTEGRATION — Solar Panels: supplier selection + email preview");
// {
//     const { form, suppliers, emails, requiredTypes } = runPipeline(PAYLOADS.solarPanels, DB.solarPanels);

//     console.log(`\n  Form parsed as: "${form.formName}"`);
//     console.log(`  Required types: ${requiredTypes.map(t => t.supplierType).join(", ") || "(none)"}`);
//     console.log(`  Suppliers (${suppliers.length}): ${suppliers.map(s => s.supplierName).join(", ") || "none"}`);

//     const nathsSupplier = suppliers.find(s => s.supplierName === "Nath's Test Supplier");
//     assert("Nath's Test Supplier included (provides solarPanel types)", !!nathsSupplier);
//     assert("No duplicate supplier emails",
//         suppliers.length === new Set(suppliers.map(s => s._id)).size);

//     console.log("\n  📧 Email previews:");
//     printEmails(emails);
// }

// section("INTEGRATION — Mono Pitch: dimension filtering + email preview");
// {
//     const { form, suppliers, emails, requiredTypes } = runPipeline(PAYLOADS.monoPitch, DB.monoPitch);
//     const sizes = buildingSizes(form);

//     console.log(`\n  Form parsed as: "${form.formName}"`);
//     console.log(`  Dimensions: L=${sizes.length} W=${sizes.width} H=${sizes.height} (${sizes.units})`);
//     console.log(`  Required types: ${requiredTypes.map(t => t.supplierType).join(", ") || "(none)"}`);
//     console.log(`  Suppliers (${suppliers.length}): ${suppliers.map(s => s.supplierName).join(", ") || "none"}`);

//     assert("Building dimensions extracted", sizes.length !== null || sizes.width !== null);
//     assert("No duplicate supplier emails",
//         suppliers.length === new Set(suppliers.map(s => s._id)).size);

//     console.log("\n  📧 Email previews:");
//     printEmails(emails);
// }

// section("INTEGRATION — Rainwater Harvesting: supplier selection + email preview");
// {
//     const { form, suppliers, emails, requiredTypes } = runPipeline(PAYLOADS.rainwater, DB.rainwater);

//     console.log(`\n  Form parsed as: "${form.formName}"`);
//     console.log(`  Required types: ${requiredTypes.map(t => t.supplierType).join(", ") || "(none)"}`);
//     console.log(`  Suppliers (${suppliers.length}): ${suppliers.map(s => s.supplierName).join(", ") || "none"}`);

//     const nathsSupplier = suppliers.find(s => s.supplierName === "Nath's Test Supplier");
//     assert("Nath's Test Supplier included (provides rainwaterHarvesting types)", !!nathsSupplier);

//     console.log("\n  📧 Email previews:");
//     printEmails(emails);
// }

// section("INTEGRATION — Mezzanine Floor: supplier selection + email preview");
// {
//     const { form, suppliers, emails, requiredTypes } = runPipeline(PAYLOADS.mezzanine, DB.mezzanine);

//     console.log(`\n  Form parsed as: "${form.formName}"`);
//     console.log(`  Required types: ${requiredTypes.map(t => t.supplierType).join(", ") || "(none)"}`);
//     console.log(`  Suppliers (${suppliers.length}): ${suppliers.map(s => s.supplierName).join(", ") || "none"}`);

//     assert("No duplicate supplier emails",
//         suppliers.length === new Set(suppliers.map(s => s._id)).size);

//     console.log("\n  📧 Email previews:");
//     printEmails(emails);
// }

// section("INTEGRATION — Round House: supplier selection + email preview");
// {
//     const { form, suppliers, emails, requiredTypes } = runPipeline(PAYLOADS.roundhouse, DB.roundhouse);

//     console.log(`\n  Form parsed as: "${form.formName}"`);
//     console.log(`  lat: ${form.lat}, lng: ${form.lng}`);
//     console.log(`  Required types: ${requiredTypes.map(t => t.supplierType).join(", ") || "(none)"}`);
//     console.log(`  Suppliers (${suppliers.length}): ${suppliers.map(s => s.supplierName).join(", ") || "none"}`);

//     assert("lat/lng resolved (roundhouse DB record has nested address.location)",
//         form.lat !== null && form.lng !== null);
//     assert("No duplicate supplier emails",
//         suppliers.length === new Set(suppliers.map(s => s._id)).size);

//     console.log("\n  📧 Email previews:");
//     printEmails(emails);
// }

// // ─── Dimension boundary tests ─────────────────────────────────────────────────

// section("Dimension boundary: LMN Partners minLength=20 for steelErector/steelFabricator");
// {
//     // LMN doesn't have minMaxMeasurements, so dimension limits don't apply to them.
//     // Nath's Test Supplier does. Let's verify a building that's too small is excluded.
//     const smallBuilding = {
//         buildingLength: "5", buildingWidth: "5", buildingHeight: "3",
//         formName: "Portal Frame", lat: 52.6, lng: -2.0
//     };
//     const largeBuilding = {
//         buildingLength: "50", buildingWidth: "20", buildingHeight: "6",
//         formName: "Portal Frame", lat: 52.6, lng: -2.0
//     };

//     // steelErectorSupplyAndInstall has minLength: 20
//     const steelErectorType = SUPPLIER_TYPES.filter(t => t.supplierType === "steelErectorSupplyAndInstall");
//     const nathsOnly = [SUPPLIER_LIST[0]]; // Nath's has minMaxMeasurements

//     const smallResult = filterSuppliers(nathsOnly, steelErectorType, smallBuilding);
//     const largeResult = filterSuppliers(nathsOnly, steelErectorType, largeBuilding);

//     const smallSuppliers = smallResult.flatMap(g => g.suppliers);
//     const largeSuppliers = largeResult.flatMap(g => g.suppliers);

//     assert("Nath's Test Supplier excluded for building shorter than minLength (5m < 20m)",
//         smallSuppliers.length === 0,
//         `got ${smallSuppliers.map(s => s.supplierName).join(", ")}`);
//     assert("Nath's Test Supplier included for building longer than minLength (50m >= 20m)",
//         largeSuppliers.length > 0,
//         `got ${largeSuppliers.length} suppliers`);
// }

// // ─── Distance sorting tests ───────────────────────────────────────────────────

// section("sortSuppliersByDistance");
// {
//     const suppliers = [
//         { _id: "a", supplierName: "Far Away", latitude: 57.0, longitude: 0.0 },
//         { _id: "b", supplierName: "Close By", latitude: 52.0, longitude: -0.1 },
//         { _id: "c", supplierName: "Very Far", latitude: 60.0, longitude: 2.0 },
//     ];
//     const origin = { lat: 51.5, lng: -0.1 }; // London-ish
//     const sorted = sortSuppliersByDistance(suppliers, origin);

//     assertEq("Closest supplier is first", sorted[0].supplierName, "Close By");
//     assertEq("Furthest supplier is last", sorted[2].supplierName, "Very Far");
//     assert("distanceInMetres populated on all", sorted.every(s => s.distanceInMetres != null));
// }

// // ─── Deduplication test ───────────────────────────────────────────────────────

// section("Deduplication: supplier appearing in multiple groups only gets one email");
// {
//     // Nath's Test Supplier covers many types — could appear in multiple groups
//     const { suppliers } = runPipeline(PAYLOADS.portalFrame, DB.portalFrame);
//     const nathsCount = suppliers.filter(s => s.supplierName === "Nath's Test Supplier").length;
//     assertEq("Nath's Test Supplier appears exactly once after deduplication", nathsCount, 1);
// }

// // ─── Summary ──────────────────────────────────────────────────────────────────

// console.log(`\n${"═".repeat(60)}`);
// console.log(`  Results: ${passed} passed, ${failed} failed`);
// if (failures.length > 0) {
//     console.log(`\n  Failed tests:`);
//     failures.forEach(f => console.log(`    ✗ ${f}`));
// }
// console.log("═".repeat(60));

// if (failed > 0) process.exit(1);
