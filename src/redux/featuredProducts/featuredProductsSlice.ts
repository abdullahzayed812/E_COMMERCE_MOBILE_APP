import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../configs/apis";
import { PRODUCTS_BY_COLLECTION_LIST_ENDPOINT_URL } from "../../constants/urls";
import { AppDispatch } from "../store";
import { FlashSaleItem } from "../flashSale/flashSaleSlice";

interface InitialState {
  loading: boolean;
  featuredProductsList: FlashSaleItem[];
}

const initialState: InitialState = {
  loading: false,
  featuredProductsList: [],
};

const featuredProductsSlice = createSlice({
  name: "featuredProducts",
  initialState,
  reducers: {
    featuredProductsRequest(state) {
      state.loading = true;
    },
    featuredProductsSuccess(state, action: PayloadAction<FlashSaleItem[]>) {
      state.loading = false;
      state.featuredProductsList = action.payload;
    },
    featuredProductsFailed(state) {
      state.loading = false;
    },
  },
});

export const {
  featuredProductsRequest,
  featuredProductsSuccess,
  featuredProductsFailed,
} = featuredProductsSlice.actions;

export async function getFeaturedProductsScreenData(
  dispatch: AppDispatch,
  data: { collection: number },
) {
  dispatch(featuredProductsRequest());
  try {
    const response = await getData(
      PRODUCTS_BY_COLLECTION_LIST_ENDPOINT_URL,
      undefined,
      data,
    );
    dispatch(featuredProductsSuccess(response?.data?.data?.result?.data));
    return response;
  } catch (error) {
    dispatch(featuredProductsFailed());
    console.log(error);
  }
}

export default featuredProductsSlice.reducer;
