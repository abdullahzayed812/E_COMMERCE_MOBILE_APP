import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_18 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import {
  BORDER_RADIUS,
  SPACING,
  SPACING_HORIZONTAL,
} from "../constants/spacing";
import { Button } from "./Button";

interface Props {
  quantity: number;
  handleChangeQuantity?: (type: string) => void;
}

export const ChangeQuantity: React.FC<Props> = ({
  quantity,
  handleChangeQuantity,
}) => {
  return (
    <View style={styles.container}>
      <Button
        containerStyle={styles.button}
        title="-"
        onPress={() => handleChangeQuantity?.("minus")}
        outline
      />
      <Text style={styles.text}>{quantity}</Text>
      <Button
        containerStyle={styles.button}
        title="+"
        onPress={() => handleChangeQuantity?.("plus")}
        outline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.alignCenter,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: BORDER_RADIUS,
  },
  button: {
    paddingHorizontal: SPACING_HORIZONTAL,
  },
  text: {
    ...TEXT_18,
    marginHorizontal: SPACING_HORIZONTAL,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: COLORS.gray,
    borderRightColor: COLORS.gray,
    padding: SPACING / 2,
  },
});
