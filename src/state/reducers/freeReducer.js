import { FREE_ACTIONS } from "../actionTypes";

export const defautlState = {
  newUsernameData: {
    username: "",
    nickname: "",
  },
  filterOptions: {
    onlyFreeUsers: true,
    searchQuery: "",
  },
};

const reducer = (state = defautlState, { type, payload } = {}) => {
  switch (type) {
    case FREE_ACTIONS.ADD_USER: {
      return {
        ...state,
        newUsernameData: payload,
      };
    }
    case FREE_ACTIONS.UPDATE_FILTER_OPTIONS: {
      return {
        ...state,
        filterOptions: payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
