import React, { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { calcWidth } from "../configs/Sizes";
import { BORDER_RADIUS, SPACING } from "../constants/spacing";

interface Props extends PropsWithChildren {
  containerStyle?: ViewStyle;
}

export const FormContainer: React.FC<Props> = ({
  children,
  containerStyle,
}) => {
  return <View style={[styles.container, containerStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: calcWidth(350),
    padding: SPACING,
    borderRadius: BORDER_RADIUS,
    elevation: 10,
    backgroundColor: COLORS.white,
  },
});
