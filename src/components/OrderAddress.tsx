import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING_VERTICAL } from "../constants/spacing";

export const OrderAddress: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>OrderAddress</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.shadowContainer,
    marginVertical: SPACING_VERTICAL / 4,
  },
});
