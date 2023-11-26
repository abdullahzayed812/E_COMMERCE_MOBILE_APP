import React from "react";
import { Container } from "../components/Container";
import { FlatList, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Product } from "../components/Product";
import {
  FlashSaleItem,
  getFlashSaleScreenData,
} from "../redux/flashSale/flashSaleSlice";
import { Loading } from "../components/Loading";
import { ListSeparator } from "../components/ListSeparator";
import { EmptyList } from "../components/EmptyList";
import { useTheme } from "../utils";

const renderItem = ({ item }: { item: FlashSaleItem }) => {
  return (
    <Product
      id={item.id}
      imageSource={item.image}
      price={item.offered}
      mainPrice={item.price}
    />
  );
};

export const FlashSaleScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { backgroundColor } = useTheme();

  const { flashSaleScreenList, loading } = useAppSelector(
    (state) => state.flashSale,
  );

  React.useEffect(() => {
    (async () => {
      await getFlashSaleScreenData(dispatch);
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <Container containerStyleProp={{ backgroundColor }}>
      {flashSaleScreenList?.length === 0 ? (
        <EmptyList />
      ) : (
        <FlatList
          data={flashSaleScreenList}
          renderItem={renderItem}
          numColumns={2}
          ItemSeparatorComponent={() => <ListSeparator marginVertical={5} />}
        />
      )}
    </Container>
  );
};
