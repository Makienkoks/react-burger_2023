import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    CHANGE_ORDER_INGREDIENT
} from './actions';

const initialState = {
    bun: null,
    ingredients: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: action.payload.type !== 'bun' ? [...state.ingredients, action.payload] : [...state.ingredients],
                bun:  action.payload.type === 'bun' ? action.payload : state.bun
            };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient) => ingredient.key !== action.payload),
            };
        case CHANGE_ORDER_INGREDIENT:
            return {
                ...state,
                ingredients: [...action.payload],
            };
        default: {
            return state;
        }
    }
};