import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING } from "../constants/spacing";
import { IMAGE_PREFIX_URL } from "../constants/urls";
import { useAppSelector } from "../redux/hooks";
import { calcWidth } from "../configs/Sizes";

export const OfferStore: React.FC = () => {
  const { right_top, right_bottom } = useAppSelector(
    (state) => state.home.data.slider,
  );

  return (
    <View style={styles.container}>
      <View style={styles.offer}>
        {right_top.image ? (
          <Image
            source={{ uri: `${IMAGE_PREFIX_URL}${right_top.image}` }}
            style={styles.image}
          />
        ) : null}
      </View>
      <View style={styles.offer}>
        {right_bottom.image ? (
          <Image
            source={{ uri: `${IMAGE_PREFIX_URL}${right_bottom.image}` }}
            style={styles.image}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.spaceBetween,
    width: calcWidth(343),
    marginVertical: SPACING,
    elevation: 10,
  },
  offer: GLOBAL_STYLES.offerContainer,
  image: GLOBAL_STYLES.offerImage,
});
