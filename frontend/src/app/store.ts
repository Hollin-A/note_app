import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../features/notes/noteSlice";

export const store = configureStore({
  reducer: {
    noteReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
