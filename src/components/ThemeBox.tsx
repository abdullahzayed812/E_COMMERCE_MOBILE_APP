import React from "react";
import { Switch, Text, View } from "react-native";
import { TEXT_14 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changeTheme } from "../redux/theme/themeSlice";
import { Spacer } from "./Spacer";
import { useTheme } from "../utils";

export const ThemeBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const { color } = useTheme();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { theme } = useAppSelector((state) => state.theme);

  const handleChange = () => {
    setIsOpen(!isOpen);
    if (theme === "DARK") {
      dispatch(changeTheme("LIGHT"));
    } else {
      dispatch(changeTheme("DARK"));
    }
  };

  return (
    <>
      <Spacer />
      <View style={GLOBAL_STYLES.spaceBetween}>
        <Text style={{ ...TEXT_14, fontWeight: "bold", color }}>
          Change Theme
        </Text>
        <Switch value={isOpen} onValueChange={handleChange} />
      </View>
    </>
  );
};
