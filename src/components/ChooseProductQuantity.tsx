import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { ChangeQuantity } from "./ChangeQuantity";

interface Props {
  quantity: number;
  handleChangeQuantity: (type: string) => void;
}

export const ChooseProductQuantity: React.FC<Props> = ({
  quantity,
  handleChangeQuantity,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quantity</Text>
      <ChangeQuantity
        quantity={quantity}
        handleChangeQuantity={handleChangeQuantity}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.productDetailsButtonContainer,
  },
  text: {
    ...GLOBAL_STYLES.productDetailsOptionText,
  },
});
