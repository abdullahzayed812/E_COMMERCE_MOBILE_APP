import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_14 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING, SPACING_HORIZONTAL } from "../constants/spacing";

interface Props {
  title: string;
  activeRadio: string;
  handleRadioPress(radioName: string): void;
}

export const FromWhereItem: React.FC<Props> = ({
  title,
  activeRadio,
  handleRadioPress,
}) => {
  const backgroundColor =
    activeRadio === title ? COLORS.mainColor : "transparent";
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={() => handleRadioPress(title)}
    >
      <View style={styles.radio}>
        <View style={[styles.dot, { backgroundColor }]} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.alignCenter,
    margin: SPACING,
  },
  title: {
    ...TEXT_14,
    fontWeight: "bold",
  },
  radio: {
    ...GLOBAL_STYLES.center,
    width: 15,
    height: 15,
    marginRight: SPACING_HORIZONTAL / 2,
    padding: SPACING / 2,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: COLORS.mainColor,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
  },
});
