//jshint esversion: 9

import { createStore } from "redux";
import rootReducer from "./rootReducer";

export const store = createStore(rootReducer);
