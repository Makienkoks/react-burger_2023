import {sliceName} from './slice';
import type { RootState } from '../store';
export const orderIngredients = (store: RootState) => store[sliceName].ingredients;
export const orderBun = (store: RootState) => store[sliceName].bun;