//jshint esversion: 9
import { combineReducers } from "redux";
import { elementReducer } from "./Elements/ElementReducer";

const rootReducer = combineReducers({
    element: elementReducer,
});

export default rootReducer;
