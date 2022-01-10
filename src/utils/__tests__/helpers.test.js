import {
  camelToSnakeCase,
  convertCamelCaseToSnakeCase,
  getApiBodyWithoutUnwantedValues,
  getListOfErrorsFromResponse,
  getPercent,
} from "../helpers";

describe("#getPercent", () => {
  test("should handle 2 decimal", () => {
    const text = getPercent(0.54);
    const [n] = text.split(" ");
    expect(Number(n)).toBeCloseTo(54);
  });
  test("should handle more than 2 decimals", () => {
    const text = getPercent(0.54236);
    const [n] = text.split(" ");
    expect(Number(n)).toBeCloseTo(54.236);
  });
  test("should return empty string if none number is pass", () => {
    const text = getPercent();
    expect(text).toBe("");
  });
});

describe("#camelToSnakeCase", () => {
  test("should handle normal cases", () => {
    expect(camelToSnakeCase("myCat")).toBe("my_cat");
  });
});

describe("#convertCamelCaseToSnakeCase", () => {
  test("should handle normal cases", () => {
    const camelCaseObject = {
      myCat: 2,
      myDog: 3,
      already_camel: 10,
    };
    const objKeys = ["my_cat", "my_dog", "already_camel"];
    const resultObject = convertCamelCaseToSnakeCase(camelCaseObject);
    expect(new Set(Object.keys(resultObject))).toEqual(new Set(objKeys));
  });
});

describe("#getApiBodyWithoutUnwantedValues", () => {
  test("should remove empty arrays and strings", () => {
    const obj = {
      myCat: [],
      myDog: 3,
      myPersona: "",
    };
    const resObj = getApiBodyWithoutUnwantedValues(obj);
    expect(resObj).not.toHaveProperty("myCat");
    expect(resObj).not.toHaveProperty("myPersona");
    expect(resObj).toHaveProperty("myDog");
  });
  test("should remove null and undefined", () => {
    const obj = {
      house: null,
      lava: undefined,
      water: 0,
    };
    const resObj = getApiBodyWithoutUnwantedValues(obj);
    expect(resObj).not.toHaveProperty("house");
    expect(resObj).not.toHaveProperty("lava");
    expect(resObj).toHaveProperty("water");
  });
});

describe("#getListOfErrorsFromResponse", () => {
  test("should handle normal cases", () => {
    const obj = {
      myCat: ["er1", "er2"],
      house: ["er3", "er4"],
    };
    const errors = getListOfErrorsFromResponse(obj);
    expect(new Set(errors)).toEqual(new Set(["er1", "er2", "er3", "er4"]));
  });
  test("should handle detail errors", () => {
    const obj = {
      myCat: ["er1", "er2"],
      house: "er5",
    };
    const errors = getListOfErrorsFromResponse(obj);
    expect(new Set(errors)).toEqual(new Set(["er1", "er5", "er2"]));
  });
});
