import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TEXT_14 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING, SPACING_HORIZONTAL } from "../constants/spacing";

interface Props {
  imageSource: { uri: string };
  title: string;
  shipTo: string;
  deliveryFee: number;
  quantity: number;
  bundleOffer: number;
  price: number;
}

export const OrderDetailsProduct: React.FC<Props> = ({
  imageSource,
  title,
  shipTo,
  deliveryFee,
  quantity,
  bundleOffer,
  price,
}) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={[styles.text, { width: 200 }]}>{title}</Text>
      <Text style={styles.text}>{shipTo}</Text>
      <Text style={[styles.text, { paddingHorizontal: 30 }]}>
        {deliveryFee}
      </Text>
      <Text style={[styles.text, { paddingHorizontal: 30 }]}>{quantity}</Text>
      <Text style={[styles.text, { paddingHorizontal: 30 }]}>
        {bundleOffer}
      </Text>
      <Text style={[styles.text, { paddingHorizontal: 30 }]}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.alignCenter,
    padding: SPACING,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  text: {
    ...TEXT_14,
    fontWeight: "bold",
    marginHorizontal: SPACING_HORIZONTAL / 2,
  },
});
