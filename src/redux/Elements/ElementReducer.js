//jshint esversion: 9

import { ADD_NEW_ELEMENT, REMOVE_ELEMENT, UPDATE_ELEMENT_FIELDS } from "./ElementTypes";

export const elementReducer = (initState = [], action) => {
    switch (action.type) {
        case ADD_NEW_ELEMENT:
            return [...initState, action.payload];
        case UPDATE_ELEMENT_FIELDS: {
            for (let i in initState) {
                if (initState[i].id === action.payload.elementId) {
                    const updates = action.payload.updates;
                    for (let j in updates) {
                        initState[i][j] = updates[j];
                    }
                    break;
                }
            }
            return initState;
        }
        case REMOVE_ELEMENT: {
            initState = initState.filter((element) => element.id !== action.payload);
            return initState;
        }
        default:
            return initState;
    }
};
