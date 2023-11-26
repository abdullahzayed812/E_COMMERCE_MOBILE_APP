import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../configs/apis";
import { FLASH_SALE_SCREEN_DATA_ENDPOINT_URL } from "../../constants/urls";
import { AppDispatch } from "../store";

export interface FlashSaleItem {
  id: number;
  product_id: number;
  flash_sale_id: number;
  price: number;
  title: string;
  selling: number;
  offered: number;
  badge: null | string;
  slug: string;
  image: string;
  review_count: number;
  rating: number;
}

interface InitialState {
  loading: boolean;
  flashSaleScreenList: FlashSaleItem[];
}

const initialState: InitialState = {
  loading: false,
  flashSaleScreenList: [],
};

const flashSaleScreenSlice = createSlice({
  name: "flashSale",
  initialState,
  reducers: {
    flashSaleRequest(state) {
      state.loading = true;
    },
    flashSaleSuccess(state, action: PayloadAction<FlashSaleItem[]>) {
      state.loading = false;
      state.flashSaleScreenList = action.payload;
    },
    flashSaleFailed(state) {
      state.loading = false;
    },
  },
});

export const { flashSaleRequest, flashSaleSuccess, flashSaleFailed } =
  flashSaleScreenSlice.actions;

export async function getFlashSaleScreenData(dispatch: AppDispatch) {
  dispatch(flashSaleRequest());
  try {
    const response = await getData(FLASH_SALE_SCREEN_DATA_ENDPOINT_URL);
    dispatch(flashSaleSuccess(response?.data?.data?.data));
    return response;
  } catch (error) {
    dispatch(flashSaleFailed());
    console.log(error);
  }
}

export default flashSaleScreenSlice.reducer;
