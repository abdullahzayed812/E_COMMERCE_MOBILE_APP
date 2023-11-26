import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { OrderDetailsRow } from "./OrderDetailsRow";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING } from "../constants/spacing";

interface Props {
  order?: string;
  orderMethod?: number;
  paymentStatus?: number;
  deliveryStatus?: number;
  orderAmount?: string;
  orderDate?: string;
}

export const DELIVERY_STATUS: { [index: number]: string } = {
  1: "Pending",
  2: "Confirmed",
  3: "Picked up",
  4: "On the way",
  5: "Delivered",
};

const ORDER_METHOD: { [index: number]: string } = {
  1: "RAZORPAY",
  2: "CASH_ON_DELIVERY",
  3: "STRIPE",
  4: "PAYPAL",
  5: "FLUTTERWAVE",
};

export const PAYMENT_STATUS: { [index: number]: string } = {
  0: "Unpaid",
  1: "Payed",
};

export const OrderDetailsBox: React.FC<Props> = ({
  order,
  orderAmount,
  orderDate,
  orderMethod,
  paymentStatus,
  deliveryStatus,
}) => {
  return (
    <View style={styles.container}>
      <OrderDetailsRow title="Order" value={order!} />
      <OrderDetailsRow
        title="Delivery status"
        value={DELIVERY_STATUS[deliveryStatus!]}
      />
      <OrderDetailsRow
        title="Order method"
        value={ORDER_METHOD[orderMethod!]}
      />
      <OrderDetailsRow title="Order date" value={orderDate!} />
      <OrderDetailsRow title="Order amount" value={orderAmount!} />
      <OrderDetailsRow
        title="Payment status"
        value={PAYMENT_STATUS[paymentStatus!]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...GLOBAL_STYLES.shadowContainer, padding: SPACING },
});
