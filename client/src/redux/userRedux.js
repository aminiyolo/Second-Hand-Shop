import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isFetching: false,
    error: false,
    cart: [],
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
      state.error = false;
    },

    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    loginSet: (state) => {
      state.error = false;
    },

    logoutSuccess: (state) => {
      state.user = null;
    },

    addSuccess: (state, action) => {
      state.cart.push(action.payload);
    },

    removeSuccess: (state, action) => {
      state.cart = state.cart.filter((c) => c.id !== action.payload.id);
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  loginSet,
  addSuccess,
  removeSuccess,
} = userSlice.actions;
export default userSlice.reducer;
