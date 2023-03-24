import {createStore, applyMiddleware, compose} from "redux";
import { rootReducer } from "./reducer";
import thunk from "redux-thunk";

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
export const configureStore = (initialState) => {
    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    return store;
};
