// import {createStore, applyMiddleware, compose} from "redux";
// import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit'
import  { rootReducer }  from './reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import type {} from 'redux-thunk/extend-redux'

import {ThunkAction} from "redux-thunk";
import {TGetIngredientsActions} from "./ingredients/actions";
import {TSendOrderActions} from "./order/actions";
import {TOrderListActions} from "./orderList/actions";
import {TUserActions} from "./user/actions";
import {TWsFeedActions} from './feed/actions'
import {TWsFeedProfileActions} from './feed-profile/actions'

import {
    connect as FeedWsConnect,
    disconnect as FeedWsDisconnect,
    wsConnecting as FeedWsConnecting,
    wsOpen as FeedWsOpen,
    wsClose as FeedWsClose,
    wsMessage as FeedWsMessage,
    wsError as FeedWsError
} from "./feed/actions";


import {
    connect as ProfileWsConnect,
    disconnect as ProfileWsDisconnect,
    wsConnecting as ProfileWsConnecting,
    wsOpen as ProfileWsOpen,
    wsClose as ProfileWsClose,
    wsMessage as ProfileWsMessage,
    wsError as ProfileWsError
} from "./feed-profile/actions";

export type RootState = ReturnType<typeof rootReducer>
//
// const composeEnhancers =
//     typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//         ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//         : compose;
//
// const enhancer = composeEnhancers(applyMiddleware(thunk));

// export const store = createStore(rootReducer, enhancer)


const wsActions = {
    wsConnect: FeedWsConnect,
    wsDisconnect: FeedWsDisconnect,
    wsConnecting: FeedWsConnecting,
    onOpen: FeedWsOpen,
    onClose: FeedWsClose,
    onError: FeedWsError,
    onMessage: FeedWsMessage,
};

const wsActionsProfile = {
    wsConnect: ProfileWsConnect,
    wsDisconnect: ProfileWsDisconnect,
    wsConnecting: ProfileWsConnecting,
    onOpen: ProfileWsOpen,
    onClose: ProfileWsClose,
    onError: ProfileWsError,
    onMessage: ProfileWsMessage,
};
const FeedMiddleware = socketMiddleware(wsActions);
const ProfileMiddleware = socketMiddleware(wsActionsProfile);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(FeedMiddleware, ProfileMiddleware)
    }
})

export type AppActions =
    | TGetIngredientsActions
    | TSendOrderActions
    | TOrderListActions
    | TUserActions
    | TWsFeedActions
    | TWsFeedProfileActions;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AppActions
>

export type AppDispatch<TReturnType = void> = (action: AppActions | AppThunk<TReturnType>) => TReturnType;