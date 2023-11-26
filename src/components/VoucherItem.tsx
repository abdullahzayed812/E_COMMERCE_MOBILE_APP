import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_14 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING, SPACING_VERTICAL } from "../constants/spacing";

interface Props {
  id: number;
  title: string;
  price: number;
  code: string;
  minSpend: number;
  endTime: string;
  status: number;
}

export const VoucherItem: React.FC<Props> = ({
  title,
  price,
  code,
  minSpend,
  endTime,
  status,
}) => {
  const VOUCHERS_TEXT: { [index: number]: string } = {
    1: "Valid",
    2: "Invalid",
  };

  const voucherText = VOUCHERS_TEXT[status];
  return (
    <View style={styles.container}>
      <View style={GLOBAL_STYLES.spaceBetween}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>$ {price}</Text>
      </View>
      <Text style={[styles.codeText, styles.text]}>{code}</Text>
      <View style={GLOBAL_STYLES.spaceBetween}>
        <Text style={styles.text}>
          Min spend <Text style={styles.text}>{"\t\t$ " + minSpend}</Text>
        </Text>
        <Text style={[styles.text, { color: COLORS.red }]}>
          {voucherText + "\t\t\t" + endTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.shadowContainer,
    padding: SPACING,
    marginVertical: SPACING_VERTICAL / 2,
  },
  codeText: {
    marginVertical: SPACING_VERTICAL / 2,
  },
  text: {
    ...TEXT_14,
    fontWeight: "bold",
  },
});
