import { ANALYZE_ACTIONS } from "../actionTypes";

export const defautlState = {
  usernameData: {
    usernamesFile: null,
    usernameToFilter: "",
    extraUsernames: [],
  },
};

const reducer = (state = defautlState, { type, payload } = {}) => {
  switch (type) {
    case ANALYZE_ACTIONS.UPDATE_USERNAMES_DATA: {
      const { extraUsernames, ...extraUsernameData } = payload;
      // "".split(",") return [""]
      const normalizeExtraUsernames = extraUsernames
        .split(",")
        .filter((username) => username !== "");
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
