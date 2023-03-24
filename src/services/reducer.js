import {combineReducers} from "redux";
import { reducer as ingredientsReducer } from "./ingredients/reducer";
import { reducer as selectedIngredient } from "./selectedIngredient/reducer";
import { reducer as orderListReducer } from "./orderList/reducer";
import { reducer as sendOrder } from "./order/reducer";

export const rootReducer = combineReducers({
    // список всех полученных ингредиентов,
    ingredients: ingredientsReducer,
    // список всех ингредиентов в текущем конструкторе бургера,
    orderList: orderListReducer,
    // объект текущего просматриваемого ингредиента,
    selectedIngredient: selectedIngredient,
    // объект созданного заказа.
    sendOrder: sendOrder
});
