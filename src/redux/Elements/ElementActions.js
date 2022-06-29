//jshint esversion: 9

import { ADD_NEW_ELEMENT, REMOVE_ALL_ELEMENT, REMOVE_ELEMENT, UPDATE_ELEMENT_FIELDS } from "./ElementTypes";

export const addNewElementAction = (element) => {
    return {
        type: ADD_NEW_ELEMENT,
        payload: element,
    };
};

export const updateElementAction = (elementId, updates) => {
    return {
        type: UPDATE_ELEMENT_FIELDS,
        payload: {
            elementId,
            updates,
        },
    };
};

export const removeElementAction = (elementId) => {
    return {
        type: REMOVE_ELEMENT,
        payload: elementId,
    };
};

export const removeAllElements = () => {
    return {
        type: REMOVE_ALL_ELEMENT,
    };
};
