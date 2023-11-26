import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GLOBAL_STYLES } from "../configs/globalStyle";
// import { calcWidth } from "../configs/Sizes";
// import { MotiView } from "moti";
// import { COLORS } from "../configs/colors/colors";

// const LOADING_CIRCLE_SIZE = calcWidth(100);

// const STARTING_ANIMATION_STYLE = {
//   width: LOADING_CIRCLE_SIZE,
//   height: LOADING_CIRCLE_SIZE,
//   borderRadius: LOADING_CIRCLE_SIZE / 2,
//   borderWidth: 0,
//   elevation: 5,
// };

// const END_ANIMATION_STYLE = {
//   width: LOADING_CIRCLE_SIZE + 20,
//   height: LOADING_CIRCLE_SIZE + 20,
//   borderRadius: (LOADING_CIRCLE_SIZE + 20) / 2,
//   borderWidth: LOADING_CIRCLE_SIZE / 10,
//   elevation: 10,
// };

export const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    ...GLOBAL_STYLES.center,
    backgroundColor: "transparent",
  },
  // motiView: {
  //   ...STARTING_ANIMATION_STYLE,
  //   borderColor: COLORS.mainColor,
  //   backgroundColor: "transparent",
  // },
});
