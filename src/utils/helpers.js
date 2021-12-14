/* eslint-disable import/prefer-default-export */
const pipeReducer = (a, b) => (arg) => b(a(arg));

export const pipe = (...ops) => ops.reduce(pipeReducer);

export function getPercent(n, dp = 2) {
  if (n !== undefined) return `${(n * 100).toFixed(dp)} %`;
  return "";
}

export function getApiBodyWithoutUnwantedValues(obj) {
  return Object.keys(obj)
    .filter((keyName) => {
      const value = obj[keyName];
      if (value === null || value === undefined) {
        return false;
      }
      if (Array.isArray(value) && !value.length) {
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
