import {sendUserRequest, sendUserFailed, setAuthChecked, setUser, setErrorMessage} from "./reducer";
import {forgotPass, login, logout, register, resetPass, token, user} from "../../utils/api";

export function refreshToken(data) {
    return (dispatch) => {
        token(data).then(res => {
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
}
export function getUser(data) {
    return (dispatch) => {
        dispatch(sendUserRequest())
        user(data).then(res => {
            if (res && res.success) {
                dispatch(setUser(res))
            } else {
                dispatch(setUser(null))
                dispatch(sendUserFailed())
            }
        }).catch(() => {
            dispatch(sendUserFailed())
            if (localStorage.getItem('refreshToken')) {
                dispatch(refreshToken({token: localStorage.getItem('refreshToken')}))
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            }
        }).finally(() => {
            dispatch(setAuthChecked(true))
        })
    }
}

export const setError = (err) => {
    return (dispatch) => {
        // console.log(`%c ${err}`, 'background-color: #FFC0CB');
        dispatch(setErrorMessage(err))
    }
}

export const registrationUser = (data) => {
    return (dispatch) => {
        dispatch(sendUserRequest())
        return register(data).then(res => {
            if (res && res.success) {
                dispatch(setUser(res))
                localStorage.setItem('accessToken', res.accessToken)
                localStorage.setItem('refreshToken', res.refreshToken)
            } else {
                dispatch(sendUserFailed())
            }
        }).catch(err => {
            // console.log(`%c ${err}`, 'background-color: #FFC0CB');
            dispatch(setError(err))
        })
    }
}

export const logInUser = (data) => {
    return (dispatch) => {
        dispatch(sendUserRequest())
        return login(data).then(res => {
            if (res && res.success) {
                dispatch(setUser(res))
                localStorage.setItem('accessToken', res.accessToken)
                localStorage.setItem('refreshToken', res.refreshToken)
            } else {
                dispatch(sendUserFailed())
            }
        }).catch(err => {
            // console.log(`%c ${err}`, 'background-color: #FFC0CB');
            dispatch(setError(err))
        })
    }
}

export const logOutUser = (data) => {
    return (dispatch) => {
        dispatch(sendUserRequest())
        return logout(data).then(res => {
            if (res && res.success) {
                dispatch(setUser({
                    user: null,
                    success: false
                }))
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            } else {
                dispatch(sendUserFailed())
            }
        }).catch(err => {
            console.log(`%c ${err}`, 'background-color: #FFC0CB');
        })
    }
}

export const forgotPassword = (data) => {
    return (dispatch) => {
        dispatch(sendUserRequest())
        return forgotPass(data).then(res => {
            if (res && res.success) {
                dispatch(setUser({
                    user: null,
                    success: true
                }))
            } else {
                dispatch(sendUserFailed())
            }
        }).catch(err => {
            // console.log(`%c ${err}`, 'background-color: #FFC0CB');
            dispatch(setError(err))
        })
    }
}

export const resetPassword = (data) => {
    return (dispatch) => {
        dispatch(sendUserRequest())
        return resetPass(data).then(res => {
            if (res && res.success) {
                dispatch(setUser({
                    user: null,
                    success: true
                }))
            } else {
                dispatch(sendUserFailed())
            }
        }).catch(err => {
            // console.log(`%c ${err}`, 'background-color: #FFC0CB');
            dispatch(setError(err))
        })
    }
}