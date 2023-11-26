import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { postData } from "../configs/apis";
import { COLORS } from "../configs/colors/colors";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { CART_ACTION_ENDPOINT_URL } from "../constants/urls";
import { RootStackParamList } from "../navigation/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getCartCount } from "../redux/user";
import { Button } from "./Button";

interface Props {
  product_id: number;
  inventory_id: number;
  quantity: number | undefined;
  chooseButtonTitle: string;
}

export const ProductAddToCartOrBuyNow: React.FC<Props> = ({
  product_id,
  inventory_id,
  quantity,
  chooseButtonTitle,
}) => {
  const dispatch = useAppDispatch();

  const toast = useToast();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { user } = useAppSelector((state) => state.user);

  const handleAddToCart = async () => {
    if (!user?.email) {
      return navigation.navigate("AuthStackScreen", { screen: "LoginScreen" });
    } else if (chooseButtonTitle === "Choose") {
      return toast.show("Choose size first", { type: "warning" });
    } else {
      try {
        await postData(CART_ACTION_ENDPOINT_URL, {
          inventory_id,
          product_id,
          quantity,
          user_id: user.id,
        });
        await getCartCount(dispatch);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBuyNow = () => {
    if (!user?.email) {
      navigation.navigate("AuthStackScreen", { screen: "LoginScreen" });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Add to cart" onPress={handleAddToCart} />
      <Button
        title="Buy now"
        onPress={handleBuyNow}
        containerStyle={{ backgroundColor: COLORS.gray }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.spaceBetween,
  },
});
