import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    CHANGE_INGREDIENT,
    TOrderListActions
} from './actions';
import { TOrderListData } from "../../utils/types";

const initialState: TOrderListData = {
    bun: null,
    ingredients: []
};

export const reducer = (state = initialState, action: TOrderListActions) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                bun: action.payload.bun,
                ingredients: action.payload.ingredients
            };
        }
        case REMOVE_INGREDIENT: {
            return { ...state,
                ingredients: action.payload.ingredients
            };
        }
        case CHANGE_INGREDIENT: {
            return { ...state,
                ingredients: action.payload.ingredients
            };
        }
        default: {
            return state;
        }
    }
}