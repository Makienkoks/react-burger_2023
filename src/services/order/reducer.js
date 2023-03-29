import {
    SEND_ORDER_FAILED,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
} from './actions';

const initialState = {
    order: {
        name: '',
        success: false,
        number: null,
        isLoading: false,
    }
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                order: {
                    isLoading: true
                },
            };
        }
        case SEND_ORDER_SUCCESS: {
            return { ...state,
                order: {
                    name: action.payload.name,
                    number: 'order' in action.payload && 'number' in action.payload.order && action.payload.order.number,
                    success: action.payload.success,
                    isLoading: false
                }
            };
        }
        case SEND_ORDER_FAILED: {
            return { ...state,
                order: {
                    name: null,
                    success: false,
                    number: null,
                    isLoading: false,
                }
            };
        }
        default: {
            return state;
        }
    }
};