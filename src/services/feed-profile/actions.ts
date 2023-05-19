import { createAction } from '@reduxjs/toolkit';
import {TOrdersStoreData} from "../../utils/types";

export const connect = createAction<string, 'FEED_PROFILE_CONNECT'>('FEED_PROFILE_CONNECT');
export const disconnect = createAction('FEED_PROFILE_DISCONNECT');
export const wsConnecting = createAction('FEED_PROFILE_CONNECTING');
export const wsOpen = createAction('FEED_PROFILE_OPEN');
export const wsClose = createAction('FEED_PROFILE_CLOSE');
export const wsMessage = createAction<TOrdersStoreData, 'FEED_PROFILE_MESSAGE'>('FEED_PROFILE_MESSAGE');
export const wsError = createAction<string, 'FEED_PROFILE_ERROR'>('FEED_PROFILE_ERROR');

export type TWsFeedProfileActions = ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>;