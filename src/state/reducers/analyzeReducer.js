import { ANALYZE_ACTIONS } from "../actionTypes";

export const defautlState = {
  usernameData: {
    usernameFile: null,
    usernameToFiler: "",
    extraUsernames: [],
  },
};

const reducer = (state = defautlState, { type, payload } = {}) => {
  switch (type) {
    case ANALYZE_ACTIONS.UPDATE_USERNAMES_DATA: {
      const { extraUsernames, ...extraUsernameData } = payload;
      // "".split() return [""]
      const normalizeExtraUsernames =
        extraUsernames.length === 1 && !extraUsernames[0] ? [] : extraUsernames;
      return {
        ...state,
        usernameData: {
          ...extraUsernameData,
          extraUsernames: normalizeExtraUsernames,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
