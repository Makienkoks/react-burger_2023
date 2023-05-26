import { createAction } from '@reduxjs/toolkit';
import {TOrdersStoreData} from "../../utils/types";

export const connect = createAction<string, 'FEED_CONNECT'>('FEED_CONNECT');
export const disconnect = createAction('FEED_DISCONNECT');
export const wsConnecting = createAction('FEED_CONNECTING');
export const wsOpen = createAction('FEED_OPEN');
export const wsClose = createAction('FEED_CLOSE');
export const wsMessage = createAction<TOrdersStoreData, 'FEED_MESSAGE'>('FEED_MESSAGE');
export const wsError = createAction<string, 'FEED_ERROR'>('FEED_ERROR');

export type TWsFeedActions = ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>;