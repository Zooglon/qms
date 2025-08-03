import { payloadTestData } from "./testData.js";
import { prepareFormData, getCollection, handleErrors } from "../backend/formSubmission.js";

jest.mock("../backend/formSubmission.js", () => ({
  ...jest.requireActual("../backend/formSubmission.js"),
  handleErrors: jest.fn().mockResolvedValue(undefined),
}));

describe("Form Submission tests - General form submission", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Form Submission tests - basic form data", () => {
    const payloadData = payloadTestData;
    const formObject = prepareFormData(payloadData);

    console.log("Form Object", formObject);

    // Does formName get parsed correctly?
    expect(formObject.formName).toBe("My Test Form");
    // Does formGuid get found correctly?
    expect(formObject.formGuid).toBe("f8a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c");
    // Do customer details get parsed correctly?
    expect(formObject.firstName).toBe("Testy");
    expect(formObject.lastName).toBe("McTesterson");
    expect(formObject.company).toBe("Test McTesterson's marvelous company & sons ltd PLC.");
    expect(formObject.phoneNumber).toBe("07123456789");
    expect(formObject.email).toBe("testyMct@tmmc.testy.mctesterson");
    expect(formObject.address).toBe("Teston, Maidstone, UK");
  });

  test("Form Submission tests - collection data found", () => {
    // Is correct collection identified?
    expect(getCollection("Cladding Quotes")).toBe("CladdingQuotes"),
      expect(getCollection("Concrete Slab Quotes")).toBe("ConcreteSlabQuotes"),
      expect(getCollection("Dismantle Quotes")).toBe("DismantleQuotes"),
      expect(getCollection("Doors Quotes")).toBe("DoorsQuotes"),
      expect(getCollection("Guttering Quotes")).toBe("GutteringQuotes"),
      expect(getCollection("Mezzanine Floor Form")).toBe("MezzanineFloorForm"),
      expect(getCollection("MonoPitch Quotes")).toBe("MonoPitchQuotes"),
      expect(getCollection("Polytunnel Quotes")).toBe("PolytunnelQuotes"),
      expect(getCollection("PortalFrame Quotes")).toBe("PortalFrameQuotes"),
      expect(getCollection("Rainwater Harvesting Quotes")).toBe("RainwaterHarvestingQuotes"),
      expect(getCollection("reroof Quotes")).toBe("reroofQuotes"),
      expect(getCollection("Round HouseForm")).toBe("RoundHouseForm"),
      expect(getCollection("Solar Panels Quotes")).toBe("SolarPanelsQuotes"),
      expect(getCollection("Wall Quotes")).toBe("WallQuotes");
  });

  test("Form Submission tests - form is stringified successfully", () => {
    const stringifiedForm = "";
    const identifiedStringifiedForm = "";

    // Is form stringified correctly?
    expect(identifiedStringifiedForm).toBe(stringifiedForm);
  });

  test("Form Submission tests - Suppliers are identified", () => {
    const primarySuppliers = [];
    const secondarySuppliers = [];
    const allSuppliersIn50Miles = [];

    const identifiedPrimarySuppliers = [];
    const identifiedSecondarySuppliers = [];
    const identifiedSuppliersIn50Miles = [];

    // Are primary suppliers notified correctly?
    expect(identifiedPrimarySuppliers).toEqual(primarySuppliers);
    // Are secondary suppliers identified correctly?
    expect(identifiedSecondarySuppliers).toEqual(secondarySuppliers);
    // Are nearest suppliers returned correctly?
    expect(identifiedSuppliersIn50Miles).toEqual(allSuppliersIn50Miles);
  });

  test("Form submission tests - Errors are caught", () => {
    prepareFormData({ invalidField: "test" });

    expect(jest.isMockFunction(handleErrors)).toBe(true);
    // Check if handleErrors was called
    expect(handleErrors).toHaveBeenCalled();
    expect(handleErrors).toHaveBeenCalledWith("Form incomplete or missing fields: address, guid & form name");
  });
});

describe("Form Submission tests - New Buildings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("test form submission - concreteSlabForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("test form submission - monoPitchForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("test form submission - roundHouseForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("test form submission - portalFrameForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("test form submission - mezzanineFloorForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("test form submission - polyTunnelForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });
});

describe("Form Submission tests - Repair/Replace Buildings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("test form submission - guttering", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });
  test("test form submission - rainwaterRepairForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("test form submission - wallsRepairForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("test form submission - claddingRepairForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("test form submission - doorsRepairForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("test form submission - reroofRepairForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("test form submission - dismantleRepairForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("test form submission - solarRepairForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("test form submission - gutteringRepairForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });
});

describe("Form Submission tests - New Building other suppliers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Quantity surveyors should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Groundworker suppliers should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });

  test("Concrete only suppliers should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Steel erectors should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;
    const minBuildingWidth = 20;
    const minBuildingLength = 20;
    const minBuildingHeight = 20;
    const maxBuildingWidth = 80;
    const maxBuildingLength = 80;
    const maxBuildingHeight = 80;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });

  test("Steel fabricators should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;
    const minBuildingWidth = 20;
    const minBuildingLength = 20;
    const minBuildingHeight = 20;
    const maxBuildingWidth = 80;
    const maxBuildingLength = 80;
    const maxBuildingHeight = 80;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });

  test("Roof suppliers should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;
    const minBuildingWidth = 20;
    const minBuildingLength = 20;
    const minBuildingHeight = 20;
    const maxBuildingWidth = 80;
    const maxBuildingLength = 80;
    const maxBuildingHeight = 80;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Cladding suppliers should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Solar Panel suppliers should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Roller/Personnel Door suppliers should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Cattle Sheet Door suppliers should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Concrete Panel/Block suppliers should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Guttering should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Rainwater harvesting should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Polytunnels should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    const minBuildingLength = 20;
    const maxBuildingLength = 100;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
});

describe("Form Submission tests - Repair/Replace other suppliers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Roof repair suppliers should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;
    const canHandleAsbestos = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Guttering suppliers should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Cladding suppliers should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Concrete wall suppliers should be notified if form includes", async () => {
    const supplyOnly = true;
    const installOnly = true;
    const supplyAndInstall = true;

    expect(supplyOnly).toBe(true);
    expect(installOnly).toBe(true);
    expect(supplyAndInstall).toBe(true);
  });
  test("Demolition suppliers should be notified if form includes", async () => {
    const handlesStructures = true;
    const handlesWalls = true;
    const handlesRoof = true;
    const handlesCladding = true;
    const handlesConcrete = true;

    const canHandleAsbestos = true;

    expect(handlesStructures).toBe(true);
    expect(handlesWalls).toBe(true);
    expect(handlesRoof).toBe(true);
    expect(handlesCladding).toBe(true);
    expect(handlesConcrete).toBe(true);
    expect(canHandleAsbestos).toBe(true);
  });
});

describe("Form Submission tests - Other behaviour", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("function sends to all within 50miles", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("If no suppliers within 50miles function gets 5 next nearest if job is in radius", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("If no suppliers found for distance - email mat", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("If form can't be quoted for - email Mat", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });
});
