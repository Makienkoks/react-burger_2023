import { AppThunk } from "../store";
import { TOrderListData } from "../../utils/types";

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const CHANGE_INGREDIENT = 'CHANGE_INGREDIENT'

export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: TOrderListData;
}
export interface IRemoveIngredient {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly payload: TOrderListData;
}
export interface IChangeIngredient {
    readonly type: typeof CHANGE_INGREDIENT;
    readonly payload: TOrderListData;
}
export type TOrderListActions =
    | IAddIngredient
    | IRemoveIngredient
    | IChangeIngredient
export const addIngredient = (data: TOrderListData): AppThunk => {
    return (dispatch) => {
        dispatch({
            type: ADD_INGREDIENT,
            payload: data,
        })
    }
}
export const deleteIngredient = (data: TOrderListData): AppThunk => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_INGREDIENT,
            payload: data
        })
    }
}
export const changeIngredient = (data: TOrderListData): AppThunk => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_INGREDIENT,
            payload: data
        })
    }
}