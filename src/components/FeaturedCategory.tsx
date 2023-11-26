import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_16 } from "../configs/fonts";
import { BORDER_RADIUS, SPACING } from "../constants/spacing";
import { IMAGE_PREFIX_URL } from "../constants/urls";
import { HomeStackParamList } from "../navigation/types";

interface Props {
  id: number | undefined;
  image: string;
  title: string;
}

export const FeaturedCategory: React.FC<Props> = ({ id, image, title }) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<HomeStackParamList, "HomeScreen">
    >();

  const handleCategoryPress = () =>
    navigation.navigate("ProductListScreen", { category: id });

  return (
    <TouchableOpacity style={styles.container} onPress={handleCategoryPress}>
      {image ? (
        <Image
          source={{ uri: `${IMAGE_PREFIX_URL}${image}` }}
          style={styles.image}
        />
      ) : null}
      <Text style={TEXT_16}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING,
    marginHorizontal: 3,
    marginVertical: 3,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    borderColor: COLORS.lightBlue,
    backgroundColor: COLORS.white,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
});
