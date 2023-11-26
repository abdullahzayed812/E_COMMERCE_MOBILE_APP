import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../configs/apis";
import { PRODUCTS_BY_COLLECTION_LIST_ENDPOINT_URL } from "../../constants/urls";
import { AppDispatch } from "../store";
import { FlashSaleItem } from "../flashSale/flashSaleSlice";

interface InitialState {
  loading: boolean;
  trendingProductsList: FlashSaleItem[];
}

const initialState: InitialState = {
  loading: false,
  trendingProductsList: [],
};

const trendingProductsSlice = createSlice({
  name: "trendingProducts",
  initialState,
  reducers: {
    trendingProductsRequest(state) {
      state.loading = true;
    },
    trendingProductsSuccess(state, action: PayloadAction<FlashSaleItem[]>) {
      state.loading = false;
      state.trendingProductsList = action.payload;
    },
    trendingProductsFailed(state) {
      state.loading = false;
    },
  },
});

export const {
  trendingProductsRequest,
  trendingProductsSuccess,
  trendingProductsFailed,
} = trendingProductsSlice.actions;

export async function getTrendingProductsScreenData(
  dispatch: AppDispatch,
  data: { collection: number },
) {
  dispatch(trendingProductsRequest());
  try {
    const response = await getData(
      PRODUCTS_BY_COLLECTION_LIST_ENDPOINT_URL,
      undefined,
      data,
    );
    dispatch(trendingProductsSuccess(response?.data?.data?.result?.data));
    return response;
  } catch (error) {
    dispatch(trendingProductsFailed());
    console.log(error);
  }
}

export default trendingProductsSlice.reducer;
