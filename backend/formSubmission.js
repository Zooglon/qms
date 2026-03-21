/**
 * Autocomplete function declaration, do not delete
 * @param {import('./__schema__.js').Payload} options
 */

import wixData from "wix-data";
import { triggeredEmails } from "wix-crm-backend";

// ─── Config ──────────────────────────────────────────────────────────────────

const TEST_MODE = false;

// ─── CMS Helper ──────────────────────────────────────────────────────────────

/**
 * Query a Wix CMS collection with optional filters and limit.
 * Each filter object must have { filterField, filterValue, operator? }
 * where operator is a valid wixData query method e.g. "eq", "hasSome".
 */
export const queryCMS = async (collectionName, filters = [], limit = 100) => {
  let query = wixData.query(collectionName);

  for (const { filterField, filterValue, operator = "eq" } of filters) {
    if (filterField && filterValue !== undefined) {
      query = query[operator](filterField, filterValue);
    }
  }

  const results = await query.limit(limit).find({ suppressAuth: true });

  if (results.items.length === 0) console.log(`No items found in collection: ${collectionName}`);

  return results.items;
};

// ─── Error Handling ───────────────────────────────────────────────────────────

const handleErrors = async (msg) => {
  if (TEST_MODE) throw new Error(msg);

  // In production: email developers, then still throw so execution stops
  try {
    const admins = await queryCMS("QMSTeam", [{ filterField: "role", filterValue: "DEVELOPER" }]);
    for (const admin of admins) {
      await triggeredEmails.emailMember("adminErrorAlert", admin._id, {
        variables: { errorMessage: JSON.stringify(msg) },
      });
    }
  } catch (err) {
    console.error("Could not send admin error alert:", err);
  }

  throw new Error(msg);
};

// ─── Email ────────────────────────────────────────────────────────────────────

async function sendSupplierEmail(emailId, contact, emailVariables) {
  if (TEST_MODE) {
    console.log("TEST MODE – would send email to:", contact.contactName, "variables:", emailVariables);
        return;
  }
  await triggeredEmails.emailContact(emailId, contact.contactId, emailVariables);
  console.log(`Email sent to: ${contact.contactName}`);
}

// ─── Form Preparation ────────────────────────────────────────────────────────

/**
 * Recursively searches an object for `latitude` and `longitude` properties.
 * Used as a fallback when address.location is not present at the top level.
 */
const findLatLng = (obj, depth = 0) => {
  if (!obj || typeof obj !== "object" || depth > 5) return { lat: null, lng: null };
  if (typeof obj.latitude === "number" && typeof obj.longitude === "number") {
    return { lat: obj.latitude, lng: obj.longitude };
  }
  for (const value of Object.values(obj)) {
    if (value && typeof value === "object") {
      const result = findLatLng(value, depth + 1);
      if (result.lat !== null) return result;
    }
  }
  return { lat: null, lng: null };
};

/**
 * Strips the Wix form field prefix (e.g. "field:comp-abc123:") from payload keys.
 *
 * Two payload formats exist:
 *   1. Flat keys:        { firstName: "...", formName: "...", address: {...} }
 *   2. Prefixed keys:    { "field:comp-xyz:firstName": "...", formName: "..." }
 */

export const formatFormName = (formObject) => {
  // Parse the verbose formName Wix sends: "Home - submit into Portal Frame Quotes collection"
  const rawFormName = formObject.formName ?? "";
  const submitIndex = rawFormName.indexOf("submit into ");
  const formName = submitIndex !== -1
    ? rawFormName.slice(submitIndex + 12).replace(/ (Quotes|Form) collection$/i, "").trim()
    : rawFormName.trim() || "Unknown form";

  return formName;
}

export const prepareFormData = (rawPayload) => {
  const formObject = {};
  const fieldId = rawPayload.formId ?? null;
  const prefixRegex = new RegExp(fieldId ? `.*${fieldId}:` : ".*:", "g");

  for (const [key, value] of Object.entries(rawPayload)) {
    const cleanKey = key.replace(prefixRegex, "");
    if (!cleanKey.startsWith("_")) formObject[cleanKey] = value;
  }

  const formName = formatFormName(formObject);
  const address = formObject.address ?? null;
  const { lat, lng } = address?.location?.latitude
    ? { lat: address.location.latitude, lng: address.location.longitude }
    : findLatLng(formObject);

  return {
    ...formObject,
    formName,
    formGuid: formObject.formGuid ?? null,
    address,
    lat,
    lng,
    email: formObject.email ?? null,
  };
};

// ─── Collection Name Lookup ───────────────────────────────────────────────────

/**
 * Fuzzy-matches a human-readable form name (e.g. "Portal Frame") to the correct
 * Wix CMS collection name (e.g. "PortalFrameQuotes").
 */
export const findCollectionName = (formName) => {
  const collectionsInCms = [
    "CladdingQuotes", "ConcreteQuotes", "DismantleQuotes", "DoorsQuotes",
    "GutteringQuotes", "MezzanineFloorForm", "MonoPitchQuotes", "PolytunnelQuotes",
    "PortalFrameQuotes", "RainwaterHarvestingQuotes", "ReroofQuotes",
    "RoundHouseForm", "SolarPanelsQuotes", "WallQuotes",
  ];

  const normalize = (str) =>
    str.toLowerCase()
      .replace(/quotes?|form|collection|submit|into/g, "")
      .replace(/[^a-z0-9]/g, " ")
      .trim()
      .split(/\s+/)
      .filter((t) => t.length > 2);

  const formTokens = normalize(formName);

  const best = collectionsInCms
    .map((collection) => {
      const collectionTokens = normalize(collection);
      const score = formTokens.filter((ft) =>
        collectionTokens.some((ct) => ct.includes(ft) || ft.includes(ct))
      ).length;
      return { collection, score };
    })
    .reduce((a, b) => (b.score > a.score ? b : a));

  return best.score > 0 ? best.collection : null;
};

// ─── Building Dimensions ─────────────────────────────────────────────────────

export const getFieldValue = (form, field) => {
  const entry = Object.entries(form).find(([key]) =>
    key.toLowerCase().includes(field.toLowerCase())
  );
  return entry ? entry[1] : null;
};

/**
 * Extracts and normalises building dimensions to metres.
 * Handles both metric ("20m") and imperial ("20ft") string values.
 */
export const buildingSizes = (formFields) => {
  const toMetres = (val) => {
    if (val === null || val === undefined) return null;
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      return val.includes("ft")
        ? Number((parseFloat(val) * 0.3048).toFixed(2))
        : parseFloat(val) || null;
    }
    return null;
  };


  const get = (field) => getFieldValue(formFields, field);
  const units = get("measurementUnits") === "metric" ? "m" : "ft";
  const roundhouseSize = get("roundhouseSize");

  if (roundhouseSize) {
    return {
      size: toMetres(roundhouseSize),
      units: 'm'
    }
  }

  return {
    length: toMetres(get("polytunnelLength") ?? get("digoutLength") ?? get("buildingLength")),
    width: toMetres(get("polytunnelWidth") ?? get("digoutWidth") ?? get("buildingWidth")),
    height: toMetres(get("digoutDepth") ?? get("buildingHeight")),  // digoutDepth = vertical dimension for concrete
    units,
  };
};

// ─── Form Stringifier ────────────────────────────────────────────────────────

const CONTACT_FIELDS = ["first name", "last name", "company name", "company",
  "email", "email address", "phone number", "phonenumber", "phone", "address"];

const FIELDS_BLOCKLIST = new Set([
  "firstName", "lastName", "companyName", "company", "email", "emailAddress",
  "phoneNumber", "address",
  "formId", "formGuid", "formName", "formType", "formResponse",
  "lat", "lng", "submitterId", "context", "_context",
  "howManyQuotes", "howManyQuotesWouldYouLikeToReceive",
  "_id", "_owner", "_createdDate", "_updatedDate",
]);

const formatKey = (key) =>
  typeof key === "string"
    ? key.replace(/.+_/gi, "").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase())
    : key;

const formatValue = (val) =>
  typeof val === "string"
    ? val.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase())
    : val;

const formatSection = (fields, useBullets) =>
  Object.entries(fields)
    .filter(([, val]) => val !== null && val !== undefined && val !== "")
    .map(([key, val]) => {
      const displayVal = key.toLowerCase() === "address"
        ? val?.formatted ?? JSON.stringify(val)
        : formatValue(val);
      return `${useBullets ? "• " : ""}${formatKey(key)} - ${displayVal}`;
    })
    .join("\n");

/**
 * Converts a form object into a human-readable string for email bodies.
 * Returns { "Form Contact": "...", "Fields": "..." }
 */
export const stringifyForm = (formData) => {
  const { firstName, lastName, companyName, company, email, emailAddress, phoneNumber, address, ...rest } = formData;

  let additionalFields = Object.fromEntries(
    Object.entries(rest).filter(([key]) => !FIELDS_BLOCKLIST.has(key))
  );

  // If the form has a structured formResponse (older Wix form format), use those ordered fields
  if (formData.formResponse?.fields) {
    additionalFields = formData.formResponse.fields
      .filter((f) => f.value !== null && f.value !== "" && f.label)
      .sort((a, b) => a.order - b.order)
      .reduce((acc, field) => {
        if (!CONTACT_FIELDS.includes(field.label.toLowerCase())) acc[field.label] = field.value;
        return acc;
      }, {});
  }

  const formString = {
    "Form Contact": formatSection({ firstName, lastName, companyName, company, email, emailAddress, phoneNumber, address }, false) || "No contact details given",
    Fields: formatSection(additionalFields, true),
  };

  TEST_MODE && console.log("Form stringified:", formString);
  return Object.fromEntries(Object.entries(formString).filter(([, v]) => v));
};

// ─── Supplier Matching ───────────────────────────────────────────────────────

export const getAllFieldsWith = (form, field, searchByValue = false) =>
  Object.entries(form)
    .filter(([key, value]) =>
      searchByValue
        ? typeof value !== "object" && value !== null && String(value).toLowerCase().includes(field.toLowerCase())
        : key.toLowerCase().includes(field.toLowerCase())
    )
    .map(([key, value]) => ({ field: key, value }));

const ASBESTOS_PATTERNS = [
  "containasbestos", "containsasbestos", "haveasbestos", "hasasbestos",
  "madeofasbestos", "asbestospresent", "asbestosispresent", "asbestosin",
  "withasbestos", "includingasbestos", "asbestos",
];

const ASBESTOS_ANTI_PATTERNS = [
  "doesnotcontainasbestos", "doesntcontainasbestos", "doesntcontainsasbestos",
  "noasbestos", "notmadeofasbestos", "noasbestospresent", "noasbestosispresent",
  "noasbestosin", "notwithasbestos", "notincludingasbestos",
];

const matchesAsbestos = (str) => {
  if (!str || typeof str !== "string") return false;
  const n = str.toLowerCase().replace(/\s/g, "");
  if (n === "asbestos") return true;
  return ASBESTOS_PATTERNS.some((p) => n.includes(p)) && !ASBESTOS_ANTI_PATTERNS.some((p) => n.includes(p));
};

const checkFormForAsbestos = (formAnswers) =>
  getAllFieldsWith(formAnswers, "asbestos").some((f) =>
    matchesAsbestos(f.field) && (f.value === "yes" || f.value === "true" || f.value === true)
  ) ||
  getAllFieldsWith(formAnswers, "asbestos", true).some((f) => matchesAsbestos(String(f.value)));

/**
 * Determines which supplier types are needed based on the form answers.
 * Returns an array of full supplierType objects (from the SupplierTypes collection).
 */
export const getRequiredSupplierTypes = (supplierTypeList, formAnswers) => {
  const requiredTypeNames = new Set();

  for (const [fieldKey, fieldValue] of Object.entries(formAnswers)) {
    const normKey = fieldKey.toLowerCase().replace(/[^a-z]/g, "");
    const normVal = typeof fieldValue === "string" ? fieldValue.toLowerCase().replace(/[^a-z]/g, "") : null;

    const isExplicitYes = fieldValue === "yes" || fieldValue === true;
    const keyIsQuoteRelated = normKey.includes("supply") || normKey.includes("quote");
    const valIsQuoteRelated = normVal?.includes("supply") || normVal?.includes("quote");

    if (!isExplicitYes && !keyIsQuoteRelated && !valIsQuoteRelated) continue;

    for (const { supplierType, baseType } of supplierTypeList) {
      const normType = supplierType.toLowerCase();
      const normBase = baseType.toLowerCase();
      if (normKey.includes(normType) || normKey.includes(normBase) ||
        normVal?.includes(normType) || normVal?.includes(normBase)) {
        requiredTypeNames.add(supplierType);
      }
    }
  }

  // Fallback: if no types matched via field scanning, match all supplier types whose
  // baseType appears in the form's formType or formName. This handles forms (like
  // roundhouse) that have no explicit "quote for X" fields — the submission itself
  // implies all types for that base are required.
  if (requiredTypeNames.size === 0) {
    const normFormType = (formAnswers.formType ?? formAnswers.formName ?? "").toLowerCase().replace(/[^a-z]/g, "");
    for (const { supplierType, baseType } of supplierTypeList) {
      if (normFormType.includes(baseType.toLowerCase().replace(/[^a-z]/g, ""))) {
        requiredTypeNames.add(supplierType);
      }
    }
  }

  return supplierTypeList.filter((st) => requiredTypeNames.has(st.supplierType));
};

export const sortSuppliersByDistance = (suppliers, { lat, lng }) => {
  const haversineMetres = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180, φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180, Δλ = ((lng2 - lng1) * Math.PI) / 180;
    const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return suppliers
    .map((s) => ({ ...s, distanceInMetres: haversineMetres(lat, lng, s.latitude, s.longitude) }))
    .sort((a, b) => a.distanceInMetres - b.distanceInMetres);
};

/**
 * Filters suppliers down to those relevant to this form, grouped by type.
 */
export const filterSuppliers = (suppliers, requiredSupplierTypes, formAnswers) => {
  console.log(`Filtering ${suppliers.length} suppliers against ${requiredSupplierTypes.length} required types`);

  if (checkFormForAsbestos(formAnswers)) {
    console.log("Asbestos detected – filtering to asbestos-capable suppliers only");
    suppliers = suppliers.filter((s) => s.handlesAsbestos);
  }

  const dimensions = buildingSizes(formAnswers);
  const { lat, lng } = formAnswers;

  const typeMatches = (s, supplierType) =>
    s.quoteTypesProvided.some((qt) => new RegExp(supplierType.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(qt));

  const typeGroups = requiredSupplierTypes.map((typeObj) => ({
    supplierType: typeObj.supplierType,
    baseSupplierType: typeObj.baseType,
    suppliers: suppliers.filter((s) => {
      if (!typeMatches(s, typeObj.supplierType)) return false;
      if (!typeObj.hasMinMaxDimensions) return true;

      const limits = s.minMaxMeasurements?.[typeObj.baseType];
      if (!limits) return true;

      const { length, width, height } = dimensions;
      return (
        (length === null || (length >= limits.minLength && length <= limits.maxLength)) &&
        (width === null || (width >= limits.minWidth && width <= limits.maxWidth)) &&
        (height === null || (height >= limits.minHeight && height <= limits.maxHeight))
      );
    }),
    }));

  // Also include suppliers matched directly to the main form type (e.g. "Portal Frame")
  const mainFormGroup = {
    supplierType: formAnswers.formName,
    baseSupplierType: formAnswers.formName,
    suppliers: suppliers.filter((s) => typeMatches(s, formAnswers.formName)),
  };

  return [...typeGroups, mainFormGroup]
    .filter((group) => group.suppliers.length > 0)
    .map((group) => ({
      ...group,
      suppliers: lat && lng ? sortSuppliersByDistance(group.suppliers, { lat, lng }) : group.suppliers,
    }));
};

// ─── Main Entry Point ─────────────────────────────────────────────────────────

export const invoke = async ({ payload }) => {
  console.log(`Automation fired for ${formatFormName(payload)}, raw payload:`, JSON.stringify(payload));

  // ── Step 1: Parse the raw payload ──────────────────────────────────────────
  let form = prepareFormData(payload);
  const formName = formatFormName(payload)
  console.log("Parsed form – name:", form.formName, "| guid:", form.formGuid);

  if (!form.formGuid || !form.formName) {
    await handleErrors(`Form is missing required fields. name="${form.formName}" guid="${form.formGuid}"`);
    return {};
  }

  // ── Step 2: Fetch full form data from the CMS collection ──────────────────
  try {
    const collectionName = findCollectionName(form.formName);
    if (!collectionName) {
      await handleErrors(`Could not match form name "${form.formName}" to a CMS collection`);
      return {};
    }

    const [dbRecord] = await queryCMS(collectionName, [
      { filterField: "formGuid", filterValue: form.formGuid },
    ]);

    if (!dbRecord) {
      await handleErrors(`No DB record found for formGuid "${form.formGuid}" in "${collectionName}"`);
      return {};
    }

    form = { ...form, ...dbRecord };

    if (!form.lat || !form.lng) {
      const { lat, lng } = findLatLng(form);
      form.lat = lat;
      form.lng = lng;
    }

    if (!form.lat || !form.lng) console.warn(`No lat/lng for "${form.formGuid}" – distance sorting will be skipped`);

    console.log("Form data merged. lat:", form.lat, "lng:", form.lng);
  } catch (err) {
    console.error("Error in Step 2 (fetch form data):", err);
    await handleErrors(err.message);
    return {};
  }

  // ── Step 3: Find matching suppliers ───────────────────────────────────────
  let flatSuppliers = [];

  try {
    const supplierTypeList = await queryCMS("SupplierTypes", [], 250);
    const requiredTypes = getRequiredSupplierTypes(supplierTypeList, form);

    console.log("Required supplier types:", requiredTypes.map((t) => t.supplierType));

    const allSuppliers = await queryCMS("SupplierList", [
      { filterField: "isActive", filterValue: true },
      { filterField: "quoteTypesProvided", filterValue: requiredTypes.map((t) => t.supplierType), operator: "hasSome" },
    ], 250);

    console.log(`${allSuppliers.length} active suppliers retrieved`);

    // Flatten groups and deduplicate by _id so each supplier only gets one email
    const seenIds = new Set();
    flatSuppliers = filterSuppliers(allSuppliers, requiredTypes, form)
      .flatMap((group) => group.suppliers.map((s) => ({
        ...s,
        supplierType: group.supplierType,
        baseSupplierType: group.baseSupplierType,
      })))
      .filter((s) => !seenIds.has(s._id) && seenIds.add(s._id));

    console.log(`${flatSuppliers.length} suppliers after filtering and deduplication`);
  } catch (err) {
    console.error("Error in Step 3 (find suppliers):", err);
    await handleErrors(err.message);
    return {};
  }

  // ── Step 4: Build and send emails ─────────────────────────────────────────
  try {
    const emailForm = stringifyForm(form);
    const buildingSize = buildingSizes(form);

    console.log("building size -", buildingSize)

    const sizeString = [buildingSize.length, buildingSize.width, buildingSize.height]
      .filter(Boolean)
      .map((v) => `${v}${buildingSize.units}`)
      .join(" x ") || null;

    const projectType = `New ${formName} project`;

    for (const supplier of flatSuppliers) {
      console.log(`Sending email to ${supplier.supplierName} (${supplier.supplierType})`);
      await sendSupplierEmail("new_form_submission",
        { contactName: supplier.supplierName, contactId: supplier.contactId },
        {
          variables: {
            supplierName: supplier.supplierName,
            submittedName: `${form.firstName ?? ""} ${form.lastName ?? ""}`.trim(),
            submittedEmail: form.email ?? "",
            submittedPhone: form.phoneNumber ?? "No phone number provided",
            submittedType: projectType,
            buildingSize: sizeString ?? "N/A",
            submittedDistance: supplier.distanceInMetres ? Math.trunc(supplier.distanceInMetres / 1000) : "N/A",
            ...(emailForm["Fields"] && { formDetails: emailForm["Fields"] }),
            ...(emailForm["Form Contact"] && { formContact: emailForm["Form Contact"] }),
          }
        },
      );
      }
  } catch (err) {
    console.error("Error in Step 4 (send emails):", err);
    await handleErrors(err.message);
  }

  // The function must return an empty object, do not delete
  return {};
};
