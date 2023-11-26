import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../configs/apis";
import { PRODUCTS_BY_COLLECTION_LIST_ENDPOINT_URL } from "../../constants/urls";
import { AppDispatch } from "../store";
import { FlashSaleItem } from "../flashSale/flashSaleSlice";

interface InitialState {
  loading: boolean;
  topSellingProductsList: FlashSaleItem[];
}

const initialState: InitialState = {
  loading: false,
  topSellingProductsList: [],
};

const topSellingProductsSlice = createSlice({
  name: "topSellingProducts",
  initialState,
  reducers: {
    topSellingProductsRequest(state) {
      state.loading = true;
    },
    topSellingProductsSuccess(state, action: PayloadAction<FlashSaleItem[]>) {
      state.loading = false;
      state.topSellingProductsList = action.payload;
    },
    topSellingProductsFailed(state) {
      state.loading = false;
    },
  },
});

export const {
  topSellingProductsRequest,
  topSellingProductsSuccess,
  topSellingProductsFailed,
} = topSellingProductsSlice.actions;

export async function getTopSellingProductsScreenData(
  dispatch: AppDispatch,
  data: { collection: number },
) {
  dispatch(topSellingProductsRequest());
  try {
    const response = await getData(
      PRODUCTS_BY_COLLECTION_LIST_ENDPOINT_URL,
      undefined,
      data,
    );
    dispatch(topSellingProductsSuccess(response?.data?.data?.result?.data));
    return response;
  } catch (error) {
    dispatch(topSellingProductsFailed());
    console.log(error);
  }
}

export default topSellingProductsSlice.reducer;
