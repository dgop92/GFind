import { isEmpty, validateStringRange } from "../validators";

describe("#isEmpty", () => {
  test("should throw empty error", () => {
    expect(() => {
      isEmpty({ value: "" });
    }).toThrow("El campo no puede estar vacío");
  });
  test("should not throw empty error", () => {
    expect(() => {
      isEmpty({ value: "a name" });
    }).not.toThrow("El campo no puede estar vacío");
  });
  test("should throw empty error with custom message", () => {
    expect(() => {
      isEmpty({ value: "", errorMessage: "e2" });
    }).toThrow("e2");
  });
});

describe("#validateStringRange", () => {
  test("should throw range error", () => {
    expect(() => {
      validateStringRange({
        value: "cas",
        minLenght: 5,
        maxLenght: 10,
        errorMessage: "rango",
      });
    }).toThrow("rango");
    expect(() => {
      validateStringRange({
        value: "casjhtrdfhbgfetb",
        minLenght: 5,
        maxLenght: 10,
        errorMessage: "rango",
      });
    }).toThrow("rango");
  });
});
