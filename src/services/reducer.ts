import {combineReducers} from "redux";
import { reducer as orderListSliceReducer } from './orderList/reducer';
import { reducer as userReducer } from "./user/reducer";
import { reducer as ingredientsReducer } from "./ingredients/reducer";
import { reducer as sendOrderReducer } from "./order/reducer";
import { wsFeedReducer } from "./feed/reducer";
import {wsFeedProfileReducer} from "./feed-profile/reducer";


export const rootReducer = combineReducers({
    orderList: orderListSliceReducer,
    user: userReducer,
    ingredients: ingredientsReducer,
    sendOrder: sendOrderReducer,
    feed: wsFeedReducer,
    feedProfile: wsFeedProfileReducer
});
