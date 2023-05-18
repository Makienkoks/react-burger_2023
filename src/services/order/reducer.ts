import {
    SEND_ORDER_FAILED,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    TSendOrderActions,
} from './actions';
import { TOrderData } from "../../utils/types";

const initialState:TOrderData = {
    name: '',
    success: false,
    number: '',
    isLoading: true,
};
export const reducer = (state = initialState, action: TSendOrderActions) => {
    switch (action.type) {
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case SEND_ORDER_SUCCESS: {
            return { ...state,
                name: action.payload.name,
                number: action.payload.order.number,
                success: action.payload.success,
                isLoading: false
            };
        }
        case SEND_ORDER_FAILED: {
            return { ...state,
                name: '',
                success: true,
                number: '',
                isLoading: false,
            };
        }
        default: {
            return state;
        }
    }
}