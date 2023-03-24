import {
    SET_SELECTED,
    DELETE_SELECTED,
} from './actions';

const initialState = {
    selected: null
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED:
            return {
                ...state,
                selected: action.payload,
            };
        case DELETE_SELECTED:
            return {
                ...state,
                selected: null,
            };
        default: {
            return state;
        }
    }
};