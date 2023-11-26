import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { SPACING } from "../constants/spacing";
import { HEADER } from "../configs/fonts";
import { FeaturedCategory } from "./FeaturedCategory";
import { ListHeader } from "./ListHeader";
import { useTranslation } from "react-i18next";
import { GLOBAL_STYLES } from "../configs/globalStyle";

export const FeaturedCategoriesList: React.FC = () => {
  const { t } = useTranslation();

  const { featured_categories } = useAppSelector((state) => state.home.data);

  return (
    <View style={GLOBAL_STYLES.shadowContainer}>
      <ListHeader
        title={t("featured_categories")}
        routeName="FeaturedCategoriesScreen"
      />
      <View style={styles.container}>
        {featured_categories.map((item) => (
          <FeaturedCategory
            key={item.id}
            id={item.category.id}
            image={item.image}
            title={item.title}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    ...HEADER,
    alignSelf: "flex-start",
    marginTop: SPACING * 1.5,
    marginLeft: SPACING,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: SPACING,
  },
});
