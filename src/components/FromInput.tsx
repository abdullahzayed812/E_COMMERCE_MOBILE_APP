import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_14 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { calcWidth } from "../configs/Sizes";
import {
  BORDER_RADIUS,
  SPACING,
  SPACING_HORIZONTAL,
  SPACING_VERTICAL,
} from "../constants/spacing";
import { useTheme } from "../utils";

interface Props {
  label?: string;
  placeholder?: string;
  imageSource?: ImageSourcePropType;
  value: string;
  onChangeText: (text: string) => void;
}

export const FormInput: React.FC<Props> = ({
  label,
  placeholder,
  imageSource,
  value,
  onChangeText,
}) => {
  const { color } = useTheme();

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputContainer}>
        {imageSource ? (
          <Image source={imageSource} style={styles.inputIcon} />
        ) : null}
        <TextInput
          value={value}
          onChangeText={(text) => onChangeText(text)}
          placeholder={placeholder}
          style={[styles.input, { color }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING / 4,
  },
  label: {
    ...TEXT_14,
    fontWeight: "bold",
    marginBottom: SPACING_VERTICAL / 4,
  },
  inputContainer: {
    ...GLOBAL_STYLES.alignCenter,
    paddingHorizontal: SPACING_HORIZONTAL / 2,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  input: {
    flex: 1,
    color: COLORS.textDark,
  },
  inputIcon: {
    width: calcWidth(25),
    height: calcWidth(25),
    resizeMode: "contain",
    marginRight: SPACING_HORIZONTAL / 6,
  },
});
