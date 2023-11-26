import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TEXT_12, TEXT_16 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING } from "../constants/spacing";

interface Props {
  orderNumber: string;
  placedOn: string;
  orderID: number;
}

export const OrderHeader: React.FC<Props> = ({ orderNumber, placedOn }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          Order: <Text> {orderNumber}</Text>
        </Text>
        <Text style={styles.title}>
          Placed on: <Text> {placedOn}</Text>
        </Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.manageOrderText}>MANAGE ORDER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.spaceBetween,
    padding: SPACING / 2,
  },
  title: {
    ...TEXT_16,
    fontWeight: "bold",
  },
  manageOrderText: {
    ...TEXT_12,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
