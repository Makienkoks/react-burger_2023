import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TIngredient} from "../../utils/types";

const initialState: TOrderListData = {
    bun: null,
    ingredients: []
};
export type TOrderListData = {
    bun?: TIngredient | null,
    ingredients: Array<TIngredient>
}
export const orderListSlice = createSlice({
    name: 'orderList',
    initialState,
    reducers: {
        addIngredient: (state, action:PayloadAction<TOrderListData>) => {
            state.bun = action.payload.bun
            state.ingredients = action.payload.ingredients
        },
        deleteIngredient: (state, action:PayloadAction<TOrderListData>) => {
            state.ingredients = action.payload.ingredients
        },
        changeIngredient: (state, action:PayloadAction<TOrderListData>) => {
            state.ingredients = action.payload.ingredients
        }
    }
})
export const { addIngredient, deleteIngredient, changeIngredient} = orderListSlice.actions;
export default orderListSlice.reducer;