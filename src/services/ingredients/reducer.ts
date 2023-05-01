import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TIngredients} from "../../utils/types";
const initialState: TIngredientsData = {
    ingredients: [],
    isLoading: false,
    error: true,
};
export type TIngredientsData = {
    ingredients: Array<TIngredients>,
    isLoading: boolean,
    error: boolean,
}
export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        getIngredients: (state, action: PayloadAction<TIngredientsData | null>) => {
            state.isLoading = true
        },
        getIngredientsSuccess: (state, action) => {
            state.isLoading = false
            state.ingredients = action.payload.data
            state.error = !action.payload.success

        },
        getIngredientsFailed: (state, action) => {
            state.isLoading = false
            state.error = true
        }
    }
})
export const { getIngredients, getIngredientsSuccess, getIngredientsFailed} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;