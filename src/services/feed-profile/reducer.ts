import {WebsocketStatus, TOrdersStoreData} from "../../utils/types";
import { createReducer } from '@reduxjs/toolkit'
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "./actions";

export type wsFeedProfileStore = {
    status: WebsocketStatus,
    connectionError: string,
    data: TOrdersStoreData,
}
export const initialState: wsFeedProfileStore = {
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    data: {
        success: false,
        orders: [{
            _id: '',
            status: 'pending',
            number: 0,
            createdAt: '',
            updatedAt: '',
            name: '',
            ingredients: [],
        }],
        total: 0,
        totalToday: 0,
    },
};

export const wsFeedProfileReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(wsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = '';
        })
        .addCase(wsClose, (state) => {
            state.status = WebsocketStatus.OFFLINE;
        })
        .addCase(wsError, (state, action) => {
            state.connectionError = action.payload;
        })
        .addCase(wsMessage, (state, action) => {
            state.data = action.payload
        })
})