import React from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING_VERTICAL } from "../constants/spacing";
import { OrderDetails } from "../redux/orders/types";
import { OrderHeader } from "./OrderHeader";
import { OrderProducts } from "./OrderProducts";
import { OrderStatus } from "./OrderStatus";
import { Spacer } from "./Spacer";

interface Props {
  order: OrderDetails;
}

export const Order: React.FC<Props> = ({ order }) => {
  return (
    <View style={styles.container}>
      <OrderHeader
        orderNumber={order?.order}
        placedOn={order?.created}
        orderID={order?.id}
      />
      <Spacer />
      <OrderProducts products={order.ordered_products} />
      <Spacer />
      <OrderStatus
        shippingStatus={order?.status}
        paymentStatus={order.payment_done}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.shadowContainer,
    marginVertical: SPACING_VERTICAL,
  },
});
