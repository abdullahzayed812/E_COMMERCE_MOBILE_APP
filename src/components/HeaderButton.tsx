import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../configs/colors/colors";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { calcWidth } from "../configs/Sizes";

interface Props {
  imageSource?: ImageSourcePropType;
  marginLeft?: number;
  onPress?: () => void;
  cartCount?: number;
}

export const HeaderButton: React.FC<Props> = ({
  imageSource,
  marginLeft,
  onPress,
  cartCount,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { marginLeft }]}
      onPress={onPress}
    >
      {cartCount ? (
        <View style={styles.cartItemsNumber}>
          <Text style={styles.cartItemsNumberText}>{cartCount}</Text>
        </View>
      ) : null}
      <Image source={imageSource!} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.alignCenter,
  },
  cartItemsNumber: {
    ...GLOBAL_STYLES.center,
    position: "absolute",
    top: calcWidth(-12),
    right: calcWidth(-5),
    width: calcWidth(17),
    height: calcWidth(17),
    borderRadius: calcWidth(8),
    backgroundColor: "red",
  },
  cartItemsNumberText: {
    fontFamily: "Roboto-Thin",
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.white,
  },
  image: {
    width: calcWidth(22),
    height: calcWidth(22),
    resizeMode: "contain",
  },
});
