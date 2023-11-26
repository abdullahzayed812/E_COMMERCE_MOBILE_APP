import { useTheme } from "../utils";
import React from "react";
import { View } from "react-native";
import { SPACING_VERTICAL } from "../constants/spacing";

export const Spacer: React.FC = () => {
  const { color } = useTheme();

  return (
    <View
      style={{
        height: 1,
        marginVertical: SPACING_VERTICAL / 2,
        backgroundColor: color,
      }}
    />
  );
};
