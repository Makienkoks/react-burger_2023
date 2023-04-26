import {createStore, applyMiddleware, compose} from "redux";
import { rootReducer } from "./reducer";
import thunk from "redux-thunk";

const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type ThunkAPI = {
    dispatch: AppDispatch,
    store: RootState,
}