import React, { Dispatch, SetStateAction } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../configs/colors/colors";
import { TEXT_16 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING } from "../constants/spacing";

interface Props {
  title: string;
}

export const ModalHeader: React.FC<Props> = ({ title }) => {
  return (
    // <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   ...GLOBAL_STYLES.spaceBetween,
  //   padding: SPACING,
  // },
  title: {
    ...TEXT_16,
    fontWeight: "bold",
    textAlign: "center",
  },
  // imageContainer: {
  //   ...GLOBAL_STYLES.center,
  //   width: 20,
  //   height: 20,
  //   padding: 3,
  //   borderRadius: 10,
  //   backgroundColor: COLORS.lightMain,
  // },
  // image: {
  //   width: 20,
  //   height: 20,
  //   resizeMode: "contain",
  // },
});
