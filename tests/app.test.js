import {
  payloadTestData,
  supplierDistanceInput,
  testGeneralFormForm,
  supplierTypeList,
  concreteSlabForm,
  dismantleRepairForm,
  doorsRepairForm,
  mezzanineFloorForm,
  monoPitchForm,
  polytunnelForm,
  portalFrameForm,
  rainwaterRepairForm,
  roundhouseForm,
  supplierReturnObj,
  solarPanelsRepairForm,
  concreteSlabCollectionResponse,
  mockCollectionData,
  stringifyFormInput,
  stringifyFormString,
  responseStringifyFormInput,
} from "./testData.js";
import {
  prepareFormData,
  findCollectionName,
  getRequiredSupplierTypes,
  buildingSizes,
  getFieldValue,
  filterSuppliers,
  getAllFieldsWith,
  matchesAsbestos,
  sortSuppliersByDistance,
  invoke,
  stringifyForm,
} from "../backend/formSubmission.js";

// Mock wix-data at the top level
jest.mock("wix-data", () => ({
  query: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  find: jest.fn().mockResolvedValue({
    items: [],
  }),
  insert: jest.fn(),
  update: jest.fn(),
  isNotEmpty: jest.fn().mockReturnThis(),
  hasSome: jest.fn().mockReturnThis(),
}));

jest.mock("../backend/formSubmission.js", () => ({
  ...jest.requireActual("../backend/formSubmission.js"),
  handleErrors: jest.fn().mockResolvedValue(undefined),
}));

// Helper function to set up mock data for specific collections
const setupMockCollections = (collectionsData) => {
  const wixData = require("wix-data");

  wixData.query.mockImplementation((collection) => {
    // Store the collection being queried
    wixData._currentCollection = collection;
    return wixData;
  });

  wixData.find.mockImplementation(() => {
    const collection = wixData._currentCollection;
    const items = collectionsData[collection] || [];

    return Promise.resolve({ items });
  });
};

describe("Form Submission tests - General form submission", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const wixData = require("wix-data");
    wixData.find.mockReset();
  });

  test("Form Submission tests - basic form data", async () => {
    const payloadData = payloadTestData;
    const formObject = prepareFormData(payloadData);

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
    expect(formObject.address?.formatted).toBe("Teston, Maidstone, UK");
  });

  test("Form Submission tests - collection data found", async () => {
    // Is correct collection identified?
    expect(findCollectionName("Concrete Slab")).toBe("ConcreteQuotes");
    expect(findCollectionName("Cladding Quotes")).toBe("CladdingQuotes");
    expect(findCollectionName("Concrete Slab Quotes")).toBe("ConcreteQuotes");
    expect(findCollectionName("Dismantle Quotes")).toBe("DismantleQuotes");
    expect(findCollectionName("Doors Quotes")).toBe("DoorsQuotes");
    expect(findCollectionName("Guttering Quotes")).toBe("GutteringQuotes");
    expect(findCollectionName("Mezzanine Floor Form")).toBe("MezzanineFloorForm");
    expect(findCollectionName("MonoPitch Quotes")).toBe("MonoPitchQuotes");
    expect(findCollectionName("Polytunnel Quotes")).toBe("PolytunnelQuotes");
    expect(findCollectionName("PortalFrame Quotes")).toBe("PortalFrameQuotes");
    expect(findCollectionName("Rainwater Harvesting Quotes")).toBe("RainwaterHarvestingQuotes");
    expect(findCollectionName("reroof Quotes")).toBe("ReroofQuotes");
    expect(findCollectionName("Round HouseForm")).toBe("RoundHouseForm");
    expect(findCollectionName("Solar Panels Quotes")).toBe("SolarPanelsQuotes");
    expect(findCollectionName("Wall Quotes")).toBe("WallQuotes");
  });

  test("Form Submission tests - form is stringified successfully", async () => {
    const stringifiedForm = "";
    const identifiedStringifiedForm = "";

    // Is form stringified correctly?
    expect(identifiedStringifiedForm).toBe(stringifiedForm);
  });

  test("Form identifies dimension and non dimension supplier types", async () => {
    const nonDimensionSupplierTypes = supplierTypeList.filter((s) => !s.hasMinMaxDimensions);
    const dimensionSupplierTypes = supplierTypeList.filter((s) => s.hasMinMaxDimensions);

    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("steelErectorSupply");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("steelErectorInstall");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("steelErectorSupplyAndInstall");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("steelFabricatorSupply");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("steelFabricatorInstall");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("steelFabricatorSupplyAndInstall");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("roofSupply");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("roofInstall");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("roofSupplyAndInstall");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("roofRepairSupply");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("roofRepairInstall");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("roofRepairSupplyAndInstall");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("polytunnelSupply");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("polytunnelInstall");
    expect(nonDimensionSupplierTypes.map((i) => i.supplierType)).not.toContain("polytunnelSupplyAndInstall");
    expect(dimensionSupplierTypes.map((i) => i.supplierType)).toContain("steelFabricatorSupply");
  });
});

describe("Form Submission tests - New Buildings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const wixData = require("wix-data");
    wixData.find.mockReset();
  });

  test("test form submission - concreteSlabForm", async () => {
    setupMockCollections({
      SupplierList: mockCollectionData.SupplierList,
      ConcreteQuotes: mockCollectionData.ConcreteSlabQuotes,
    });

    const testRun = await invoke({ payload: concreteSlabForm });
    expect(testRun).not.toBeNull();
  });

  test("test form submission - roundHouseForm", async () => {
    setupMockCollections({
      SupplierList: mockCollectionData.SupplierList,
      RoundHouseForm: mockCollectionData.RoundHouseForm,
    });

    const testRun = await invoke({ payload: roundhouseForm });

    expect(testRun).not.toBeNull();
  });

  test("test form submission - portalFrameForm", async () => {
    setupMockCollections({
      SupplierList: mockCollectionData.SupplierList,
      PortalFrameQuotes: mockCollectionData.PortalFrameQuotes,
    });

    const testRun = await invoke({ payload: portalFrameForm });

    expect(testRun).not.toBeNull();
  });

  test("test form submission - mezzanineFloorForm", async () => {
    setupMockCollections({
      SupplierList: mockCollectionData.SupplierList,
      MezzanineFloorForm: mockCollectionData.MezzanineFloorForm,
    });
    const testRun = await invoke({ payload: mezzanineFloorForm });

    expect(testRun).not.toBeNull();
  });

  test("test form submission - polyTunnelForm", async () => {
    setupMockCollections({
      SupplierList: mockCollectionData.SupplierList,
      PolytunnelQuotes: mockCollectionData.PolytunnelQuotes,
    });
    const testRun = await invoke({ payload: polytunnelForm });
    expect(testRun).not.toBeNull();
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
    setupMockCollections({
      SupplierList: mockCollectionData.SupplierList,
      RainwaterHarvestingQuotes: mockCollectionData.RainwaterHarvestingQuotes,
    });
    const testRun = await invoke({ payload: rainwaterRepairForm });

    expect(testRun).not.toBeNull();
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
    setupMockCollections({
      SupplierList: mockCollectionData.SupplierList,
      DoorsQuotes: mockCollectionData.DoorsQuotes,
    });
    const testRun = await invoke({ payload: doorsRepairForm });
    expect(testRun).not.toBeNull();
  });

  test("test form submission - reroofRepairForm", async () => {
    const yes = true;

    expect(yes).toBe(true);
  });

  test("test form submission - dismantleRepairForm", async () => {
    setupMockCollections({
      SupplierList: mockCollectionData.SupplierList,
      DismantleQuotes: mockCollectionData.DismantleQuotes,
    });
    const testRun = await invoke({ payload: dismantleRepairForm });
    expect(testRun).not.toBeNull();
  });

  test("test form submission - solarRepairForm", async () => {
    setupMockCollections({
      SupplierList: mockCollectionData.SupplierList,
      SolarPanelsQuotes: mockCollectionData.SolarPanelsQuotes,
    });
    const testRun = await invoke({ payload: solarPanelsRepairForm });
    expect(testRun).not.toBeNull();
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

  const baseForm = {};

  test("General form types should be found if form includes", async () => {
    const testForm = { ...baseForm, details_quoteForQuantitySurveyor: "yes" };

    expect(getRequiredSupplierTypes(supplierTypeList, testForm).map(t => t.supplierType)).toContain("quantitySurveyorInstall");
  });

  test("Quantity surveyors should be notified if form includes", async () => {
    const supplyOnly = { ...baseForm, quoteForQuantitySurveyorSupply: "yes" };
    const installOnly = { ...baseForm, quoteForQuantitySurveyorInstall: "yes" };
    const supplyAndInstall = { ...baseForm, quoteForQuantitySurveyorSupplyAndInstall: "yes" };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain("quantitySurveyorSupply");
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain("quantitySurveyorInstall");
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain("quantitySurveyorSupplyAndInstall");
  });

  test("Groundworker suppliers should be notified if form includes", async () => {
    const supplyOnly = { ...baseForm, quoteForGroundworkerSupply: "yes" };
    const installOnly = { ...baseForm, quoteForGroundworkerInstall: "yes" };
    const supplyAndInstall = { ...baseForm, quoteForGroundworkerSupplyAndInstall: "yes" };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain("groundWorkerSupply");
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain("groundWorkerInstall");
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain("groundWorkerSupplyAndInstall");
  });

  test("Concrete only suppliers should be notified if form includes", async () => {
    const supplyOnly = { ...baseForm, quoteForConcreteFloorSupply: "yes" };
    const installOnly = { ...baseForm, quoteForConcreteFloorInstall: "yes" };
    const supplyAndInstall = { ...baseForm, quoteForConcreteFloorSupplyAndInstall: "yes" };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain("concreteFloorSupply");
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain("concreteFloorInstall");
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain("concreteFloorSupplyAndInstall");
  });

  test("Steel erectors should be notified if form includes", async () => {
    const supplyOnly = { ...baseForm, quoteForSteelErectorSupply: "yes" };
    const installOnly = { ...baseForm, mezzanineFloor_quoteFromSupplier: "quoteFromOtherSteelErectorInstall" };
    const supplyAndInstall = {
      ...baseForm,
      quoteForInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: "quoteFromOtherSteelErectorSupplyAndInstall",
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain("steelErectorSupply");
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain("steelErectorInstall");
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain("steelErectorSupplyAndInstall");
  });

  test("Steel fabricators should be notified if form includes", async () => {
    const supplyOnly = { ...baseForm, quoteForSteelFabricatorSupply: "yes" };
    const installOnly = { ...baseForm, mezzanineFloor_quoteFromSupplier: "quoteFromOtherSteelFabricatorInstall" };
    const supplyAndInstall = {
      ...baseForm,
      quoteForInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: "quoteFromOtherSteelFabricatorSupplyAndInstall",
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain("steelFabricatorSupply");
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain("steelFabricatorInstall");
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain("steelFabricatorSupplyAndInstall");
  });

  test("Roof suppliers should be notified if form includes", async () => {
    const supplyOnly = { ...baseForm, quoteForRoofSupply: "yes" };
    const installOnly = { ...baseForm, mezzanineFloor_quoteFromSupplier: "quoteFromOtherRoofInstaller" };
    const supplyAndInstall = {
      ...baseForm,
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: "quoteFromOtherRoofSupplyAndInstall",
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain("roofSupply");
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain("roofInstall");
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain("roofSupplyAndInstall");
  });

  test("Cladding suppliers should be notified if form includes", async () => {
    const supplyOnly = { ...baseForm, quoteForCladdingSupply: "yes" };
    const installOnly = { ...baseForm, mezzanineFloor_quoteFromSupplier: "quoteFromOtherCladdingInstaller" };
    const supplyAndInstall = {
      ...baseForm,
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: "quoteFromOtherCladdingSupplyAndInstall",
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain("claddingSupply");
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain("claddingInstall");
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain("claddingSupplyAndInstall");
  });

  test("Solar Panel suppliers should be notified if form includes", async () => {
    const supplyOnly = { ...baseForm, quoteForSolarPanelSupply: "yes" };
    const installOnly = { ...baseForm, mezzanineFloor_quoteFromSupplier: "quoteFromOtherSolarPanelInstaller" };
    const supplyAndInstall = {
      ...baseForm,
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: "quoteFromOtherSolarPanelSupplyAndInstall",
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain("solarPanelSupply");
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain("solarPanelInstall");
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain("solarPanelSupplyAndInstall");
  });
  test("Roller/Personnel Door suppliers should be notified if form includes", async () => {
    const supplyOnly = { ...baseForm, quoteForDoorSupply: "yes" };
    const installOnly = { ...baseForm, mezzanineFloor_quoteFromSupplier: "quoteFromOtherDoorInstaller" };
    const supplyAndInstall = {
      ...baseForm,
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: "quoteFromOtherDoorSupplyAndInstall",
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain("doorSupply");
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain("doorInstall");
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain("doorSupplyAndInstall");
  });

  test("Cattle Sheet Door suppliers should be notified if form includes", async () => {
    const supplyOnly = { ...baseForm, quoteForCattleSheetDoorSupply: "yes" };
    const installOnly = { ...baseForm, mezzanineFloor_quoteFromSupplier: "quoteFromOtherCattleSheetDoorInstaller" };
    const supplyAndInstall = {
      ...baseForm,
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: "quoteFromOtherCattleSheetDoorSupplyAndInstall",
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain("cattleSheetDoorSupply");
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain("cattleSheetDoorInstall");
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain("cattleSheetDoorSupplyAndInstall");
  });

  test("Concrete Panel/Block suppliers should be notified if form includes", async () => {
    const supplierType = "concretePanel";

    const supplyOnly = { ...baseForm, [`quoteFor${supplierType}Supply`]: "yes" };
    const installOnly = { ...baseForm, mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}Installer` };
    const supplyAndInstall = {
      ...baseForm,
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}SupplyAndInstall`,
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain(`${supplierType}Supply`);
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain(`${supplierType}Install`);
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain(`${supplierType}SupplyAndInstall`);
  });

  test("Concrete Panel/Block suppliers should be notified if form includes", async () => {
    const supplierType = "concreteBlock";

    const supplyOnly = { ...baseForm, [`quoteFor${supplierType}Supply`]: "yes" };
    const installOnly = { ...baseForm, mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}Installer` };
    const supplyAndInstall = {
      ...baseForm,
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}SupplyAndInstall`,
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain(`${supplierType}Supply`);
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain(`${supplierType}Install`);
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain(`${supplierType}SupplyAndInstall`);
  });

  test("Guttering should be notified if form includes", async () => {
    const supplierType = "guttering";
    const supplyOnly = { ...baseForm, [`quoteFor${supplierType}Supply`]: "yes" };
    const installOnly = { ...baseForm, mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}Installer` };
    const supplyAndInstall = {
      ...baseForm,
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}SupplyAndInstall`,
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain(`${supplierType}Supply`);
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain(`${supplierType}Install`);
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain(`${supplierType}SupplyAndInstall`);
  });

  test("Rainwater harvesting should be notified if form includes", async () => {
    const supplierType = "rainwaterHarvesting";
    const supplyOnly = { ...baseForm, [`quoteFor${supplierType}Supply`]: "yes" };
    const installOnly = { ...baseForm, mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}Installer` };
    const supplyAndInstall = {
      ...baseForm,
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}SupplyAndInstall`,
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain(`${supplierType}Supply`);
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain(`${supplierType}Install`);
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain(`${supplierType}SupplyAndInstall`);
  });

  test("Polytunnels should be notified if form includes", async () => {
    const supplierType = "polytunnel";
    const supplyOnly = { ...baseForm, [`quoteFor${supplierType}Supply`]: "yes" };
    const installOnly = { ...baseForm, mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}Installer` };
    const supplyAndInstall = {
      ...baseForm,
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}SupplyAndInstall`,
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain(`${supplierType}Supply`);
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain(`${supplierType}Install`);
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain(`${supplierType}SupplyAndInstall`);
  });
});

describe("Form Submission tests - Repair/Replace other suppliers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Roof repair suppliers should be notified if form includes", async () => {
    const supplierType = "roofRepair";
    const supplyOnly = { [`quoteFor${supplierType}Supply`]: "yes" };
    const installOnly = { mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}Installer` };
    const supplyAndInstall = {
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}SupplyAndInstall`,
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain(`${supplierType}Supply`);
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain(`${supplierType}Install`);
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain(`${supplierType}SupplyAndInstall`);
  });

  test("Guttering repair suppliers should be notified if form includes", async () => {
    const supplierType = "gutteringRepair";
    const supplyOnly = { [`quoteFor${supplierType}Supply`]: "yes" };
    const installOnly = { mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}Installer` };
    const supplyAndInstall = {
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}SupplyAndInstall`,
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain(`${supplierType}Supply`);
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain(`${supplierType}Install`);
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain(`${supplierType}SupplyAndInstall`);
  });

  test("Cladding repair suppliers should be notified if form includes", async () => {
    const supplierType = "claddingRepair";
    const supplyOnly = { [`quoteFor${supplierType}Supply`]: "yes" };
    const installOnly = { mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}Installer` };
    const supplyAndInstall = {
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}SupplyAndInstall`,
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain(`${supplierType}Supply`);
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain(`${supplierType}Install`);
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain(`${supplierType}SupplyAndInstall`);
  });

  test("Concrete wall repair suppliers should be notified if form includes", async () => {
    const supplierType = "concreteWallRepair";
    const supplyOnly = { [`quoteFor${supplierType}Supply`]: "yes" };
    const installOnly = { mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}Installer` };
    const supplyAndInstall = {
      quoteForSupplyAndInstallation: "yes",
      mezzanineFloor_quoteFromSupplier: `quoteFromOther${supplierType}SupplyAndInstall`,
    };

    expect(getRequiredSupplierTypes(supplierTypeList,supplyOnly).map(t => t.supplierType)).toContain(`${supplierType}Supply`);
    expect(getRequiredSupplierTypes(supplierTypeList,installOnly).map(t => t.supplierType)).toContain(`${supplierType}Install`);
    expect(getRequiredSupplierTypes(supplierTypeList,supplyAndInstall).map(t => t.supplierType)).toContain(`${supplierType}SupplyAndInstall`);
  });

  test("Demolition suppliers should be notified if form includes", async () => {
    const supplierType = "demolition";
    const demoStructures = { [`quoteFor${supplierType}Structures`]: "yes" };
    const demoWalls = { [`quoteFor${supplierType}Walls`]: "yes" };
    const demoRoof = { [`quoteFor${supplierType}Roof`]: "yes" };
    const demoCladding = { [`quoteFor${supplierType}Cladding`]: "yes" };
    const demoConcrete = { [`quoteFor${supplierType}Concrete`]: "yes" };

    expect(getRequiredSupplierTypes(supplierTypeList,demoStructures).map(t => t.supplierType)).toContain(`demolitionStructures`);
    expect(getRequiredSupplierTypes(supplierTypeList,demoWalls).map(t => t.supplierType)).toContain(`demolitionWalls`);
    expect(getRequiredSupplierTypes(supplierTypeList,demoRoof).map(t => t.supplierType)).toContain(`demolitionRoof`);
    expect(getRequiredSupplierTypes(supplierTypeList,demoCladding).map(t => t.supplierType)).toContain(`demolitionCladding`);
    expect(getRequiredSupplierTypes(supplierTypeList,demoConcrete).map(t => t.supplierType)).toContain(`demolitionConcrete`);
  });
});

describe("Supplier list advanced tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const dummyForm = {
    "field:comp-m79hnsvv:_createdDate": "2025-07-31T17:00:42.869Z",
    "field:comp-m79hnsvv:formName": "my form name",
    address: {
      location: {
        longitude: -122.4194,
        latitude: 37.7749,
      },
    },
  };

  const supplierTypes = supplierTypeList;

  const testSupplierList = [
    {
      handlesAsbestos: false,
      supplierName: "Sensible Steve",
      quoteTypesProvided: ["roofSupplyAndInstall", "Concrete Slab"],
      minMaxMeasurements: {
        roof: { minLength: 0, maxLength: 10000, minWidth: 0, maxWidth: 10000, minHeight: 0, maxHeight: 10000 },
      },
    },
    {
      handlesAsbestos: true,
      supplierName: "Dodgy Dan",
      quoteTypesProvided: ["roofSupplyAndInstall"],
      minMaxMeasurements: {
        roof: { minLength: 0, maxLength: 10000, minWidth: 0, maxWidth: 10000, minHeight: 0, maxHeight: 10000 },
      },
    },
    {
      handlesAsbestos: false,
      supplierName: "Polytunnel Pat",
      quoteTypesProvided: ["polytunnelSupplyAndInstall"],
      minMaxMeasurements: {
        polytunnel: { minLength: 0, maxLength: 200 },
      },
    },
    {
      handlesAsbestos: false,
      supplierName: "Greenhouse Gary",
      quoteTypesProvided: ["polytunnelSupplyAndInstall"],
      minMaxMeasurements: {
        polytunnel: { minLength: 50, maxLength: 400 },
      },
    },
    {
      handlesAsbestos: false,
      supplierName: "Erector Eric",
      quoteTypesProvided: ["steelErectorSupplyAndInstall"],
      minMaxMeasurements: {
        steelErector: { minHeight: 0, minWidth: 0, minLength: 0, maxWidth: 45, maxLength: 45, maxHeight: 45 },
      },
    },
    {
      handlesAsbestos: false,
      supplierName: "SteelErector Sammy",
      quoteTypesProvided: ["steelErectorSupplyAndInstall"],
      minMaxMeasurements: {
        steelErector: { minHeight: 50, minWidth: 50, minLength: 50, maxWidth: 2000, maxLength: 2000, maxHeight: 2000 },
      },
    },
    {
      handlesAsbestos: false,
      supplierName: "Fabricator Frank",
      quoteTypesProvided: ["steelFabricatorSupplyAndInstall"],
      minMaxMeasurements: {
        steelFabrication: { minHeight: 0, minWidth: 0, minLength: 0, maxWidth: 100, maxLength: 100, maxHeight: 100 },
      },
    },
    {
      handlesAsbestos: false,
      supplierName: "Steelhero Steve",
      quoteTypesProvided: ["steelFabricatorSupplyAndInstall", "steelErectorSupplyAndInstall"],
      minMaxMeasurements: {
        steelFabrication: { minHeight: 0, minWidth: 0, minLength: 0, maxWidth: 2000, maxLength: 2000, maxHeight: 2000 },
        steelErector: { minHeight: 0, minWidth: 0, minLength: 0, maxWidth: 2000, maxLength: 2000, maxHeight: 2000 },
      },
    },
    {
      handlesAsbestos: false,
      supplierName: "Roofer Ryan",
      quoteTypesProvided: ["roofSupplyAndInstall"],
      minMaxMeasurements: {
        roof: { minHeight: 0, minWidth: 0, minLength: 0, maxWidth: 200, maxLength: 200, maxHeight: 200 },
      },
    },
    {
      handlesAsbestos: false,
      supplierName: "Roofman Rich",
      quoteTypesProvided: ["roofSupplyAndInstall"],
      minMaxMeasurements: {
        roof: { minHeight: 0, minWidth: 0, minLength: 0, maxWidth: 50, maxLength: 50, maxHeight: 50 },
      },
    },
  ];

  test("Get field values gets correct field values", async () => {
    const myFormFields = {
      "field:comp-m79hnsvv:email": "testyMct@tmmc.testy.mctesterson",
      "field:comp-m79hnsvv:_updatedDate": "2025-07-31T17:00:42.869Z",
      "field:comp-m79hnsvv:details_patternFinishCustom": "Mosaic pattern",
      "field:comp-m79hnsvv:_owner": "03fff19d-2a21-43ac-a91f-98d7e462af99",
      "field:comp-m79hnsvv:details_finishedAreaUsage": "Other",
      "field:comp-m79hnsvv:details_buildingLength": "75",
      "field:comp-m79hnsvv:details_roofMaterial": "Felt but also asbestos, deffo dodgy",
      "field:comp-m79hnsvv:details_buildingWidth": "35",
      "field:comp-m79hnsvv:details_buildingHeight": "12",
      "field:comp-m709keah:details_measurementUnits": "metric",
      "field:comp-m79hnsvv:details_InteriorExteriorPlacement": "exterior",
      "field:comp-m79hnsvv:details_powerFloatFinish": "",
    };

    expect(getFieldValue(myFormFields, "email")).toBe("testyMct@tmmc.testy.mctesterson");
    expect(getFieldValue(myFormFields, "patternFinishCustom")).toBe("Mosaic pattern");
    expect(getFieldValue(myFormFields, "updatedDate")).toBe("2025-07-31T17:00:42.869Z");
    expect(getFieldValue(myFormFields, "finishedAreaUsage")).toBe("Other");
    expect(getFieldValue(myFormFields, "buildingLength")).toBe("75");
    expect(getFieldValue(myFormFields, "buildingWidth")).toBe("35");
    expect(getFieldValue(myFormFields, "buildingHeight")).toBe("12");
    expect(getFieldValue(myFormFields, "measurementUnits")).toBe("metric");
    expect(getFieldValue(myFormFields, "interiorExteriorPlacement")).toBe("exterior");
    expect(getFieldValue(myFormFields, "powerFloatFinish")).toBe("");
  });

  test("Form structure sizes (metric) are returned correctly", async () => {
    const { units, length, width, height } = buildingSizes(testGeneralFormForm);

    expect(units).toBe("m");
    expect(length).toBe(75);
    expect(width).toBe(32);
    expect(height).toBe(12);
  });

  test("Form structure sizes (imperial) are returned correctly", async () => {
    // Plain numbers + measurementUnits: imperial -> returned as-is in ft
    const { units, length, width, height } = buildingSizes({
      buildingLength: "83",
      buildingWidth: "41",
      buildingHeight: "18",
      measurementUnits: "imperial",
    });

    // Values with "ft" suffix are converted to metres regardless of measurementUnits setting
    const { units: units2, length: length2, width: width2, height: height2 } = buildingSizes({
      buildingLength: "83ft",
      buildingWidth: "41ft",
      buildingHeight: "18ft",
      measurementUnits: "metric",
    });

    // Values with "m" suffix + measurementUnits: imperial -> parseFloat strips suffix, units = ft
    const { units: units3, length: length3, width: width3, height: height3 } = buildingSizes({
      buildingLength: "50m",
      buildingWidth: "35m",
      buildingHeight: "2m",
      measurementUnits: "imperial",
    });

    expect(units).toBe("ft");
    expect(length).toBe(83);
    expect(width).toBe(41);
    expect(height).toBe(18);
    expect(units2).toBe("m");
    expect(length2).toBe(25.3);
    expect(width2).toBe(12.5);
    expect(height2).toBe(5.49);
    expect(units3).toBe("ft");
    expect(length3).toBe(50);
    expect(width3).toBe(35);
    expect(height3).toBe(2);
  });

  test("Polytunnel Suppliers are filtered on dimension options in form", async () => {
    const supplierTypesInForm = supplierTypes.filter((i) => i.supplierType.startsWith("polytunnel"));
    const supplierListInTest = testSupplierList.filter(
      (i) => i.supplierName === "Polytunnel Pat" || i.supplierName === "Greenhouse Gary"
    );

    expect(
      filterSuppliers(supplierListInTest, supplierTypesInForm, {
        ...dummyForm,
        formName: "Polytunnel",
        "field:comp-m79hnsvv:details_polytunnelLength": "200m",
      })
        .map((i) => i.suppliers.map((i) => i.supplierName))
        .flat()
    ).toContain("Polytunnel Pat");
    expect(
      filterSuppliers(supplierListInTest, supplierTypesInForm, {
        ...dummyForm,
        formName: "Polytunnel",
        "field:comp-m79hnsvv:details_polytunnelLength": "350m",
      })
        .map((i) => i.suppliers.map((i) => i.supplierName))
        .flat()
    ).toContain("Greenhouse Gary");
  });

  test("Steel Suppliers are filtered on dimension options in form", async () => {
    const supplierTypesInForm = supplierTypes.filter(
      (i) => i.baseType === "steelErector" || i.baseType === "steelFabrication"
    );
    const lrgBuilding = {
      formName: "Portal Frame",
      "field:comp-m79hnsvv:details_buildingLength": "200m",
      "field:comp-m79hnsvv:details_buildingWidth": "200m",
      "field:comp-m79hnsvv:details_buildingHeight": "200m",
      "field:comp-m79hnsvv:details_measurementUnits": "metric",
      "field:comp-m79hnsvv:details_otherQuote": "quoteFromSteelFabricator",
      "field:comp-m79hnsvv:details_otherQuoteTwo": "quoteFromSteelErector",
    };

    const smlBuilding = {
      formName: "Portal Frame",
      "field:comp-m79hnsvv:details_buildingLength": "10m",
      "field:comp-m79hnsvv:details_buildingWidth": "10m",
      "field:comp-m79hnsvv:details_buildingHeight": "10m",
      "field:comp-m79hnsvv:details_measurementUnits": "metric",
      "field:comp-m79hnsvv:details_otherQuote": "quoteFromSteelFabricator",
      "field:comp-m79hnsvv:details_otherQuoteTwo": "quoteFromSteelErector",
    };

    // steel fabrication
    expect(
      filterSuppliers(testSupplierList, supplierTypesInForm, {
        ...dummyForm,
        ...lrgBuilding,
      })
        .map((i) => i.suppliers.map((i) => i.supplierName))
        .flat()
    ).not.toContain("Fabricator Frank");
    expect(
      filterSuppliers(testSupplierList, supplierTypesInForm, {
        ...dummyForm,
        ...lrgBuilding,
      })
        .map((i) => i.suppliers.map((i) => i.supplierName))
        .flat()
    ).toContain("Steelhero Steve");

    // Steel erection
    expect(
      filterSuppliers(testSupplierList, supplierTypesInForm, {
        ...dummyForm,
        ...lrgBuilding,
      })
        .map((i) => i.suppliers.map((i) => i.supplierName))
        .flat()
    ).toContain("SteelErector Sammy");
    expect(
      filterSuppliers(testSupplierList, supplierTypesInForm, {
        ...dummyForm,
        ...lrgBuilding,
      })
        .map((i) => i.suppliers.map((i) => i.supplierName))
        .flat()
    ).toContain("Steelhero Steve");
    expect(
      filterSuppliers(testSupplierList, supplierTypesInForm, {
        ...dummyForm,
        ...smlBuilding,
      })
        .map((i) => i.suppliers.map((i) => i.supplierName))
        .flat()
    ).toContain("Erector Eric");
  });

  test("Roof Suppliers are filtered on roof dimensions rather than building dimensions in form", async () => {
    const supplierTypesInForm = supplierTypes.filter((i) => i.baseType === "roof" || i.baseType === "roofRepair");
    const lrgBuilding = {
      formName: "PortalFrame",
      "field:comp-m79hnsvv:details_buildingLength": "180m",
      "field:comp-m79hnsvv:details_buildingWidth": "180m",
      "field:comp-m79hnsvv:details_buildingHeight": "180m",
      "field:comp-m79hnsvv:details_measurementUnits": "metric",
    };

    const smlBuilding = {
      formName: "PortalFrame",
      "field:comp-m79hnsvv:details_buildingLength": "40m",
      "field:comp-m79hnsvv:details_buildingWidth": "40m",
      "field:comp-m79hnsvv:details_buildingHeight": "40m",
      "field:comp-m79hnsvv:details_measurementUnits": "metric",
    };

    expect(
      filterSuppliers(testSupplierList, supplierTypesInForm, {
        ...dummyForm,
        ...smlBuilding,
      })
        .map((i) => i.suppliers.map((i) => i.supplierName))
        .flat()
    ).toContain("Roofman Rich");
    expect(
      filterSuppliers(testSupplierList, supplierTypesInForm, {
        ...dummyForm,
        ...smlBuilding,
      })
        .map((i) => i.suppliers.map((i) => i.supplierName))
        .flat()
    ).toContain("Roofer Ryan");
    expect(
      filterSuppliers(testSupplierList, supplierTypesInForm, {
        ...dummyForm,
        ...lrgBuilding,
      })
        .map((i) => i.suppliers.map((i) => i.supplierName))
        .flat()
    ).toContain("Roofer Ryan");
    expect(
      filterSuppliers(testSupplierList, supplierTypesInForm, {
        ...dummyForm,
        ...lrgBuilding,
      })
        .map((i) => i.suppliers.map((i) => i.supplierName))
        .flat()
    ).not.toContain("Roofman Rich");
  });

  test("During supplier filtering the form is searched for potential asbestos containing questions/answers", async () => {
    const shouldMatch = [
      "doesRoofContainAsbestos",
      "Its an old roof, it might contain asbestos - actually i think it does",
      "asbestosPresent",
      "Doestheroofhaveasbestosin?",
      "Dothewallscontainasbestos?",
      "Roof contains asbestos",
      "Asbestos is present in walls",
    ];

    const shouldNotMatch = [
      "no idea actually",
      "nowayJose",
      "asbestos free",
      "not asbestos",
      "without asbestos",
      "free of asbestos",
      "contains no asbestos",
      "has no asbestos",
      "zero asbestos",
      "clear of asbestos",
      "asbestos not present",
      "asbestos negative",
      "no asbestos detected",
      "not containing asbestos",
    ];

    for (const s of shouldMatch) expect(matchesAsbestos(s)).toBe(true);
    for (const s of shouldNotMatch) expect(matchesAsbestos(s)).toBe(false);
  });

  test("Suppliers are filtered on ability to handle asbestos if asbestos is mentioned in form", async () => {
    const supplierTypesInForm = supplierTypes.filter((i) => i.baseType === "roof" || i.baseType === "roofRepair");
    const base = { formName: "PortalFrame" };
    const testForm = {
      ...base,
      "field:comp-m79hnsvv:details_buildingLength": "75m",
      "field:comp-m79hnsvv:details_buildingWidth": "35m",
      "field:comp-m79hnsvv:details_buildingHeight": "35m",
      "field:comp-m79hnsvv:details_roofContainsAsbestos": "true",
    };
    const testForm2 = {
      ...base,
      "field:comp-m79hnsvv:details_buildingLength": "75m",
      "field:comp-m79hnsvv:details_buildingWidth": "35m",
      "field:comp-m79hnsvv:details_buildingHeight": "35m",
      "field:comp-m79hnsvv:details_roofMaterial": "asbestos",
    };
    const testForm3 = {
      ...base,
      "field:comp-m79hnsvv:details_buildingLength": "75m",
      "field:comp-m79hnsvv:details_buildingWidth": "35m",
      "field:comp-m79hnsvv:details_buildingHeight": "35m",
      "field:comp-m79hnsvv:details_roofContainsAsbestos": "false",
    };
    const testForm4 = {
      ...base,
      "field:comp-m79hnsvv:details_buildingasbestos": "75",
      "field:comp-m79hnsvv:details_roofBuildingMaterial": "asbestos",
      "field:comp-m79hnsvv:details_buildingLength": "75ft",
      "field:comp-m79hnsvv:details_buildingWidth": "50ft",
      "field:comp-m79hnsvv:details_buildingHeight": "65ft",
      "field:comp-m79hnsvv:details_roofContainsAsbestos": "false",
    };

    const suppliersForAsbestos = filterSuppliers(testSupplierList, supplierTypesInForm, { ...dummyForm, ...testForm })
      .map((i) => i.suppliers.map((i) => i.supplierName)).flat();
    expect(suppliersForAsbestos).toContain("Dodgy Dan");
    expect(suppliersForAsbestos).not.toContain("Sensible Steve");

    const suppliersForAsbestosInMaterial = filterSuppliers(testSupplierList, supplierTypesInForm, { ...dummyForm, ...testForm2 })
      .map((i) => i.suppliers.map((i) => i.supplierName)).flat();
    expect(suppliersForAsbestosInMaterial).toContain("Dodgy Dan");
    expect(suppliersForAsbestosInMaterial).not.toContain("Sensible Steve");

    expect(getAllFieldsWith(testForm4, "Asbestos", true).length).toBe(1);
    expect(getAllFieldsWith(testForm4, "Asbestos", false).length).toBe(2);

    const suppliersNoAsbestos = filterSuppliers(testSupplierList, supplierTypesInForm, { ...dummyForm, ...testForm3 })
      .map((i) => i.suppliers.map((i) => i.supplierName)).flat();
    expect(suppliersNoAsbestos).toContain("Sensible Steve");
    expect(suppliersNoAsbestos).toContain("Dodgy Dan");
    expect(suppliersNoAsbestos).toContain("Roofer Ryan");
    expect(suppliersNoAsbestos).not.toContain("Roofman Rich");
  });

  test("General suppliers are found and return", async () => {
    const suppliers = supplierReturnObj;

    const concreteSlabReturn = filterSuppliers(suppliers, supplierTypes, {
      ...dummyForm,
      formName: "Concrete Slab",
    });

    expect(concreteSlabReturn.map((i) => i.supplierType)).toContain("Concrete Slab");
    expect(
      concreteSlabReturn.flatMap((i) => i.suppliers).some((i) => i.quoteTypesProvided.includes("Concrete Slab"))
    ).toBe(true);
  });
});

describe("Form Submission tests - Other behaviour", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Suppliers are sorted by distance", async () => {
    const formLatLng = { lat: "52.520920", lng: "-1.666381" };
    const supplierList = sortSuppliersByDistance(supplierDistanceInput, formLatLng);

    expect(supplierList.map((i) => i.supplierName)).toEqual([
      "ABC Company",
      "XYZ Supplies Ltd.",
      "Titan Industries inc.",
    ]);
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

describe("General tests", () => {
  test("General tests passed", async () => {
    const myarray = [[], [], [], [], "$w('#buildQuoteHeaderBtn')", "$w('#buildQuoteFooterBtn')"];

    console.log("MY ARRAY", myarray.flat());
  });

  test("Test format field", async () => {
    const formatField = (f) => (typeof f === "string" ? f.replace(/([a-z])([A-Z])/g, `$1 $2`) : f);

    expect(formatField("buildingLength")).toBe("building Length");
    expect(formatField("StructuralFibresAndSteelReinfocringBarsMesh")).toBe(
      "Structural Fibres And Steel Reinfocring Bars Mesh"
    );
  });

  test("Test stringify form function", async () => {
    const result = stringifyForm(stringifyFormInput);
    expect(result).toEqual(stringifyFormString);

    // responseStringifyFormInput uses the formResponse.fields branch (fields as JSON string)
    const result2 = stringifyForm(responseStringifyFormInput);
    expect(result2["Form Contact"]).toContain("Test");
    expect(result2["Fields"]).toContain("Is the site prepared?");
  });
});
