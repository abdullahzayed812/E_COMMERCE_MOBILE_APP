import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../configs/apis";
import { FEATURED_CATEGORIES_PRODUCTS_ENDPOINT_URL } from "../../constants/urls";
import { AppDispatch } from "../store";
import { FlashSaleItem } from "../flashSale/flashSaleSlice";

interface InitialState {
  loading: boolean;
  featuredCategoriesList: FlashSaleItem[];
}

const initialState: InitialState = {
  loading: false,
  featuredCategoriesList: [],
};

const featuredCategoriesSlice = createSlice({
  name: "featuredCategories",
  initialState,
  reducers: {
    featuredCategoriesRequest(state) {
      state.loading = true;
    },
    featuredCategoriesSuccess(state, action: PayloadAction<FlashSaleItem[]>) {
      state.loading = false;
      state.featuredCategoriesList = action.payload;
    },
    featuredCategoriesFailed(state) {
      state.loading = false;
    },
  },
});

export const {
  featuredCategoriesRequest,
  featuredCategoriesSuccess,
  featuredCategoriesFailed,
} = featuredCategoriesSlice.actions;

export async function getFeaturedCategoriesScreenData(
  dispatch: AppDispatch,
  data: { page: number },
) {
  dispatch(featuredCategoriesRequest());
  try {
    const response = await getData(
      FEATURED_CATEGORIES_PRODUCTS_ENDPOINT_URL,
      undefined,
      data,
    );
    dispatch(featuredCategoriesSuccess(response?.data?.data?.data));
    return response;
  } catch (error) {
    dispatch(featuredCategoriesFailed());
    console.log(error);
  }
}

export default featuredCategoriesSlice.reducer;
