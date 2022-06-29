//jshint esversion: 9

import { loadData, saveData } from "../../utils/helper";
import { ADD_NEW_ELEMENT, REMOVE_ALL_ELEMENT, REMOVE_ELEMENT, UPDATE_ELEMENT_FIELDS } from "./ElementTypes";

const initalData = loadData();

export const elementReducer = (initState = initalData, action) => {
    switch (action.type) {
        case ADD_NEW_ELEMENT: {
            const data = [...initState, action.payload];
            saveData(data);
            return data;
        }
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
            saveData(initState);
            return initState;
        }
        case REMOVE_ELEMENT: {
            initState = initState.filter((element) => element.id !== action.payload);
            saveData(initState);
            return initState;
        }
        case REMOVE_ALL_ELEMENT: {
            saveData([]);
            return [];
        }
        default:
            return initState;
    }
};
