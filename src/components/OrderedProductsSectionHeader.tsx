import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { BORDER_RADIUS, SPACING, SPACING_VERTICAL } from "../constants/spacing";
import { COLORS } from "../configs/colors/colors";
import { TEXT_14 } from "../configs/fonts";

export const OrderedProductsSectionHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Image</Text>
      <Text style={[styles.text, { width: 200 }]}>Title</Text>
      <Text style={styles.text}>Ship to</Text>
      <Text style={styles.text}>Delivery fee</Text>
      <Text style={styles.text}>Quantity</Text>
      <Text style={styles.text}>Bundle offer</Text>
      <Text style={styles.text}>Price</Text>
      <Text style={styles.text}>Total</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.alignCenter,
    padding: SPACING,
  },
  text: {
    ...TEXT_14,
    fontWeight: "bold",
    padding: SPACING,
    borderRadius: BORDER_RADIUS / 2,
    marginHorizontal: SPACING_VERTICAL / 6,
    backgroundColor: COLORS.mediumGray,
  },
});
