import React from "react";
import { Container } from "../components/Container";
import { FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FlashSaleItem } from "../redux/flashSale/flashSaleSlice";
import { Loading } from "../components/Loading";
import { ListSeparator } from "../components/ListSeparator";
import { getFeaturedBrandsScreenData } from "../redux/featuredBrands/featuredBrandsSlice";
import { FeaturedBrand } from "../components/FeaturedBrand";
import { EmptyList } from "../components/EmptyList";
import { useTheme } from "../utils";

const renderItem = ({ item }: { item: FlashSaleItem }) => {
  return <FeaturedBrand id={item.id} title={item.title} image={item.image} />;
};

export const FeaturedBrandsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { backgroundColor } = useTheme();

  const { featuredBrandsList, loading } = useAppSelector(
    (state) => state.featuredBrands,
  );

  React.useEffect(() => {
    (async () => {
      await getFeaturedBrandsScreenData(dispatch, { page: 1 });
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container containerStyleProp={{ backgroundColor }}>
      {featuredBrandsList?.length === 0 ? (
        <EmptyList />
      ) : (
        <FlatList
          data={featuredBrandsList}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListSeparator marginVertical={5} />}
        />
      )}
    </Container>
  );
};
