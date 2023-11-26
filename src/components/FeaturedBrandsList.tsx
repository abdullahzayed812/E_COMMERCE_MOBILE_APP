import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { BORDER_RADIUS, SPACING } from "../constants/spacing";
import { COLORS } from "../configs/colors/colors";
import { HEADER } from "../configs/fonts";
import { FeaturedBrand } from "./FeaturedBrand";
import { ListHeader } from "./ListHeader";
import { useTranslation } from "react-i18next";
import { GLOBAL_STYLES } from "../configs/globalStyle";

export const FeaturedBrandsList: React.FC = () => {
  const { t } = useTranslation();

  const { featured_brands } = useAppSelector((state) => state.home.data);

  return (
    <View style={GLOBAL_STYLES.shadowContainer}>
      <ListHeader
        title={t("featured_brands")}
        routeName="FeaturedBrandsScreen"
      />
      <View style={styles.container}>
        {featured_brands.map((item) => (
          <FeaturedBrand
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: SPACING,
    borderRadius: BORDER_RADIUS,
    marginVertical: SPACING,
    backgroundColor: COLORS.white,
  },
  header: {
    ...HEADER,
    alignSelf: "flex-start",
    marginLeft: SPACING,
  },
});
