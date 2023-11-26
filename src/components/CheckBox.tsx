import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { IMAGES } from "../configs/images";
import { calcWidth } from "../configs/Sizes";

interface Props {
  isSelected: boolean;
  handleSelectItem(): void;
}

export const CheckBox: React.FC<Props> = ({ isSelected, handleSelectItem }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={handleSelectItem}
    >
      {isSelected ? <Image source={IMAGES.check} style={styles.image} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.center,
    width: calcWidth(30),
    height: calcWidth(30),
    marginTop: calcWidth(25),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#333",
  },
  image: {
    width: calcWidth(25),
    height: calcWidth(25),
  },
});
