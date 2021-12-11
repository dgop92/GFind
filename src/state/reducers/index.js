import { combineReducers } from "redux";
import findReducer from "./findReducer";

const reducers = combineReducers({
  find: findReducer,
});

export default reducers;
