import {getIngredientsData} from '../../utils/api'
import {getIngredients, getIngredientsSuccess, getIngredientsFailed} from "./reducer";
import {AppDispatch} from "../store";
export const loadIngredients = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getIngredients(null))
    getIngredientsData().then(res => {
      if (res && res.success) {
        dispatch(getIngredientsSuccess(res))
      } else {
        dispatch(getIngredientsFailed(null))
      }
    })
  }
}