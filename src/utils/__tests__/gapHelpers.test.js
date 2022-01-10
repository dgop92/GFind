import { getGap } from "../gapHelpers";

describe("#getGap", () => {
  test("should return the correct gap", () => {
    const gaps = [
      {
        hour_index: 0,
        day_index: 2,
      },
      {
        hour_index: 5,
        day_index: 0,
      },
      {
        hour_index: 3,
        day_index: 10,
      },
    ];
    const gap = getGap(gaps, 5, 0);
    expect(gap).toEqual(gaps[1]);
  });
  test("should return undefined if no gaps are passed", () => {
    const gap = getGap();
    expect(gap).toBe(undefined);
  });
});
