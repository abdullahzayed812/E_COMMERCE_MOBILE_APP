import React from "react";
import { Container } from "../components/Container";
import { FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Product } from "../components/Product";
import { FlashSaleItem } from "../redux/flashSale/flashSaleSlice";
import { Loading } from "../components/Loading";
import { ListSeparator } from "../components/ListSeparator";
import { getFeaturedProductsScreenData } from "../redux/featuredProducts/featuredProductsSlice";
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

export const FeaturedProductsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { backgroundColor } = useTheme();

  const { featuredProductsList, loading } = useAppSelector(
    (state) => state.featuredProducts,
  );

  React.useEffect(() => {
    (async () => {
      await getFeaturedProductsScreenData(dispatch, { collection: 1 });
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container containerStyleProp={{ backgroundColor }}>
      {featuredProductsList?.length === 0 ? (
        <EmptyList />
      ) : (
        <FlatList
          data={featuredProductsList}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListSeparator marginVertical={5} />}
        />
      )}
    </Container>
  );
};
