import React from "react";
import { Container } from "../components/Container";
import { FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FlashSaleItem } from "../redux/flashSale/flashSaleSlice";
import { Loading } from "../components/Loading";
import { ListSeparator } from "../components/ListSeparator";
import { getFeaturedCategoriesScreenData } from "../redux/featuredCategories/featuredCategoriesSlice";
import { FeaturedCategory } from "../components/FeaturedCategory";
import { EmptyList } from "../components/EmptyList";
import { useTheme } from "../utils";

const renderItem = ({ item }: { item: FlashSaleItem }) => {
  return (
    <FeaturedCategory id={item.id} image={item.image} title={item.title} />
  );
};

export const FeaturedCategoriesScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { backgroundColor } = useTheme();

  const { featuredCategoriesList, loading } = useAppSelector(
    (state) => state.featuredCategories,
  );

  React.useEffect(() => {
    (async () => {
      await getFeaturedCategoriesScreenData(dispatch, { page: 1 });
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container containerStyleProp={{ backgroundColor }}>
      {featuredCategoriesList?.length === 0 ? (
        <EmptyList />
      ) : (
        <FlatList
          data={featuredCategoriesList}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListSeparator marginVertical={5} />}
        />
      )}
    </Container>
  );
};
