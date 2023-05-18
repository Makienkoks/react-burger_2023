import { createAction } from '@reduxjs/toolkit';
import {TOrdersStoreData} from "../../utils/types";

export const connectProfile = createAction<string, 'FEED_PROFILE_CONNECT'>('FEED_PROFILE_CONNECT');
export const disconnectProfile = createAction('FEED_PROFILE_DISCONNECT');
export const wsConnectingProfile = createAction('FEED_PROFILE_CONNECTING');
export const wsOpenProfile = createAction('FEED_PROFILE_OPEN');
export const wsCloseProfile = createAction('FEED_PROFILE_CLOSE');
export const wsMessageProfile = createAction<TOrdersStoreData, 'FEED_PROFILE_MESSAGE'>('FEED_PROFILE_MESSAGE');
export const wsErrorProfile = createAction<string, 'FEED_PROFILE_ERROR'>('FEED_PROFILE_ERROR');

export type TWsFeedProfileActions = ReturnType<typeof connectProfile>
    | ReturnType<typeof disconnectProfile>
    | ReturnType<typeof wsConnectingProfile>
    | ReturnType<typeof wsOpenProfile>
    | ReturnType<typeof wsCloseProfile>
    | ReturnType<typeof wsMessageProfile>
    | ReturnType<typeof wsErrorProfile>;