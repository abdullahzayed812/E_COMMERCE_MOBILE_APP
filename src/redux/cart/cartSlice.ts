import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../configs/apis";
import { CART_PRODUCTS_ENDPOINT_URL } from "../../constants/urls";
import { AppDispatch } from "../store";

interface TaxRules {
  id: number;
  price: number;
  type: number;
}

interface ShippingPlace {
  country: string;
  day_needed: number;
  id: number;
  pickup_point: number;
  pickup_price: string;
  price: string;
  shipping_rule_id: number;
  state: string;
}

interface ShippingRule {
  id: number;
  title: string;
  shipping_places: ShippingPlace[];
}

export interface CartProduct {
  flash_product: {
    title: string;
    image: string;
    offered: number;
    price: number;
    selling: number;
    tax_rules: TaxRules;
    shipping_rule: ShippingRule;
  };
  shipping_place: ShippingPlace;
  id: number;
  image: string;
  title: string;
  quantity: number;
  inventory_id: number;
  product_id: number;
  selected: number;
  shippingType?: number;
}

interface InitialState {
  loading: boolean;
  cartList: CartProduct[];
}

const initialState: InitialState = {
  loading: false,
  cartList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartProductsRequest(state) {
      state.loading = true;
    },
    cartProductsSuccess(state, action: PayloadAction<CartProduct[]>) {
      state.loading = false;
      state.cartList = action.payload;
    },
    cartProductsFailed(state) {
      state.loading = false;
    },
  },
});

export const { cartProductsRequest, cartProductsSuccess, cartProductsFailed } =
  cartSlice.actions;

export async function getCartProducts(dispatch: AppDispatch) {
  dispatch(cartProductsRequest());
  try {
    const response = await getData(CART_PRODUCTS_ENDPOINT_URL);
    dispatch(cartProductsSuccess(response?.data?.data));
    return response;
  } catch (error) {
    dispatch(cartProductsFailed());
    console.log(error);
  }
}

export default cartSlice.reducer;
