import { getIndicesFromSelectedHours } from "../useManualRegister";

describe("#getIndicesFromSelectedHours", () => {
  test("should return the indices from string format", () => {
    const stringIndices = ["0-1", "13-5", "5-4"];
    const indices = [
      [0, 1],
      [13, 5],
      [5, 4],
    ];
    const expectedIndicies = getIndicesFromSelectedHours(stringIndices);
    expect(new Set(expectedIndicies)).toEqual(new Set(indices));
  });
  test("should return empty arr ", () => {
    const stringIndices = [];
    const indices = [];
    const expectedIndicies = getIndicesFromSelectedHours(stringIndices);
    expect(expectedIndicies).toEqual(indices);
  });
});
