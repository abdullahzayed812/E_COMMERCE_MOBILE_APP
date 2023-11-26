export const BASE_URL: string = "http://api.bastastore.com/api/v1";
export const HOME_ENDPOINT_URL: string = "/home";

export const PRODUCT_DETAILS_ENDPOINT_URL: string = "/product/";
export const PRODUCTS_LIST_ENDPOINT_URL: string = "/products/";
export const PRODUCTS_BY_COLLECTION_LIST_ENDPOINT_URL: string = "/products";

export const REGISTER_ENDPOINT_URL: string = "/user/signup";
export const LOGIN_ENDPOINT_URL: string = "/user/signin";
export const VERIFY_CODE_ENDPOINT_URL: string = "/user/verify";
export const USER_PROFILE_ENDPOINT_URL: string = "/user/profile";
export const USER_ADDRESSES_ENDPOINT_URL: string = "/user/address/all";
export const ADD_ADDRESS_ENDPOINT_URL: string = "/user/address/action";
export const UPDATE_USER_PROFILE_ENDPOINT_URL: string = "/user/update-profile";
export const WISH_LIST_ENDPOINT_URL: string =
  "/user/wishlist/all?type=asc&order_by=id";
export const GET_WISH_LIST_PRODUCT_ENDPOINT_URL =
  "/user/wishlist/find-product/";
export const ADD_TO_WISH_LIST_ENDPOINT_URL: string = "/user/wishlist/action";
export const COMPARED_LIST_ENDPOINT_URL: string =
  "/user/compare-list/all?type=asc&order_by=id";
export const GET_COMPARED_LIST_PRODUCT_ENDPOINT_URL =
  "/user/compare-list/find-product/";
export const ADD_TO_COMPARED_LIST_ENDPOINT_URL: string =
  "/user/compare-list/action";
export const VOUCHERS_LIST_ENDPOINT_URL: string =
  "/user/user-vouchers?order_by=title&type=asc";

export const CONTACT_US_ENDPOINT_URL: string = "/contact";

export const FEATURED_CATEGORIES_PRODUCTS_ENDPOINT_URL: string = "/categories";
export const FEATURED_BRANDS_PRODUCTS_ENDPOINT_URL: string = "/brands";

export const CART_PRODUCTS_ENDPOINT_URL: string = "/cart/by-user";
export const CART_ACTION_ENDPOINT_URL: string = "/cart/action";
export const CHANGE_SELECTED_CART_PRODUCT_ENDPOINT_URL: string = "/cart/change";
export const DELETE_CART_PRODUCT_ENDPOINT_URL: string = "/cart/delete/";
export const UPDATE_SHIPPING_ENDPOINT_URL: string = "/cart/update-shipping";
export const COUNTRIES_DATA_ENDPOINT_URL: string = "/countries-phones";

export const CONFIRM_ORDER_ENDPOINT_URL: string = "/order/action";
export const ORDERS_ENDPOINT_URL: string = "/order/by-user";

// query parameters { id, page }
export const FLASH_SALE_SCREEN_DATA_ENDPOINT_URL: string = "/flash-sale/1";

export const IMAGE_PREFIX_URL = "https://cdn.ishop.cholobangla.com/uploads/";

// query parameters { totalAmount, vouchersID }
export const PAYMENT_INTEGRATION_ENDPOINT_URL: string =
  "/mobile-payment/paypal/web-view";

// query parameters { orderID }
export const CAPTURE_PAYMENT_END_POINT_URL: string =
  "/mobile-payment/capture-payment/:";
