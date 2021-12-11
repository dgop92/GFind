import { FIND_ACTIONS } from "../actionTypes";

export const defautlState = {
  usernames: [],
  settings: {
    preferences: {
      view: "simple",
      show_avg_sd: false,
    },
    apiOptions: {
      compute_sd: false,
      no_classes_day: false,
      ignore_weekend: true,
      limit: null,
      days_to_filter: [],
    },
  },
  isUserModalOpen: false,
  isSettingModalOpen: false,
};

/**
 * [reducer for managing find state]
 *
 * ADD_USER, payload: str, usernameToAdd
 *
 * REMOVE_USER, payload: str, usernameToRemove
 *
 * UPDATE_SETTINGS, payload: object, newSettings
 *
 */
const reducer = (state = defautlState, { type, payload } = {}) => {
  let newUsernames;
  switch (type) {
    case FIND_ACTIONS.ADD_USER:
      newUsernames = [...state.usernames, payload.toLowerCase()];
      return {
        ...state,
        usernames: newUsernames,
      };
    case FIND_ACTIONS.REMOVE_USER:
      newUsernames = state.usernames.filter((currUsername) => currUsername !== payload);
      return {
        ...state,
        usernames: newUsernames,
      };
    case FIND_ACTIONS.UPDATE_SETTINGS:
      return {
        ...state,
        settings: payload,
      };
    case FIND_ACTIONS.TOGGLE_ADD_USER_MODAL_TO:
      return {
        ...state,
        isUserModalOpen: payload,
      };
    case FIND_ACTIONS.TOGGLE_SETTING_MODAL_TO:
      return {
        ...state,
        isSettingModalOpen: payload,
      };
    default:
      return state;
  }
};

export default reducer;
