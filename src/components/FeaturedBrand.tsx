import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

export const FeaturedBrand: React.FC<Props> = ({ id, image, title }) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<HomeStackParamList, "HomeScreen">
    >();

  const handleBrandPress = () =>
    navigation.navigate("ProductListScreen", { brand: id });

  return (
    <TouchableOpacity style={styles.brand} onPress={handleBrandPress}>
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
  brand: {
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING,
    marginHorizontal: 3,
    marginVertical: 3,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.mediumGray,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: "cover",
  },
});
