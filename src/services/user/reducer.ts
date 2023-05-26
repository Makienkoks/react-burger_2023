import {
    SEND_USER_REQUEST,
    SET_USER,
    SEND_USER_FAILED,
    SET_AUTH_CHECKED,
    SET_ERROR_MESSAGE,
    TUserActions
} from './actions';
import {TUser} from "../../utils/types";

const initialState:TUserData = {
    user: null,
    isLoading: false,
    success: false,
    isAuthChecked: false,
    error: ''
};

export type TUserData = {
    user?: TUser | null,
    isLoading: boolean,
    success: boolean,
    isAuthChecked?: boolean,
    error?: string | null
}

export const reducer = (state = initialState, action: TUserActions) => {
    switch (action.type) {
        case SEND_USER_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case SET_USER: {
            return { ...state,
                user: action.payload.user,
                success: action.payload.success,
                isLoading: false
            };
        }
        case SEND_USER_FAILED: {
            return { ...state,
                success: false,
                isLoading: false
            };
        }
        case SET_AUTH_CHECKED: {
            return { ...state,
                isAuthChecked: true,
            };
        }
        case SET_ERROR_MESSAGE: {
            return { ...state,
                error: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}