import React from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { calcHeight, calcWidth } from "../configs/Sizes";
import {
  BORDER_RADIUS,
  SPACING_HORIZONTAL,
  SPACING_VERTICAL,
} from "../constants/spacing";
import { IMAGE_PREFIX_URL } from "../constants/urls";

interface Props {
  dots: string[];
  scrollX: Animated.Value;
  sliderItemWidth: number;
}

export const Pagination: React.FC<Props> = ({
  dots,
  scrollX,
  sliderItemWidth,
}) => {
  return (
    <View style={styles.pagination}>
      {dots.map((image, index) => {
        const inputRange = [
          (index - 1) * sliderItemWidth,
          index * sliderItemWidth,
          (index + 1) * sliderItemWidth,
        ];
        const outputRange = ["transparent", "#000", "transparent"];
        const borderColor = scrollX.interpolate({
          inputRange,
          outputRange,
        });

        return (
          <Animated.Image
            key={index.toString()}
            source={{ uri: `${IMAGE_PREFIX_URL}${image}` }}
            style={[styles.image, { borderColor }]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    ...GLOBAL_STYLES.alignCenter,
    position: "absolute",
    bottom: calcHeight(8),
    alignSelf: "center",
    backgroundColor: COLORS.gray,
    paddingHorizontal: SPACING_HORIZONTAL / 3,
    paddingVertical: SPACING_VERTICAL / 4,
    borderRadius: BORDER_RADIUS * 2,
  },
  image: {
    width: calcWidth(20),
    height: calcWidth(20),
    marginHorizontal: SPACING_HORIZONTAL / 4,
    borderRadius: calcWidth(10),
    borderColor: "transparent",
    borderWidth: 2,
    resizeMode: "cover",
  },
});
