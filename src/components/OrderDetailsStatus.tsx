import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import {
  SPACING,
  SPACING_HORIZONTAL,
  SPACING_VERTICAL,
} from "../constants/spacing";
import { OrderStatusItem } from "./OrderStatusItem";

interface Props {
  status?: number;
}

export const OrderDetailsStatus: React.FC<Props> = ({ status }) => {
  return (
    <ScrollView
      style={styles.container}
      horizontal
      contentContainerStyle={{ paddingRight: SPACING_HORIZONTAL }}
    >
      <OrderStatusItem
        status={status}
        statusNumber={1}
        statusTitle="Pending"
        line="right"
      />
      <OrderStatusItem
        status={status}
        statusNumber={2}
        statusTitle="Confirmed"
        line="right"
      />
      <OrderStatusItem
        status={status}
        statusNumber={3}
        statusTitle="Picked up"
        line="right"
      />
      <OrderStatusItem
        status={status}
        statusNumber={4}
        statusTitle="On the way"
        line="right"
      />
      <OrderStatusItem
        status={status}
        statusNumber={5}
        statusTitle="Delivered"
        line="right"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.shadowContainer,
    marginVertical: SPACING_VERTICAL / 4,
    padding: SPACING,
  },
});
