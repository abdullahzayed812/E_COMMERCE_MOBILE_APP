import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../configs/apis";
import { PRODUCTS_LIST_ENDPOINT_URL } from "../../constants/urls";
import { PublicProductsDataPropType } from "../home/types";
import { AppDispatch } from "../store";
import { InitialState } from "./types";

const initialState: InitialState = {
  loading: false,
  productsList: [],
};

const productsListSlice = createSlice({
  name: "productsList",
  initialState,
  reducers: {
    productsListRequest(state) {
      state.loading = true;
    },
    productsListSuccess(
      state,
      action: PayloadAction<PublicProductsDataPropType[]>,
    ) {
      state.loading = false;
      state.productsList = action.payload;
    },
    productsListFailed(state) {
      state.loading = false;
    },
  },
});

const { productsListRequest, productsListSuccess, productsListFailed } =
  productsListSlice.actions;

export async function getProductsList(
  dispatch: AppDispatch,
  data: { [index: string]: number | undefined } | undefined,
) {
  dispatch(productsListRequest());
  try {
    const response = await getData(PRODUCTS_LIST_ENDPOINT_URL, undefined, data);
    dispatch(productsListSuccess(response?.data?.data?.result?.data));
    return response;
  } catch (error) {
    dispatch(productsListFailed());
    console.log(error);
  }
}

export default productsListSlice.reducer;
