/* eslint-disable import/prefer-default-export */
const pipeReducer = (a, b) => (arg) => b(a(arg));

export const pipe = (...ops) => ops.reduce(pipeReducer);

export function getPercent(n, dp = 2) {
  if (n !== undefined) return `${(n * 100).toFixed(dp)} %`;
  return "";
}
