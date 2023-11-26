import React from "react";
import { Text, View } from "react-native";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { TEXT_16 } from "../configs/fonts";

interface Props {
  title: string;
  value: number;
}

export const CheckoutRow: React.FC<Props> = ({ title, value }) => {
  return (
    <View style={GLOBAL_STYLES.spaceBetween}>
      <Text style={TEXT_16}>{title}</Text>
      <Text style={{ ...TEXT_16, fontWeight: "bold" }}>$ {value}</Text>
    </View>
  );
};
