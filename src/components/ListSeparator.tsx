import React from "react";
import { View } from "react-native";

interface Props {
  marginVertical: number;
}

export const ListSeparator: React.FC<Props> = ({ marginVertical }) => {
  return <View style={{ marginVertical }} />;
};
