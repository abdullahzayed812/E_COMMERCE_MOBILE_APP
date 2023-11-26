import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { BORDER_RADIUS, SPACING } from "../constants/spacing";
import { IMAGE_PREFIX_URL } from "../constants/urls";
import { useAppSelector } from "../redux/hooks";

interface Props {
  number: number;
}

export const Banner: React.FC<Props> = ({ number }) => {
  const { banners } = useAppSelector((state) => state.home.data);
  const banner = banners[number];

  return (
    <Image
      key={banner?.id}
      source={{ uri: `${IMAGE_PREFIX_URL}${banner?.image}` }}
      style={styles.image}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 100,
    marginVertical: SPACING / 2,
    borderRadius: BORDER_RADIUS,
    resizeMode: "contain",
  },
});
