import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TEXT_14, TEXT_16 } from "../configs/fonts";
import { SPACING } from "../constants/spacing";

interface Props {
  title: string;
  value: string;
}

export const OrderDetailsRow: React.FC<Props> = ({ title, value }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { width: "40%" }]}>{title}</Text>
      <Text style={[styles.value, { width: "60%", textAlign: "left" }]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...GLOBAL_STYLES.spaceBetween,
    flexDirection: "row",
    width: "100%",
    marginBottom: SPACING / 2,
  },
  title: {
    ...TEXT_16,
    fontWeight: "bold",
  },
  value: {
    ...TEXT_14,
    fontWeight: "bold",
  },
});
