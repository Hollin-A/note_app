import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import noteReducer from "../features/notes/noteSlice";
import userReducer from "../features/user/userSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["notesReducer"],
};

const rootReducer = combineReducers({
  userReducer,
  noteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
