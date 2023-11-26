import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_14, TEXT_16 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING_HORIZONTAL, SPACING_VERTICAL } from "../constants/spacing";
import { calcWidth } from "../configs/Sizes";
import { useTheme } from "../utils";

interface Props {
  imageSource: ImageSourcePropType;
  title: string;
  description: string;
}

export const ServiceItem: React.FC<Props> = ({
  imageSource,
  title,
  description,
}) => {
  const { color } = useTheme();

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View>
        <Text style={[TEXT_16, { marginBottom: SPACING_VERTICAL / 4, color }]}>
          {title}
        </Text>
        <Text style={[TEXT_14, { color }]}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.alignCenter,
    marginVertical: SPACING_VERTICAL / 2,
  },
  image: {
    width: calcWidth(22),
    height: calcWidth(22),
    resizeMode: "contain",
    marginEnd: SPACING_HORIZONTAL,
  },
});
