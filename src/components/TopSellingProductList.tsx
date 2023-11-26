import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { HEADER } from "../configs/fonts";
import { BORDER_RADIUS, SPACING } from "../constants/spacing";
import { useAppSelector } from "../redux/hooks";
import { TopSellingProduct } from "./TopSellingProduct";
import { ListHeader } from "./ListHeader";
import { useTranslation } from "react-i18next";
import { GLOBAL_STYLES } from "../configs/globalStyle";

export const TopSellingProductList: React.FC = () => {
  const { t } = useTranslation();

  const { collections } = useAppSelector((state) => state.home.data);
  const topSellingProducts = collections[2]?.product_collections;

  return (
    <View style={GLOBAL_STYLES.shadowContainer}>
      <ListHeader
        title={t("top_selling_products")}
        routeName="TopSellingProductsScreen"
      />
      <View style={styles.container}>
        {topSellingProducts?.map((item) => (
          <TopSellingProduct
            id={item.id}
            key={item.id}
            imageSource={item?.image}
            title={item?.title}
            price={item?.selling}
            mainPrice={item?.offered}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    ...HEADER,
    marginLeft: SPACING,
    marginVertical: SPACING,
  },
  container: {
    padding: SPACING / 2,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
  },
});
