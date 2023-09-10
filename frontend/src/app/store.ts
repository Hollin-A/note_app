import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../features/notes/noteSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    noteReducer,
    userReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
