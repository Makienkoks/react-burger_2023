import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
} from './actions';

const initialState = {
    ingredients: {
        data: [],
        isLoading: false,
        error: false,
    }
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredients: {
                    isLoading: true
                },
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return { ...state,
                ingredients: {
                    error: false,
                    data: action.items,
                    isLoading: false,
                }
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return { ...state,
                ingredients: {
                    error: true,
                    isLoading: false,
                }
            };
        }
        default: {
            return state;
        }
    }
};