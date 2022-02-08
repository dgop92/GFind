import { combineReducers } from "redux";
import findReducer from "./findReducer";
import analyzeReducer from "./analyzeReducer";
import freeReducer from "./freeReducer";

const reducers = combineReducers({
  find: findReducer,
  analyze: analyzeReducer,
  free: freeReducer,
});

export default reducers;
