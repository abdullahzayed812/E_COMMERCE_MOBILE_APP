import React, { Dispatch, SetStateAction } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_16 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { calcWidth } from "../configs/Sizes";
import { BORDER_RADIUS, SPACING } from "../constants/spacing";

interface Props {
  title: string;
  image: ImageSourcePropType;
  paymentMethod: number;
  selectedPaymentMethod: number;
  setSelectedPaymentMethod: Dispatch<SetStateAction<number>>;
}

export const PaymentMethodItem: React.FC<Props> = ({
  title,
  image,
  paymentMethod,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) => {
  const backgroundColor =
    paymentMethod === selectedPaymentMethod
      ? COLORS.lightBlue
      : COLORS.mediumGray;
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      activeOpacity={0.5}
      onPress={() => setSelectedPaymentMethod(paymentMethod)}
    >
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.center,
    padding: SPACING,
    borderRadius: BORDER_RADIUS,
  },
  image: {
    width: calcWidth(50),
    height: calcWidth(50),
    resizeMode: "contain",
  },
  text: {
    ...TEXT_16,
    fontWeight: "bold",
  },
});
