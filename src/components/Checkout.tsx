import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { HEADER2 } from "../configs/fonts";
import { calcWidth } from "../configs/Sizes";
import { BORDER_RADIUS, SPACING, SPACING_VERTICAL } from "../constants/spacing";
import { Button } from "./Button";
import { CheckoutRow } from "./CheckoutRow";
import { Spacer } from "./Spacer";

interface Props {
  checkedItemsCount: number;
  subtotalPrice: number;
  taxPrice: number;
  checkoutButtonTitle?: string;
  handlePress?(): void;
  selectedAddress?: boolean;
}

export const Checkout: React.FC<Props> = ({
  checkedItemsCount,
  subtotalPrice,
  taxPrice,
  checkoutButtonTitle,
  handlePress,
}) => {
  const total = subtotalPrice + taxPrice;

  const isDisabled = total <= 0;
  const opacity = total > 0 ? 1 : 0.5;

  return (
    <View style={styles.container}>
      <Text style={HEADER2}>Checkout</Text>
      <Spacer />
      <CheckoutRow
        title={`Subtotal (${checkedItemsCount} items)`}
        value={subtotalPrice}
      />
      <CheckoutRow title="Tax" value={taxPrice} />
      <Spacer />
      <CheckoutRow title="Total" value={total} />
      {checkoutButtonTitle ? (
        <Button
          title={checkoutButtonTitle!}
          onPress={handlePress!}
          disabled={isDisabled}
          containerStyle={{ ...styles.button, opacity }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: calcWidth(250),
    padding: SPACING,
    alignSelf: "center",
    borderRadius: BORDER_RADIUS,
    elevation: 10,
    backgroundColor: COLORS.white,
  },
  button: {
    marginVertical: SPACING_VERTICAL / 2,
  },
});
