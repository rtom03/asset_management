import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    register(state, action) {
      return action.payload;
    },
    login(state, action) {
      console.log(action.payload);
      return action.payload;
    },
    logout(state, action) {
      return (action.payload = null);
    },
  },
});

export const userReducer = userSlice.reducer;
export const { login, register, logout } = userSlice.actions;
