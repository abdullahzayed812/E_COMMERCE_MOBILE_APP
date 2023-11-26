import { NavigatorScreenParams } from "@react-navigation/native";

export type HomeStackParamList = {
  HomeScreen: undefined;
  ProductListScreen: { [index: string]: number | undefined };
  ProductDetailsScreen: { id: number | undefined };
  FlashSaleScreen: undefined;
  FeaturedProductsScreen: undefined;
  TrendingProductsScreen: undefined;
  FeaturedCategoriesProductsScreen: undefined;
  FeaturedBrandsProductsScreen: undefined;
  TopSellingProductsScreen: undefined;
  FeaturedCategoriesScreen: undefined;
  FeaturedBrandsScreen: undefined;
  CartScreen: undefined;
  PaymentServicesScreen: {
    checkedItemsCount: number;
    subtotalPrice: number;
    taxPrice: number;
  };
  PaymentScreen: { totalAmount: number };
  OrderDetailsScreen: { orderID: number } | undefined;
  OrdersScreen: undefined;
  ProfileScreen: undefined;
  WishListScreen: undefined;
  ComparedListScreen: undefined;
  VouchersScreen: undefined;
  ContactScreen: undefined;
  HelpScreen: undefined;
};

export type TabStackParamList = {
  HomeStackScreen: NavigatorScreenParams<HomeStackParamList>;
  ProfileScreen: undefined;
  NotificationScreen: undefined;
  SearchScreen: undefined;
};

export type DrawerStackParamList = {
  TabStackScreen: NavigatorScreenParams<TabStackParamList>;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  VerificationCode: { email: string };
};

export type RootStackParamList = {
  SplashScreen: undefined;
  AuthStackScreen: NavigatorScreenParams<AuthStackParamList>;
  DrawerStackScreen: NavigatorScreenParams<DrawerStackParamList>;
};
