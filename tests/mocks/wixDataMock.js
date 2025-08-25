const mockCollectionData = {
  SupplierList: [
    // Add your test supplier data here
    {
      _id: "test-supplier-1",
      supplierName: "Test Supplier 1",
      supplierType: "steel",
      latitude: 51.5074,
      longitude: -0.1278,
      handlesAsbestos: false,
      quoteTypesProvided: ["monoPitch", "portalFrame"],
      minMaxMeasurements: {
        steel: {
          minLength: 1,
          maxLength: 100,
          minWidth: 1,
          maxWidth: 50,
          minHeight: 1,
          maxHeight: 20,
        },
      },
    },
    // Add more test suppliers as needed
  ],
};

const mockWixData = {
  query: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  find: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  isNotEmpty: jest.fn().mockReturnThis(),
};

const setupWixDataMock = () => {
  mockWixData.find.mockImplementation(() => {
    return Promise.resolve({
      items: mockCollectionData.SupplierList || [],
    });
  });

  return mockWixData;
};

// Export both the mock data and the mock functions
export { mockCollectionData, mockWixData, setupWixDataMock };
