import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_14, TEXT_16 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING, SPACING_HORIZONTAL } from "../constants/spacing";

interface Props {
  text: string;
  value: string;
}

export const DescriptionItem: React.FC<Props> = ({ text, value }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: COLORS.gray }]}>{text}</Text>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.spaceBetween,
    marginBottom: SPACING_HORIZONTAL / 2,
  },
  text: {
    ...TEXT_16,
  },
});
