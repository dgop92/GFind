import { combineReducers } from "redux";
import findReducer from "./findReducer";
import analyzeReducer from "./analyzeReducer";

const reducers = combineReducers({
  find: findReducer,
  analyze: analyzeReducer,
});

export default reducers;
