import { createSlice } from "@reduxjs/toolkit";

export type User = {
  token: string;
  ID: string;
  _id: string;
  image: string;
  name: string;
  nickname: string;
  email: string;
  role: number;
};

type Cart = {
  id: string;
};

interface IState {
  user: User | null;
  isFetching: boolean;
  error: boolean;
  cart: Cart[];
}

const initialState: IState = {
  user: null,
  isFetching: false,
  error: false,
  cart: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
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
