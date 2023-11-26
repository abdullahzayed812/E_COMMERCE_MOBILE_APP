import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./home/homeSlice";
import productDetailsReducer from "./productDetails/productDetailsSlice";
import productsListReducer from "./productsList/productsListSlice";
import cartReducer from "./cart/cartSlice";
import userReducer from "./user";
import flashSaleReducer from "./flashSale/flashSaleSlice";
import featuredProductsReducer from "./featuredProducts/featuredProductsSlice";
import trendingProductsReducer from "./trendingProducts/trendingProductsSlice";
import topSellingProductsReducer from "./topSellingProducts/topSellingSlice";
import featuredCategoriesReducer from "./featuredCategories/featuredCategoriesSlice";
import featuredBrandsReducer from "./featuredBrands/featuredBrandsSlice";
import ordersReducer from "./orders";
import themeReducer from "./theme/themeSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    productDetails: productDetailsReducer,
    productsList: productsListReducer,
    cartList: cartReducer,
    user: userReducer,
    flashSale: flashSaleReducer,
    featuredProducts: featuredProductsReducer,
    trendingProducts: trendingProductsReducer,
    topSellingProducts: topSellingProductsReducer,
    featuredCategories: featuredCategoriesReducer,
    featuredBrands: featuredBrandsReducer,
    orders: ordersReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
