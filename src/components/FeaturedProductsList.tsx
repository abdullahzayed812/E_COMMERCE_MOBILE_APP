import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { Product } from "./Product";
import { ListHeader } from "./ListHeader";
import { ProductCollectionsDataPropType } from "../redux/home/types";
import {
  BORDER_RADIUS,
  SPACING_HORIZONTAL,
  SPACING_VERTICAL,
} from "../constants/spacing";
import { COLORS } from "../configs/colors/colors";
import { GLOBAL_STYLES } from "../configs/globalStyle";

const renderItem = ({ item }: { item: ProductCollectionsDataPropType }) => {
  return (
    <Product
      id={item?.id}
      imageSource={item?.image}
      mainPrice={item?.offered}
      price={item?.selling}
      title={item?.title}
      badge={item?.badge}
      rating={item?.rating}
      reviewCount={item?.review_count}
    />
  );
};

export const FeaturedProductsList: React.FC = () => {
  const { collections } = useAppSelector((state) => state.home.data);
  const featuredProductList = collections[0]?.product_collections;

  return (
    <View style={GLOBAL_STYLES.shadowContainer}>
      <ListHeader
        title={collections[0]?.title}
        routeName="FeaturedProductsScreen"
      />
      <FlatList
        data={featuredProductList}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};
