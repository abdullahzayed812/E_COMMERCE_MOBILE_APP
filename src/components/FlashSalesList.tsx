import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { HEADER2 } from "../configs/fonts";
import {
  BORDER_RADIUS,
  SPACING_HORIZONTAL,
  SPACING_VERTICAL,
} from "../constants/spacing";
import { PublicProductsDataPropType } from "../redux/home/types";
import { useAppSelector } from "../redux/hooks";
import { Product } from "./Product";
import { COLORS } from "../configs/colors/colors";
import { ListHeader } from "./ListHeader";

const renderItem = ({ item }: { item: PublicProductsDataPropType }) => {
  return (
    <Product
      id={item.id}
      imageSource={item.image}
      mainPrice={item.price}
      price={item.selling}
      title={item.title}
    />
  );
};

export const FlashSalesList: React.FC = () => {
  const { flash_sales } = useAppSelector((state) => state.home.data);

  return (
    <View style={styles.container}>
      <ListHeader title={flash_sales[0]?.title} routeName="FlashSaleScreen" />
      <View style={styles.line} />
      <FlatList
        data={flash_sales[0]?.public_products}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING_HORIZONTAL / 2,
    paddingVertical: SPACING_VERTICAL,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
    marginTop: SPACING_VERTICAL,
    elevation: 10,
  },
  title: {
    ...HEADER2,
    marginBottom: SPACING_VERTICAL / 2,
  },
  line: {
    height: 1,
    backgroundColor: COLORS.mediumGray,
  },
});
