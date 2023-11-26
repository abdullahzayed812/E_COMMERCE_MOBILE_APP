import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_18 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING_HORIZONTAL, SPACING_VERTICAL } from "../constants/spacing";

interface Props {
  selling: number | undefined;
  offered: number | undefined;
}

export const ProductSalary: React.FC<Props> = ({ selling, offered }) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            color: COLORS.mainColor,
            marginRight: SPACING_HORIZONTAL / 2,
          },
        ]}
      >
        ${offered}
      </Text>
      <Text style={[styles.text, { textDecorationLine: "line-through" }]}>
        ${selling}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.alignCenter,
    marginBottom: SPACING_VERTICAL,
  },
  text: {
    ...TEXT_18,
    color: COLORS.gray,
  },
});
