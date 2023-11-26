import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { calcWidth } from "../configs/Sizes";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { COLORS } from "../configs/colors/colors";
import { TEXT_14, TEXT_18 } from "../configs/fonts";
import { SPACING_HORIZONTAL, SPACING_VERTICAL } from "../constants/spacing";

interface Props {
  status?: number;
  statusNumber: number;
  statusTitle: string;
  line: string;
}

export const OrderStatusItem: React.FC<Props> = ({
  status,
  statusNumber,
  statusTitle,
  line,
}) => {
  const backgroundColor =
    statusNumber <= status! ? COLORS.lightBlue : COLORS.mediumGray;

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <View style={[styles.statusNumberContainer, { backgroundColor }]}>
          <Text style={styles.text}>{statusNumber}</Text>
        </View>
        {/* <View style={styles.line} /> */}
      </View>
      <Text style={styles.title}>{statusTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING_HORIZONTAL,
  },
  statusNumberContainer: {
    ...GLOBAL_STYLES.center,
    width: calcWidth(50),
    height: calcWidth(50),
    borderRadius: Math.round(calcWidth(50) / 2),
  },
  circle: {
    position: "relative",
  },
  text: {
    ...TEXT_18,
    fontWeight: "bold",
  },
  line: {
    position: "absolute",
    right: 0,
    top: "50%",
    width: 20,
    height: 5,
    backgroundColor: COLORS.gray,
  },
  title: {
    ...TEXT_14,
    fontWeight: "bold",
    marginTop: SPACING_VERTICAL / 2,
  },
});
