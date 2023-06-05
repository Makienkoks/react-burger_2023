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
                ...action.payload
            };
        }
        case REMOVE_INGREDIENT: {
            return { ...state,
                ...action.payload
            };
        }
        case CHANGE_INGREDIENT: {
            return { ...state,
                ...action.payload
            };
        }
        default: {
            return state;
        }
    }
}