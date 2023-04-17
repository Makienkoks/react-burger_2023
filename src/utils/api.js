const apiConfig = {
  baseUrl: 'https://norma.nomoreparties.space/api'
}

const getResponse = (res) => {
  if (res.ok) {
    return res.json()
  }

  return Promise.reject(`Ошибка ${res.status}`)
}

export const getIngredients = async () => {
  return await fetch(`${apiConfig.baseUrl}/ingredients`).then(getResponse)
}

export const send = async (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  return await fetch(`${apiConfig.baseUrl}/orders`, requestOptions).then(getResponse)
}

export const user = async  (data) => {
  const requestOptions = {
    headers: {
      method: 'GET',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: localStorage.getItem('accessToken'),
    },
  }
  if (data) {
    requestOptions.method = 'PATCH'
    requestOptions.body = JSON.stringify(data)
  }

  return await fetch(`${apiConfig.baseUrl}/auth/user?`, requestOptions).then(getResponse)
}

export const register = async (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  return await fetch(`${apiConfig.baseUrl}/auth/register`, requestOptions).then(getResponse)
}

export const logout = async (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  return await fetch(`${apiConfig.baseUrl}/auth/logout`, requestOptions).then(getResponse)
}

export const login = async (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  return await fetch(`${apiConfig.baseUrl}/auth/login`, requestOptions).then(getResponse)
}

export const forgotPass = async (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  return await fetch(`${apiConfig.baseUrl}/password-reset`, requestOptions).then(getResponse)
}

export const resetPass = async (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  return await fetch(`${apiConfig.baseUrl}/password-reset/reset`, requestOptions).then(getResponse)
}

export const token = async (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data),
  }
  return await fetch(`${apiConfig.baseUrl}/auth/token`, requestOptions).then(getResponse)
}
