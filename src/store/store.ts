import { configureStore } from "@reduxjs/toolkit";
import mainDataSlice from "../slices/data";
import selectedBoardSlice from "../slices/selectedBoard";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    mainData: mainDataSlice,
    selectedBoard: selectedBoardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// dispatch = useAppDispatch()
