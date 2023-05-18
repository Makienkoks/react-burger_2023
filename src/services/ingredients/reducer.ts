import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    TGetIngredientsActions
} from './actions';

import {TIngredients} from "../../utils/types";

const initialState: TIngredientsData = {
    data: [],
    isLoading: false,
    success: true,
};
export type TIngredientsData = {
    data: Array<TIngredients>,
    isLoading: boolean,
    success: boolean,
}
export const reducer = (state = initialState, action: TGetIngredientsActions) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return { ...state,
                isLoading: false,
                data: action.payload,
                success: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return { ...state,
                isLoading: false,
                success: true
            };
        }
        default: {
            return state;
        }
    }
};