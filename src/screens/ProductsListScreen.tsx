import { RouteProp } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Product } from "../components/Product";
import { COLORS } from "../configs/colors/colors";
import { SPACING_VERTICAL } from "../constants/spacing";
import { HomeStackParamList } from "../navigation/types";
import { PublicProductsDataPropType } from "../redux/home/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProductsList } from "../redux/productsList/productsListSlice";
import { EmptyList } from "../components/EmptyList";
import { useTheme } from "../utils";

interface Props {
  route: RouteProp<HomeStackParamList>;
}

const renderItem = ({ item }: { item: PublicProductsDataPropType }) => {
  return (
    <Product
      id={item.id}
      imageSource={item.image}
      price={item.selling}
      mainPrice={item.offered}
      title={item.title}
      badge={item.badge}
      rating={item.rating}
      reviewCount={item.review_count}
    />
  );
};

export const ProductListScreen: React.FC<Props> = ({ route }) => {
  const dispatch = useAppDispatch();
  const { backgroundColor } = useTheme();

  const { productsList, loading } = useAppSelector(
    (state) => state.productsList,
  );

  const data = route.params;

  React.useEffect(() => {
    (async () => await getProductsList(dispatch, data))();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header screenName="Products List" />
      {productsList.length === 0 ? (
        <EmptyList />
      ) : (
        <Container
          containerStyleProp={{ ...styles.container, backgroundColor }}
        >
          <FlatList
            data={productsList}
            renderItem={renderItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING_VERTICAL * 2,
    backgroundColor: COLORS.white,
  },
  flatListContainer: {
    paddingBottom: SPACING_VERTICAL * 2.5,
  },
});
