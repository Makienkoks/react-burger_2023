import {getResponse} from './utils';
import {TForgotFormFields, TFormFields, TOrder, TResetFormFields, TToken, TUser} from "./types";

const apiConfig = {
  baseUrl: 'https://norma.nomoreparties.space/api'
}

export const getIngredientsData = async () => {
  return await fetch(`${apiConfig.baseUrl}/ingredients`).then(getResponse)
}

export const send = async (data: TOrder) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
        Authorization: '' + localStorage.getItem('accessToken'),
    },
    body: JSON.stringify(data)
  }
  return await fetch(`${apiConfig.baseUrl}/orders`, requestOptions).then(getResponse)
}

export const user = async (data?:TUser | null) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: '' + localStorage.getItem('accessToken'),
    },
    body: JSON.stringify(data)
  }
  if (data) {
    requestOptions.method = 'PATCH'
  }

  return await fetch(`${apiConfig.baseUrl}/auth/user?`, requestOptions).then(getResponse)
}
export const register = async (data:TUser) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  return await fetch(`${apiConfig.baseUrl}/auth/register`, requestOptions).then(getResponse)
}
export const logout = async (data: TToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  return await fetch(`${apiConfig.baseUrl}/auth/logout`, requestOptions).then(getResponse)
}
export const login = async (data: TFormFields) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  return await fetch(`${apiConfig.baseUrl}/auth/login`, requestOptions).then(getResponse)
}
export const forgotPass = async (data: TForgotFormFields) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  return await fetch(`${apiConfig.baseUrl}/password-reset`, requestOptions).then(getResponse)
}
export const resetPass = async (data: TResetFormFields) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  return await fetch(`${apiConfig.baseUrl}/password-reset/reset`, requestOptions).then(getResponse)
}
export const token = async (data: TToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data),
  }
  return await fetch(`${apiConfig.baseUrl}/auth/token`, requestOptions).then(getResponse)
}
