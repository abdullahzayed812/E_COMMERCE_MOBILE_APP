import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_14, TEXT_16 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING } from "../constants/spacing";
import { IMAGE_PREFIX_URL } from "../constants/urls";
import { HomeStackParamList } from "../navigation/types";

interface Props {
  id: number | undefined;
  imageSource: string;
  title: string;
  price?: number;
  mainPrice?: number;
}

export const TopSellingProduct: React.FC<Props> = ({
  id,
  imageSource,
  title,
  price,
  mainPrice,
}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<HomeStackParamList, "HomeScreen">
    >();

  const handleProductPress = () =>
    navigation.navigate("ProductDetailsScreen", { id });

  return (
    <TouchableOpacity style={styles.container} onPress={handleProductPress}>
      <Image
        source={{ uri: `${IMAGE_PREFIX_URL}${imageSource}` }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title?.substring(0, 70)}...</Text>
        <View style={styles.prices}>
          <Text
            style={[
              styles.price,
              { marginRight: SPACING / 2, textDecorationLine: "line-through" },
            ]}
          >
            {price}
          </Text>
          <Text style={[styles.price, { marginRight: SPACING }]}>
            {mainPrice}
          </Text>
          <View style={styles.discountContainer}>
            <Text style={styles.discount}>22%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.alignCenter,
    marginBottom: SPACING,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: SPACING / 2,
    borderRadius: 30,
    resizeMode: "cover",
  },
  textContainer: {},
  title: {
    ...TEXT_16,
    width: width * 0.65,
    marginBottom: SPACING / 2,
    fontWeight: "bold",
  },
  prices: {
    ...GLOBAL_STYLES.alignCenter,
  },
  price: {
    ...TEXT_14,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  discountContainer: {
    paddingHorizontal: SPACING / 2,
    borderRadius: 5,
    backgroundColor: COLORS.mainColor,
  },
  discount: {
    ...TEXT_14,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
