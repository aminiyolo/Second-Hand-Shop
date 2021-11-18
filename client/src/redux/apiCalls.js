import {
  loginStart,
  loginFailure,
  loginSuccess,
  logoutSuccess,
  addSuccess,
  removeSuccess,
} from "./userRedux";
import axiosInstance from "../config";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post("/api/users/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch, token) => {
  try {
    await axiosInstance.get("/api/users/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(logoutSuccess());
  } catch (err) {
    console.log(err);
  }
};

export const addCart = async (dispatch, id, token) => {
  try {
    await axiosInstance.post("/api/users/addToCart", id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addSuccess(id));
  } catch (err) {
    return err;
  }
};

export const removeCart = async (dispatch, id, token) => {
  try {
    await axiosInstance.post("/api/users/removeFromCart", id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(removeSuccess(id));
  } catch (err) {
    return err;
  }
};
