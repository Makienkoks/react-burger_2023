import {combineReducers} from "redux";
import orderListSlice from './orderList/reducer';
import userSlice from "./user/reducer";
import ingredientsSlice from "./ingredients/reducer";
import { reducer as sendOrder } from "./order/reducer";

export const rootReducer = combineReducers({
    orderList: orderListSlice,
    user: userSlice,
    ingredients: ingredientsSlice,
    sendOrder: sendOrder
});
