import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TEXT_14 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING } from "../constants/spacing";
import { DELIVERY_STATUS, PAYMENT_STATUS } from "./OrderDetails";

interface Props {
  shippingStatus: number;
  paymentStatus: number;
}

export const OrderStatus: React.FC<Props> = ({
  shippingStatus,
  paymentStatus,
}) => {
  const status = DELIVERY_STATUS[shippingStatus];
  const paymentDone = PAYMENT_STATUS[paymentStatus];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Shipping status: <Text> {status}</Text>
      </Text>
      <Text style={styles.text}>
        Payment status: <Text> {paymentDone}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.spaceBetween,
    padding: SPACING / 2,
  },
  text: {
    ...TEXT_14,
    fontWeight: "bold",
  },
});
