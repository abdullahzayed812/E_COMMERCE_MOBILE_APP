import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_12, TEXT_14, TEXT_16 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import {
  BORDER_RADIUS,
  SPACING,
  SPACING_HORIZONTAL,
  SPACING_VERTICAL,
} from "../constants/spacing";
import { IMAGE_PREFIX_URL } from "../constants/urls";
import { calcHeight, calcWidth } from "../configs/Sizes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/types";
import { AirbnbRating } from "react-native-ratings";

interface Props {
  id?: number;
  imageSource: string;
  price?: number;
  mainPrice?: number;
  title?: string;
  badge?: string | null;
  rating?: number;
  reviewCount?: number;
}

export const Product: React.FC<Props> = ({
  id,
  imageSource,
  price,
  mainPrice,
  title,
  badge,
  rating,
  reviewCount,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const offer = ((price! - mainPrice!) * 100) / price!;

  const handleProductPress = () =>
    navigation.navigate("ProductDetailsScreen", { id });

  return (
    <TouchableOpacity style={styles.container} onPress={handleProductPress}>
      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
      <View style={{ justifyContent: "space-between" }}>
        <View>
          {imageSource ? (
            <Image
              source={{ uri: `${IMAGE_PREFIX_URL}${imageSource}` }}
              style={styles.image}
            />
          ) : null}
          {title ? (
            <View style={styles.rating}>
              <Text style={TEXT_16}>{title.slice(0, 100)}...</Text>
            </View>
          ) : null}
        </View>
        <View>
          <View style={GLOBAL_STYLES.alignCenter}>
            {rating ? (
              <AirbnbRating
                ratingContainerStyle={styles.ratingContainer}
                starContainerStyle={{ gap: -4 }}
                reviews={["Bad", "OK", "Good", "Very Good", "Amazing"]}
                defaultRating={rating}
                showRating={false}
                isDisabled
                size={13}
              />
            ) : null}
            {reviewCount ? (
              <Text style={styles.reviewCountText}>{reviewCount} Reviews</Text>
            ) : null}
          </View>
          <View style={styles.pricesContainer}>
            <View style={styles.priceAndMainPriceContainer}>
              <Text style={styles.price}>{mainPrice}</Text>
              <Text
                style={[
                  styles.price,
                  {
                    marginLeft: SPACING_HORIZONTAL / 2,
                    textDecorationLine: "line-through",
                    color: COLORS.gray,
                  },
                ]}
              >
                {price}
              </Text>
            </View>
            <View style={styles.offerPercentage}>
              <Text style={styles.offer}>{Math.round(offer)}% off</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    width: calcWidth(170),
    marginRight: SPACING_HORIZONTAL / 3,
    paddingHorizontal: SPACING_HORIZONTAL / 2,
    paddingVertical: SPACING_VERTICAL / 2,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS,
    elevation: 10,
  },
  image: {
    height: calcHeight(140),
    resizeMode: "cover",
  },
  upperSection: {
    justifyContent: "space-around",
  },
  pricesContainer: {
    ...GLOBAL_STYLES.spaceBetween,
    marginTop: SPACING_VERTICAL / 4,
  },
  priceAndMainPriceContainer: {
    ...GLOBAL_STYLES.alignCenter,
    // padding: 5,
  },
  offerPercentage: {
    paddingVertical: SPACING_VERTICAL / 4,
    paddingHorizontal: SPACING_HORIZONTAL / 4,
    borderRadius: BORDER_RADIUS / 2,
    backgroundColor: COLORS.mediumGray,
  },
  price: {
    ...TEXT_14,
    fontWeight: "bold",
  },
  offer: {
    ...TEXT_12,
    fontWeight: "bold",
    color: COLORS.mainColor,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: SPACING / 2,
    zIndex: 1,
    borderRadius: BORDER_RADIUS / 4,
    paddingVertical: 4,
    paddingHorizontal: SPACING / 2,
    backgroundColor: COLORS.mainColor,
  },
  badgeText: {
    ...TEXT_12,
    fontWeight: "bold",
    color: COLORS.white,
  },
  rating: {
    marginVertical: SPACING / 2,
    paddingHorizontal: SPACING / 2,
  },
  ratingContainer: {
    alignItems: "flex-start",
    marginVertical: SPACING_VERTICAL / 2,
  },
  reviewCountText: {
    ...TEXT_14,
    fontWeight: "bold",
    marginLeft: calcWidth(10),
  },
});
