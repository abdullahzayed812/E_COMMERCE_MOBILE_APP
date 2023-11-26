import React from "react";
import { FlatList, View } from "react-native";
import { ProductCollectionsDataPropType } from "../redux/home/types";
import { useAppSelector } from "../redux/hooks";
import { Product } from "./Product";
import { ListHeader } from "./ListHeader";
import { GLOBAL_STYLES } from "../configs/globalStyle";

const renderItem = ({ item }: { item: ProductCollectionsDataPropType }) => {
  return (
    <Product
      id={item.id}
      imageSource={item?.image}
      mainPrice={item?.offered}
      price={item?.selling}
      title={item?.title}
      badge={item?.badge}
    />
  );
};

export const TrendingProductsList: React.FC = () => {
  const { collections } = useAppSelector((state) => state.home.data);
  const featuredProductList = collections[1]?.product_collections;

  return (
    <View style={GLOBAL_STYLES.shadowContainer}>
      <ListHeader
        title={collections[1]?.title}
        routeName="TrendingProductsScreen"
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
