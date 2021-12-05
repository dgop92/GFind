/* eslint-disable import/prefer-default-export */
const pipeReducer = (a, b) => (arg) => b(a(arg));

export const pipe = (...ops) => ops.reduce(pipeReducer);
