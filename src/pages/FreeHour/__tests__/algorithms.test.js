/* eslint-disable max-len */
import {
  getSSIndiceOfCurrentData,
  getAvailabilyData,
  getDayFromSS,
  getPreviousClassMessage,
  getNextClassMessage,
  statusOptions,
} from "../algorithms";

import { HOURS } from "../../../utils/constants";

describe("#getSSIndice", () => {
  test("should be successful for hours responses", () => {
    const dataTest = [
      {
        hour: 8,
        minutes: 31,
        indicie: 2,
      },
      {
        hour: 19,
        minutes: 30,
        indicie: 13,
      },
      {
        hour: 13,
        minutes: 25,
        indicie: 6,
      },
    ];

    dataTest.forEach((dt) => {
      jest
        .spyOn(global.Date, "now")
        .mockImplementationOnce(() =>
          new Date(2022, 1, 14, dt.hour, dt.minutes, 0).valueOf()
        );

      const { indicie } = getSSIndiceOfCurrentData();
      const [i] = indicie;
      // i 0-13 is hour index j 0-6, is day index,
      expect(i).toBe(dt.indicie);
    });
  });
  test("should be successful for days responses", () => {
    const dataTest = [
      {
        day: 15,
        month: 1,
        indicie: 2,
      },
      {
        day: 20,
        month: 1,
        indicie: 6,
      },
      {
        day: 18,
        month: 1,
        indicie: 4,
      },
    ];

    dataTest.forEach((dt) => {
      jest
        .spyOn(global.Date, "now")
        .mockImplementationOnce(() =>
          new Date(2022, dt.month, dt.day, 13, 12, 0).valueOf()
        );

      const { indicie } = getSSIndiceOfCurrentData();
      const [, j] = indicie;
      expect(j).toBe(0);
    });
  });
  test("should be out range for hours responses", () => {
    const dataTest = [
      {
        hour: 5,
        minutes: 31,
      },
      {
        hour: 6,
        minutes: 29,
      },
      {
        hour: 20,
        minutes: 31,
      },
      {
        hour: 22,
        minutes: 0,
      },
    ];

    dataTest.forEach((dt) => {
      jest
        .spyOn(global.Date, "now")
        .mockImplementationOnce(() =>
          new Date(2022, 1, 14, dt.hour, dt.minutes, 0).valueOf()
        );

      const { indicie } = getSSIndiceOfCurrentData();
      const [i] = indicie;
      // i 0-13 is hour index j 0-6, is day index,
      expect(i).toBe(-1);
    });
  });
  test("should be out range for sundays", () => {
    jest
      .spyOn(global.Date, "now")
      .mockImplementationOnce(() => new Date(2022, 1, 13, 15, 12, 0).valueOf());

    const { indicie } = getSSIndiceOfCurrentData();
    const [, j] = indicie;
    expect(j).toBe(-1);
  });
});

describe("#getDayFromSS", () => {
  test("should retrieve the correct slice for wednesday", () => {
    const dataTest = [
      {
        ss: "00100000010000001000000100000010000001000000100000010000001000000100000010000001000000100000010000",
        slice: "11111111111111",
        dayIndex: 2,
      },
      {
        ss: "10000001000000100000010000001000000100000010000001000000100000010000001000000100000010000001000000",
        slice: "11111111111111",
        dayIndex: 0,
      },
      {
        ss: "00000100000010000001000000100000010000001000000100000010000001000000100000010000001000000100000010",
        slice: "11111111111111",
        dayIndex: 5,
      },
    ];
    dataTest.forEach((dt) => {
      const daySlice = getDayFromSS(dt.ss, dt.dayIndex);
      expect(daySlice).toBe(dt.slice);
    });
  });
});

describe("#getAvailabilyData", () => {
  test("getAvailabilyData case 1", () => {
    const indiceData = [2, 0];
    const data = getAvailabilyData(
      "00000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000",
      indiceData
    );
    expect(typeof data).not.toBe("string");
    if (typeof data === "string") return;

    expect(data.status).toBe(statusOptions.FREE);
    expect(data.previousClass).toBe(getPreviousClassMessage());
    expect(data.nextClass).toBe(getNextClassMessage(HOURS[4]));
  });
  test("getAvailabilyData case 2", () => {
    const indiceData = [13, 0];
    const data = getAvailabilyData(
      "00000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000",
      indiceData
    );
    expect(typeof data).not.toBe("string");
    if (typeof data === "string") return;

    expect(data.status).toBe(statusOptions.FREE);
    expect(data.previousClass).toBe(getPreviousClassMessage(HOURS[11]));
    expect(data.nextClass).toBe(getNextClassMessage());
  });
  test("getAvailabilyData case 3", () => {
    const indiceData = [3, 0];
    const data = getAvailabilyData(
      "00000000000000000000010000000000000100000000000000000000000000000000000000000000000000000000000000",
      indiceData
    );
    expect(typeof data).not.toBe("string");
    if (typeof data === "string") return;

    expect(data.status).toBe(statusOptions.IN_CLASS);
    expect(data.previousClass).toBe(getPreviousClassMessage());
    expect(data.nextClass).toBe(getNextClassMessage(HOURS[5]));
  });
  test("getAvailabilyData case 4", () => {
    const indiceData = [4, 0];
    const data = getAvailabilyData(
      "00000000000000000000010000000000000100000010000000000000000000000000000000000000000000000000000000",
      indiceData
    );
    expect(typeof data).not.toBe("string");
    if (typeof data === "string") return;

    expect(data.status).toBe(statusOptions.IN_CLASS);
    expect(data.previousClass).toBe(getPreviousClassMessage(HOURS[3]));
    expect(data.nextClass).toBe(getNextClassMessage(HOURS[5]));
  });
  test("getAvailabilyData case 5", () => {
    const indiceData = [4, 0];
    const data = getAvailabilyData(
      "00000000000000000000010000000000000100000000000000000000000000000000000000000000000000000000000000",
      indiceData
    );
    expect(typeof data).not.toBe("string");
    if (typeof data === "string") return;

    expect(data.status).toBe(statusOptions.FREE);
    expect(data.previousClass).toBe(getPreviousClassMessage(HOURS[3]));
    expect(data.nextClass).toBe(getNextClassMessage(HOURS[5]));
  });
  test("exceptional case, free day", () => {
    const indiceData = [3, 0];
    const data = getAvailabilyData(
      "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      indiceData
    );
    expect(typeof data).toBe("string");
    if (typeof data !== "string") return;

    expect(data).toBe("Día libre");
  });
  test("exceptional case, all day with class)", () => {
    const indiceData = [3, 0];
    const data = getAvailabilyData(
      "10000001000000100000010000001000000100000010000001000000100000010000001000000100000010000001000000",
      indiceData
    );
    expect(typeof data).toBe("string");
    if (typeof data !== "string") return;

    expect(data).toBe("¿ Seguro que es posible dar clases todos el día ?");
  });
});
