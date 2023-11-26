import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartScreen } from "../../../screens/CartScreen";
import { FlashSaleScreen } from "../../../screens/FlashSaleScreen";
import { HomeScreen } from "../../../screens/HomeScreen";
import { ProductDetailsScreen } from "../../../screens/ProductDetailsScreen";
import { ProductListScreen } from "../../../screens/ProductsListScreen";
import { HomeStackParamList } from "../../types";
import { FeaturedProductsScreen } from "../../../screens/FeaturedProductsScreen";
import { TrendingProductsScreen } from "../../../screens/TrendingProductsScreen";
import { TopSellingProductsScreen } from "../../../screens/TopSellingProductsScreen";
import { FeaturedCategoriesScreen } from "../../../screens/FeaturedCategoriesScreen";
import { FeaturedBrandsScreen } from "../../../screens/FeaturedBrandsScreen";
import { OrderDetailsScreen } from "../../../screens/OrderDetailsScreen";
import { OrdersScreen } from "../../../screens/OrdersScreen";
import { ProfileScreen } from "../../../screens/ProfileScreen";
import { WishListScreen } from "../../../screens/WishListScreen";
import { ComparedListScreen } from "../../../screens/ComparedListScreen";
import { VouchersScreen } from "../../../screens/VouchersScreen";
import { HelpScreen } from "../../../screens/HelpScreen";
import { PaymentServicesScreen } from "../../../screens/PaymentServicesScreen";
import { ContactScreen } from "../../../screens/ContactScreen";
import { PaymentScreen } from "../../../screens/PaymentScreen";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackScreen: React.FC = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeScreen"
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="ProductListScreen"
        component={ProductListScreen}
      />
      <HomeStack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <HomeStack.Screen name="FlashSaleScreen" component={FlashSaleScreen} />
      <HomeStack.Screen
        name="FeaturedProductsScreen"
        component={FeaturedProductsScreen}
      />
      <HomeStack.Screen
        name="TrendingProductsScreen"
        component={TrendingProductsScreen}
      />
      <HomeStack.Screen
        name="TopSellingProductsScreen"
        component={TopSellingProductsScreen}
      />
      <HomeStack.Screen
        name="FeaturedCategoriesScreen"
        component={FeaturedCategoriesScreen}
      />
      <HomeStack.Screen
        name="FeaturedBrandsScreen"
        component={FeaturedBrandsScreen}
      />
      <HomeStack.Screen name="CartScreen" component={CartScreen} />
      <HomeStack.Screen
        name="PaymentServicesScreen"
        component={PaymentServicesScreen}
      />
      <HomeStack.Screen name="PaymentScreen" component={PaymentScreen} />
      <HomeStack.Screen
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}
      />
      <HomeStack.Screen name="OrdersScreen" component={OrdersScreen} />
      <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <HomeStack.Screen name="WishListScreen" component={WishListScreen} />
      <HomeStack.Screen
        name="ComparedListScreen"
        component={ComparedListScreen}
      />
      <HomeStack.Screen name="VouchersScreen" component={VouchersScreen} />
      <HomeStack.Screen name="ContactScreen" component={ContactScreen} />
      <HomeStack.Screen name="HelpScreen" component={HelpScreen} />
    </HomeStack.Navigator>
  );
};
