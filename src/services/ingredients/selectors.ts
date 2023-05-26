import {sliceName} from './slice';
import type { RootState } from '../store';
export const getIngredients = (store: RootState) => store[sliceName].data;
export const ingredientsIsLoading = (store: RootState) => store[sliceName].isLoading;
export const ingredientsIsError = (store: RootState) => store[sliceName].success;