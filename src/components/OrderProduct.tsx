import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TEXT_14, TEXT_16 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { calcWidth } from "../configs/Sizes";
import { SPACING, SPACING_HORIZONTAL } from "../constants/spacing";

interface Props {
  imageSource: { uri: string };
  title: string;
  quantity: number;
  price: number;
}

export const OrderProduct: React.FC<Props> = ({
  imageSource,
  title,
  quantity,
  price,
}) => {
  return (
    <View style={styles.container}>
      {imageSource?.uri ? (
        <Image source={imageSource} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Qty</Text>
        <Text style={styles.text}>{quantity}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Price</Text>
        <Text style={styles.text}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.alignCenter,
    padding: SPACING / 2,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  title: {
    ...TEXT_16,
    fontWeight: "bold",
    width: calcWidth(150),
  },
  textContainer: {
    marginHorizontal: SPACING_HORIZONTAL / 2,
  },
  text: {
    ...TEXT_14,
    fontWeight: "bold",
  },
});
