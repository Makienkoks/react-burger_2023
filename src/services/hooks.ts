import {
  TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from "react-redux";
import type { RootState, AppDispatch } from "./store";
export const useDispatch: () => AppDispatch = useDispatchRedux;

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;
