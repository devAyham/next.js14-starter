import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
/**
 * Use throughout your app instead of plain `useDispatch` and `useSelector`
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
/**
 * Use throughout your app instead of plain `useDispatch` and `useSelector`
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
