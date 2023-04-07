import {combineReducers} from "redux";
import { reducer as ingredientsReducer } from "./ingredients/reducer";
import userSlice from "./user/reducer";
import { reducer as orderListReducer } from "./orderList/reducer";
import { reducer as sendOrder } from "./order/reducer";

export const rootReducer = combineReducers({
    // список всех полученных ингредиентов,
    ingredients: ingredientsReducer,
    // список всех ингредиентов в текущем конструкторе бургера,
    orderList: orderListReducer,
    // объект текущего просматриваемого ингредиента,
    user: userSlice,
    // объект созданного заказа.
    sendOrder: sendOrder
});
