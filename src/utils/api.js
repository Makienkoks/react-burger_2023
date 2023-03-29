const apiConfig = {
  baseUrl: 'https://norma.nomoreparties.space/api'
}

const getResponse = (res) => {
  if (res.ok) {
    return res.json()
  }

  return Promise.reject(`Ошибка ${res.status}`)
}

export const getIngredients = () => {
  return fetch(`${apiConfig.baseUrl}/ingredients`).then(getResponse)
}

export const send = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  return fetch(`${apiConfig.baseUrl}/orders`, requestOptions).then(getResponse)
}