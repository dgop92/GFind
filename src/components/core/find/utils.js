import { createContext, useContext } from "react";

export const FindState = createContext();

export function useFindState() {
  return useContext(FindState);
}

export const DEFAULT_STATE = {
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
      limit: "-1",
      day_filter: "-1",
    },
  },
  isUserModalOpen: false,
  isSettingModalOpen: false,
};

export const ACTIONS = {
  ADD_USER: "ADD_USER",
  REMOVE_USER: "REMOVE_USER",
  UPDATE_SETTINGS: "UPDATE_SETTINGS",
  TOGGLE_ADD_USER_MODAL_TO: "TOGGLE_ADD_USER_MODAL_TO",
  TOGGLE_SETTING_MODAL_TO: "TOGGLE_SETTING_MODAL_TO",
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
 * TOGGLE_ADD_USER_MODAL_TO, payload: bool
 *
 * TOGGLE_SETTING_MODAL_TO, payload: bool
 *
 */
export function reducer(state, action) {
  let newUsernames;
  switch (action.type) {
    case ACTIONS.ADD_USER:
      newUsernames = [...state.usernames, action.payload.toLowerCase()];
      return {
        ...state,
        usernames: newUsernames,
      };
    case ACTIONS.REMOVE_USER:
      newUsernames = state.usernames.filter(
        (currUsername) => currUsername !== action.payload
      );
      return {
        ...state,
        usernames: newUsernames,
      };
    case ACTIONS.UPDATE_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    case ACTIONS.TOGGLE_ADD_USER_MODAL_TO:
      return {
        ...state,
        isUserModalOpen: action.payload,
      };
    case ACTIONS.TOGGLE_SETTING_MODAL_TO:
      return {
        ...state,
        isSettingModalOpen: action.payload,
      };
    default:
      return state;
  }
}
