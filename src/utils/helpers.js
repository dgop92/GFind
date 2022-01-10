/* eslint-disable import/prefer-default-export */
const pipeReducer = (a, b) => (arg) => b(a(arg));

export const pipe = (...ops) => ops.reduce(pipeReducer);

export function getPercent(n, dp = 2) {
  if (n !== undefined) return `${(n * 100).toFixed(dp)} %`;
  return "";
}

export const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export function convertCamelCaseToSnakeCase(obj) {
  return Object.keys(obj).reduce(
    (accObj, keyName) => ({ ...accObj, [camelToSnakeCase(keyName)]: obj[keyName] }),
    {}
  );
}

export function getApiBodyWithoutUnwantedValues(obj) {
  return Object.keys(obj)
    .filter((keyName) => {
      const value = obj[keyName];
      if (value === null || value === undefined) {
        return false;
      }
      if (typeof value[Symbol.iterator] === "function" && !value.length) {
        return false;
      }
      return true;
    })
    .reduce((accObj, keyName) => {
      // eslint-disable-next-line no-param-reassign
      accObj[keyName] = obj[keyName];
      return accObj;
    }, {});
}

export function getListOfErrorsFromResponse(response) {
  return Object.values(response).reduce((acc, errorList) => {
    // Sometimes instead of using a list for erros use a string "detail": "message"
    if (Array.isArray(errorList)) {
      return [...acc, ...errorList];
    }
    return [...acc, errorList];
  }, []);
}

export function appendToFormDataHelper(formData, keyName, value) {
  if (Array.isArray(value)) {
    value.forEach((v) => {
      formData.append(keyName, v);
    });
  } else {
    formData.append(keyName, value);
  }
}
