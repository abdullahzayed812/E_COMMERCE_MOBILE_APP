import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../configs/apis";
import { HOME_ENDPOINT_URL } from "../../constants/urls";
import { AppDispatch } from "../store";
import { HomeDataPropType, InitialState } from "./types";

const initialState: InitialState = {
  loading: false,
  data: {
    slider: {
      main: [],
      right_top: {
        id: undefined,
        title: "",
        image: "",
      },
      right_bottom: {
        id: undefined,
        title: "",
        image: "",
      },
    },
    banners: [],
    featured_categories: [],
    flash_sales: [],
    time_zone: "",
    collections: [],
    featured_brands: [],
  },
};

export const fetchHomeData = createAsyncThunk(
  "home/fetchHomeData",
  async () => {
    try {
      const response = await getData("");
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    homeDataRequest(state) {
      state.loading = true;
    },
    homeDataSuccess(state, action: PayloadAction<HomeDataPropType>) {
      state.loading = false;
      state.data = action.payload;
    },
    homeDataFailed(state) {
      state.loading = false;
    },
  },
});

export const { homeDataRequest, homeDataSuccess, homeDataFailed } =
  homeSlice.actions;

export async function getHomeData(dispatch: AppDispatch) {
  dispatch(homeDataRequest());
  try {
    const response = await getData(HOME_ENDPOINT_URL);
    dispatch(homeDataSuccess(response?.data?.data));
    return response;
  } catch (error) {
    dispatch(homeDataFailed());
    console.log(error);
  }
}

export default homeSlice.reducer;
