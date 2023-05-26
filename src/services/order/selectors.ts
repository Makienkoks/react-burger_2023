import type { RootState } from '../store';
export const getNumOrder = (store: RootState) => store['sendOrder']["number"];
export const sendOrderIsLoading = (store: RootState) => store['sendOrder']["isLoading"];
export const sendOrderIsError = (store: RootState) => store['sendOrder']["success"];