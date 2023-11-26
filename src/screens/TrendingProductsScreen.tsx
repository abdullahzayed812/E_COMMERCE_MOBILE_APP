import React from "react";
import { Container } from "../components/Container";
import { FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Product } from "../components/Product";
import { FlashSaleItem } from "../redux/flashSale/flashSaleSlice";
import { Loading } from "../components/Loading";
import { ListSeparator } from "../components/ListSeparator";
import { getTrendingProductsScreenData } from "../redux/trendingProducts/trendingProductsSlice";
import { EmptyList } from "../components/EmptyList";
import { useTheme } from "../utils";

const renderItem = ({ item }: { item: FlashSaleItem }) => {
  return (
    <Product
      id={item.id}
      imageSource={item.image}
      title={item.title}
      price={item.offered}
      mainPrice={item.price}
      rating={item.rating}
      reviewCount={item.review_count}
    />
  );
};

export const TrendingProductsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { backgroundColor } = useTheme();

  const { trendingProductsList, loading } = useAppSelector(
    (state) => state.trendingProducts,
  );

  React.useEffect(() => {
    (async () => {
      await getTrendingProductsScreenData(dispatch, { collection: 2 });
    })();
  }, []);

  if (loading) return <Loading />;

  return trendingProductsList.length === 0 ? (
    <EmptyList />
  ) : (
    <Container containerStyleProp={{ backgroundColor }}>
      <FlatList
        data={trendingProductsList}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListSeparator marginVertical={5} />}
      />
    </Container>
  );
};
