import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../configs/apis";
import { loadUser } from "../../configs/localStorage";
import { USER_PROFILE_ENDPOINT_URL } from "../../constants/urls";
import { AppDispatch } from "../store";

interface User {
  id: number;
  email: string;
}

interface InitialState {
  user: User | null;
  cartCount: number | undefined;
  userProfile: {
    name: string;
    email: string;
  };
}

const initialState: InitialState = {
  user: null,
  cartCount: undefined,
  userProfile: { name: "", email: "" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setCartCount(state, action: PayloadAction<number>) {
      state.cartCount = action.payload;
    },
    getUserProfile(state, action) {
      state.userProfile = action.payload;
    },
  },
});

export const { getUser, setCartCount, getUserProfile } = userSlice.actions;

export async function getUserData(dispatch: AppDispatch) {
  try {
    const user = await loadUser();
    if (user?.email) return dispatch(getUser(user));
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function getCartCount(dispatch: AppDispatch) {
  try {
    const response = await getData(USER_PROFILE_ENDPOINT_URL);
    dispatch(setCartCount(response?.data?.data.cart_count));
    dispatch(getUserProfile(response?.data?.data));
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default userSlice.reducer;
