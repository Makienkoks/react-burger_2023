import type { RootState } from '../store';
export const dataFeed = (store: RootState) => store.feed;
export const statusFeed = (store: RootState) => store.feed.status;
export const connectionErrorFeed = (store: RootState) => store.feed.connectionError;
export const ordersFeed = (store: RootState) => store.feed.data.orders;
export const successFeed = (store: RootState) => store.feed.data.success;
export const totalFeed = (store: RootState) => store.feed.data.total;
export const totalTodayFeed = (store: RootState) => store.feed.data.totalToday;
export const urlConnectFeed = (store: RootState) => store.feed.data.totalToday;