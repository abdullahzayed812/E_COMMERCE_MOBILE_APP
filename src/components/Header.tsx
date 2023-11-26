import React from "react";
import { StyleSheet, Text, View, Image, I18nManager } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_16 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { IMAGES } from "../configs/images";
import { HeaderButton } from "./HeaderButton";
import { calcHeight, calcWidth } from "../configs/Sizes";
import { SPACING_HORIZONTAL } from "../constants/spacing";
import { useNavigation } from "@react-navigation/native";
import { DrawerStackParamList, RootStackParamList } from "../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAppSelector } from "../redux/hooks";
import { useTheme } from "../utils";
import { Logo } from "./Logo";

interface Props {
  screenName: string;
}

export const Header: React.FC<Props> = ({ screenName }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const drawerNavigation =
    useNavigation<DrawerNavigationProp<DrawerStackParamList>>();

  const { color, backgroundColor } = useTheme();

  const { user, cartCount } = useAppSelector((state) => state.user);

  const handleOpenDrawer = () => {
    drawerNavigation.openDrawer();
  };

  const navigateToCart = () => {
    if (!user?.email) {
      return navigation.navigate("AuthStackScreen", { screen: "LoginScreen" });
    }
    return navigation.navigate("DrawerStackScreen", {
      screen: "TabStackScreen",
      params: { screen: "HomeStackScreen", params: { screen: "CartScreen" } },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Logo translateX={I18nManager.isRTL ? calcWidth(15) : calcWidth(-15)} />
      <Text style={[styles.screenName, { color }]}>{screenName}</Text>
      <View style={styles.buttonsContainer}>
        <HeaderButton
          imageSource={IMAGES.cart}
          onPress={navigateToCart}
          cartCount={cartCount}
        />
        <HeaderButton
          imageSource={IMAGES.menu}
          marginLeft={SPACING_HORIZONTAL / 2}
          onPress={handleOpenDrawer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.spaceBetween,
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(15),
  },
  screenName: {
    ...TEXT_16,
    fontWeight: "bold",
    transform: [
      { translateX: I18nManager.isRTL ? calcWidth(20) : calcWidth(-20) },
    ],
  },
  buttonsContainer: {
    ...GLOBAL_STYLES.alignCenter,
  },
});
