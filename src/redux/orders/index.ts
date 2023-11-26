import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postData } from "../../configs/apis";
import { ORDERS_ENDPOINT_URL } from "../../constants/urls";
import { AppDispatch } from "../store";
import { InitialState, OrderDetails } from "./types";

const initialState: InitialState = {
  loading: false,
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    ordersRequest(state) {
      state.loading = true;
    },
    ordersSuccess(state, action: PayloadAction<OrderDetails[]>) {
      state.loading = false;
      state.orders = action.payload;
    },
    ordersFailed(state) {
      state.loading = false;
    },
  },
});

const { ordersRequest, ordersSuccess, ordersFailed } = ordersSlice.actions;

export async function getOrders(dispatch: AppDispatch) {
  dispatch(ordersRequest());
  try {
    const response = await postData(ORDERS_ENDPOINT_URL, undefined);
    dispatch(ordersSuccess(response?.data?.data?.data));
    return response;
  } catch (error) {
    dispatch(ordersFailed());
    console.log(error);
  }
}

export default ordersSlice.reducer;
