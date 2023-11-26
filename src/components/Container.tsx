import React, { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface Props extends PropsWithChildren {
  containerStyleProp?: ViewStyle;
}

export const Container: React.FC<Props> = ({
  children,
  containerStyleProp,
}) => {
  return <View style={[styles.container, containerStyleProp]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
