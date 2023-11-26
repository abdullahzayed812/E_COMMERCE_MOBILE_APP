import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_16 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import {
  BORDER_RADIUS,
  SPACING_HORIZONTAL,
  SPACING_VERTICAL,
} from "../constants/spacing";

interface Props {
  title: string;
  onPress: () => void;
  outline?: boolean;
  underline?: boolean;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  imageSource?: ImageSourcePropType;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  title,
  onPress,
  outline,
  underline,
  titleStyle,
  containerStyle,
  imageSource,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        {
          backgroundColor: outline ? "transparent" : COLORS.mainColor,
          paddingHorizontal: underline ? 0 : SPACING_HORIZONTAL * 2,
          paddingVertical: underline ? 0 : SPACING_VERTICAL / 1.5,
        },
        containerStyle,
      ]}
      onPress={onPress}
    >
      {imageSource ? <Image source={imageSource} style={styles.image} /> : null}
      <Text
        style={[
          styles.text,
          {
            color: outline ? COLORS.textDark : COLORS.white,
            textDecorationLine: underline ? "underline" : "none",
          },
          titleStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.alignCenter,
    borderRadius: BORDER_RADIUS,
  },
  text: {
    ...TEXT_16,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: SPACING_HORIZONTAL,
    resizeMode: "cover",
  },
});
