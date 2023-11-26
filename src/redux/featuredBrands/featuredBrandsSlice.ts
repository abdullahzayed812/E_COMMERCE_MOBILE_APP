import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../configs/apis";
import { AppDispatch } from "../store";
import { FlashSaleItem } from "../flashSale/flashSaleSlice";
import { FEATURED_BRANDS_PRODUCTS_ENDPOINT_URL } from "../../constants/urls";

interface InitialState {
  loading: boolean;
  featuredBrandsList: FlashSaleItem[];
}

const initialState: InitialState = {
  loading: false,
  featuredBrandsList: [],
};

const featuredBrandsSlice = createSlice({
  name: "featuredBrands",
  initialState,
  reducers: {
    featuredBrandsRequest(state) {
      state.loading = true;
    },
    featuredBrandsSuccess(state, action: PayloadAction<FlashSaleItem[]>) {
      state.loading = false;
      state.featuredBrandsList = action.payload;
    },
    featuredBrandsFailed(state) {
      state.loading = false;
    },
  },
});

export const {
  featuredBrandsRequest,
  featuredBrandsSuccess,
  featuredBrandsFailed,
} = featuredBrandsSlice.actions;

export async function getFeaturedBrandsScreenData(
  dispatch: AppDispatch,
  data: { page: number },
) {
  dispatch(featuredBrandsRequest());
  try {
    const response = await getData(
      FEATURED_BRANDS_PRODUCTS_ENDPOINT_URL,
      undefined,
      data,
    );
    dispatch(featuredBrandsSuccess(response?.data?.data?.data));
    return response;
  } catch (error) {
    dispatch(featuredBrandsFailed());
    console.log(error);
  }
}

export default featuredBrandsSlice.reducer;
