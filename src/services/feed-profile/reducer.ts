import {WebsocketStatus, TOrdersStoreData} from "../../utils/types";
import { createReducer } from '@reduxjs/toolkit'
import {wsOpenProfile, wsCloseProfile, wsMessageProfile, wsErrorProfile, wsConnectingProfile, connectProfile} from "./actions";

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
        .addCase(wsConnectingProfile, (state) => {
            state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(wsOpenProfile, (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = '';
        })
        .addCase(wsCloseProfile, (state) => {
            state.status = WebsocketStatus.OFFLINE;
        })
        .addCase(wsErrorProfile, (state, action) => {
            state.connectionError = action.payload;
        })
        .addCase(wsMessageProfile, (state, action) => {
            state.data = action.payload
        })
})