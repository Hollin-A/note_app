import { createSlice, createAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface IThemeState {
  lightTheme: boolean;
}

const initialState: IThemeState = {
  lightTheme: false,
};

export const toggleTheme = createAction("theme/toggle");

export const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggle: (state) => {
      state.lightTheme = !state.lightTheme;
      console.log(state.lightTheme);
    },
  },
});

export const themeSelector = (state: RootState) => state.themeReducer;
export default themeSlice.reducer;
