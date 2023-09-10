import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios, { AxiosResponse } from "axios";

import BASE_URL from "../../config/apiConfig";

export const initialState: IUserState = {
  loggedIn: false,
  username: undefined,
  jwt: undefined,
  error: undefined,
};

export const loginUser = createAsyncThunk(
  "users/login",
  (props: { email: string; password: string }) => {
    const res = axios
      .post(`${BASE_URL}/auth/login`, {
        email: props.email,
        password: props.password,
      })
      .then((data: AxiosResponse<{ token: string; username: string }>) => {
        return data.data;
      })
      .catch((err) => {
        throw err;
      });
    return res;
  }
);

export const registerUser = createAsyncThunk(
  "users/register",
  (props: { username: string; email: string; password: string }) => {
    const res = axios
      .post(`${BASE_URL}/auth/register`, {
        userName: props.username,
        email: props.email,
        password: props.password,
      })
      .then((data: AxiosResponse<{ token: string; username: string }>) => {
        return data.data;
      })
      .catch((err) => {
        throw err;
      });
    return res;
  }
);

export const clearError = createAction("user/clearError");

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<{ token: string; username: string }>) => {
        state.loggedIn = true;
        state.jwt = action.payload.token;
        state.username = action.payload.username;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loggedIn = false;
      state.jwt = "";
      state.error =
        action.error.message === "Request failed with status code 401"
          ? "Invalid email or password. Try again"
          : action.error.message;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<{ token: string; username: string }>) => {
        state.loggedIn = true;
        state.jwt = action.payload.token;
        state.username = action.payload.username;
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loggedIn = false;
      state.jwt = "";
      state.error = action.error.message;
    });
  },
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
  },
});

export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
