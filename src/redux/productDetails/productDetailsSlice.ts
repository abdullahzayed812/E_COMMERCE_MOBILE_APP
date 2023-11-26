import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../configs/apis";
import { PRODUCT_DETAILS_ENDPOINT_URL } from "../../constants/urls";
import { AppDispatch } from "../store";
import { InitialState, ProductDetailsPropType } from "./types";

const initialState: InitialState = {
  loading: false,
  productDetails: {
    id: undefined,
    title: "",
    image: "",
    video: "",
    images: undefined,
    bundle_deal: { title: "" },
    brand: { title: "" },
    refundable: undefined,
    selling: undefined,
    offered: undefined,
    attribute: [],
    inventory: [],
  },
};

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    productDetailsRequest(state) {
      state.loading = true;
    },
    productDetailsSuccess(
      state,
      action: PayloadAction<ProductDetailsPropType>,
    ) {
      state.loading = false;
      state.productDetails = action.payload;
    },
    productDetailsFailed(state) {
      state.loading = false;
    },
  },
});

const { productDetailsRequest, productDetailsSuccess, productDetailsFailed } =
  productDetailsSlice.actions;

export async function getProductDetails(
  dispatch: AppDispatch,
  id: number | undefined,
) {
  dispatch(productDetailsRequest());
  try {
    const response = await getData(PRODUCT_DETAILS_ENDPOINT_URL, id);
    dispatch(productDetailsSuccess(response?.data?.data));
    return response;
  } catch (error) {
    dispatch(productDetailsFailed());
    console.log(error);
  }
}

export default productDetailsSlice.reducer;
