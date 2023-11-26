import React, { Dispatch, SetStateAction } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  UIManager,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../configs/colors/colors";
import { TEXT_14, TEXT_16 } from "../configs/fonts";
import { SPACING, SPACING_VERTICAL } from "../constants/spacing";
import { DrawerItem } from "./CustomDrawerContent";

interface Props {
  item: DrawerItem;
  index: number;
}

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const CustomDrawerItem: React.FC<Props> = ({ item, index }) => {
  const [menuIndex, setMenuIndex] = React.useState<number>(-1);

  const { title, backgroundColor, subListBackgroundColor, subList } = item;

  const handleItemPress = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(100, "easeInEaseOut", "scaleY"),
    );
    setMenuIndex(menuIndex === index ? -1 : index);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, { backgroundColor }]}
      onPress={handleItemPress}
    >
      <Text style={styles.text}>{title}</Text>
      {menuIndex === index ? (
        <View>
          {subList.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={[
                styles.subList,
                { backgroundColor: subListBackgroundColor },
              ]}
            >
              <Text style={styles.subListText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING / 2,
    borderRadius: SPACING / 2,
    marginBottom: SPACING_VERTICAL / 2,
  },
  titleContainer: {
    paddingVertical: SPACING / 6,
  },
  text: {
    ...TEXT_16,
    fontWeight: "bold",
    color: COLORS.white,
  },
  subList: {
    padding: SPACING / 4,
    borderRadius: SPACING / 4,
    marginBottom: SPACING / 4,
  },
  subListText: {
    ...TEXT_14,
    color: COLORS.white,
  },
});
