import {forgotPass, login, logout, register, resetPass, token, user, changeUserData} from "../../utils/api";
import {AppThunk} from "../store";
import {TForgotFormFields, TFormFields, TResetFormFields, TToken, TUser} from "../../utils/types";
import {TUserData} from "./reducer";

export const SEND_USER_REQUEST = 'SEND_USER_REQUEST'
export const SET_USER = 'SET_USER'
export const SEND_USER_FAILED = 'SEND_USER_FAILED'
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED'
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'

export interface ISendUserRequest {
    readonly type: typeof SEND_USER_REQUEST;
}
export interface ISetUser {
    readonly type: typeof SET_USER;
    readonly payload: TUserData;
}
export interface ISendUserFailed {
    readonly type: typeof SEND_USER_FAILED;
}
export interface ISetAuthChecked {
    readonly type: typeof SET_AUTH_CHECKED;
}
export interface ISetErrorMessage {
    readonly type: typeof SET_ERROR_MESSAGE;
    readonly payload: string | null;
}
export type TUserActions =
| ISendUserRequest
| ISetUser
| ISendUserFailed
| ISetAuthChecked
| ISetErrorMessage

export const refreshToken = (data: TToken): AppThunk => (dispatch) => {
    return token(data).then(res => {
        if (res && res.success) {
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('refreshToken', res.refreshToken)
            dispatch(getUser())
        } else {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }).catch(() => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    })
}

export const getUser = (): AppThunk => (dispatch) => {
    dispatch({
        type: SEND_USER_REQUEST
    })
    return user().then(res => {
        if (res && res.success) {
            dispatch({
                type: SET_USER,
                payload: res
            })

        } else {
            dispatch({
                type: SET_USER,
                payload: {
                    user: null,
                    success: false,
                    isLoading: false
                }
            })
        }
    }).catch(() => {
        dispatch({
            type: SEND_USER_FAILED
        })
        if (localStorage.getItem('refreshToken')) {
            dispatch(refreshToken({token: '' + localStorage.getItem('refreshToken')}))
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }).finally(() => {
        dispatch({
            type: SET_AUTH_CHECKED
        })
    })
}

export const changeUser = (data:TUser): AppThunk => (dispatch) => {
    dispatch({
        type: SEND_USER_REQUEST
    })
    return changeUserData(data).then(res => {
        if (res && res.success) {
            dispatch({
                type: SET_USER,
                payload: res
            })

        } else {
            dispatch({
                type: SET_USER,
                payload: {
                    user: null,
                    success: false,
                    isLoading: false
                }
            })
        }
    }).catch(() => {
        dispatch({
            type: SEND_USER_FAILED
        })
        if (localStorage.getItem('refreshToken')) {
            dispatch(refreshToken({token: '' + localStorage.getItem('refreshToken')}))
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }).finally(() => {
        dispatch({
            type: SET_AUTH_CHECKED
        })
    })
}

export const setError = (err: string | null): AppThunk => {
    return (dispatch) => {
        // console.log(`%c ${err}`, 'background-color: #FFC0CB');
        dispatch({
            type: SET_ERROR_MESSAGE,
            payload: err
        })
    }
}

export const registrationUser = (data: TUser): AppThunk => (dispatch) => {
    dispatch({
        type: SEND_USER_REQUEST
    })
    return register(data).then(res => {
        if (res && res.success) {
            dispatch({
                type: SET_USER,
                payload: res
            })
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('refreshToken', res.refreshToken)
        } else {
            dispatch({
                type: SEND_USER_FAILED
            })
        }
    }).catch(err => {
        // console.log(`%c ${err}`, 'background-color: #FFC0CB');
        dispatch(setError(err))
    })
}

export const logInUser = (data: TFormFields): AppThunk => {
    return (dispatch) => {
        dispatch({
            type: SEND_USER_REQUEST
        })
        return login(data).then(res => {
            if (res && res.success) {
                dispatch({
                    type: SET_USER,
                    payload: res
                })
                localStorage.setItem('accessToken', res.accessToken)
                localStorage.setItem('refreshToken', res.refreshToken)
            } else {
                dispatch({
                    type: SEND_USER_FAILED
                })
            }
        }).catch(err => {
            // console.log(`%c ${err}`, 'background-color: #FFC0CB');
            dispatch(setError(err))
        })
    }
}

export const logOutUser = (data: TToken): AppThunk => (dispatch) => {
    dispatch({
        type: SEND_USER_REQUEST
    })
    return logout(data).then(res => {
        if (res && res.success) {
            dispatch({
                type: SET_USER,
                payload: {
                    user: null,
                    success: false,
                    isLoading: false
                }
            })
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        } else {
            dispatch({
                type: SEND_USER_FAILED
            })
        }
    }).catch(err => {
        console.log(`%c ${err}`, 'background-color: #FFC0CB');
    })
}

export const forgotPassword = (data: TForgotFormFields): AppThunk => (dispatch) => {
    dispatch({
        type: SEND_USER_REQUEST
    })
    return forgotPass(data).then(res => {
        if (res && res.success) {
            dispatch({
                type: SET_USER,
                payload: {
                    user: null,
                    success: res.success,
                    isLoading: false
                }
            })
        } else {
            dispatch({
                type: SEND_USER_FAILED
            })
        }
    }).catch(err => {
        // console.log(`%c ${err}`, 'background-color: #FFC0CB');
        dispatch(setError(err))
    })
}

export const resetPassword = (data: TResetFormFields): AppThunk => (dispatch) => {
    dispatch({
        type: SEND_USER_REQUEST
    })
    return resetPass(data).then(res => {
        if (res && res.success) {
            dispatch({
                type: SET_USER,
                payload: {
                    user: null,
                    success: res.success,
                    isLoading: false
                }
            })
        } else {
            dispatch({
                type: SEND_USER_FAILED
            })
        }
    }).catch(err => {
        // console.log(`%c ${err}`, 'background-color: #FFC0CB');
        dispatch(setError(err))
    })
}