import {getIngredientsData} from '../../utils/api'
import { AppThunk } from "../store";
import {TIngredients} from "../../utils/types";
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsRequestSuccessAction {
  readonly payload: Array<TIngredients>;
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
}
export interface IGetIngredientsRequestFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export type TGetIngredientsActions =
    | IGetIngredientsRequestAction
    | IGetIngredientsRequestSuccessAction
    | IGetIngredientsRequestFailedAction

export const loadIngredients = (): AppThunk => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST
  })
  return getIngredientsData().then(res => {
    if (res && res.success) {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: res.data
      })
    } else {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      })
    }
  }).catch(err => {
    // console.log(`%c ${err}`, 'background-color: #FFC0CB');
    dispatch({
      type: GET_INGREDIENTS_FAILED
    })
  })
}