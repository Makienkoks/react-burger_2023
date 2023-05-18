import type { RootState } from '../store';
export const dataFeedProfile = (store: RootState) => store.feedProfile;
export const statusFeedProfile = (store: RootState) => store.feedProfile.status;
export const connectionErrorFeedProfile = (store: RootState) => store.feedProfile.connectionError;
export const ordersFeedProfile = (store: RootState) => store.feedProfile.data.orders;
export const successFeedProfile = (store: RootState) => store.feedProfile.data.success;
export const totalFeedProfile = (store: RootState) => store.feedProfile.data.total;
export const totalTodayFeedProfile = (store: RootState) => store.feedProfile.data.totalToday;