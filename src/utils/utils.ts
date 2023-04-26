export const getResponse = (res: Response): Promise<any> => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}