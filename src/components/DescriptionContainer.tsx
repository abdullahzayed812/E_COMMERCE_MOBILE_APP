import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { BORDER_RADIUS, SPACING, SPACING_VERTICAL } from "../constants/spacing";
import { DescriptionItem } from "./DescriptionItem";

interface Props {
  bundleDeal: string;
  brand: string;
  refundable: number | undefined;
}

export const DescriptionContainer: React.FC<Props> = ({
  bundleDeal,
  brand,
  refundable,
}) => {
  return (
    <View style={styles.container}>
      <DescriptionItem text="Bundle deal" value={bundleDeal} />
      <DescriptionItem text="Brand" value={brand} />
      <DescriptionItem
        text="Refund"
        value={refundable === 1 ? "Refundable" : "Not Refundable"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING_VERTICAL,
    padding: SPACING,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
  },
});
