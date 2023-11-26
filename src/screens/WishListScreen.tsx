import React from "react";
import { FlatList } from "react-native";
import { Container } from "../components/Container";
import { EmptyList } from "../components/EmptyList";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Product } from "../components/Product";
import { getData } from "../configs/apis";
import { WISH_LIST_ENDPOINT_URL } from "../constants/urls";
import { FlashSaleItem } from "../redux/flashSale/flashSaleSlice";
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

export const WishListScreen: React.FC = () => {
  const { backgroundColor } = useTheme();

  const [wishList, setWishList] = React.useState<FlashSaleItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getData(WISH_LIST_ENDPOINT_URL);
        const list = response?.data?.data?.data.map(
          (item: any) => item.product,
        );
        setWishList(list);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Header screenName="Wish List Screen" />
      <Container containerStyleProp={{ backgroundColor }}>
        {wishList?.length === 0 ? (
          <EmptyList />
        ) : (
          <FlatList data={wishList} renderItem={renderItem} numColumns={2} />
        )}
      </Container>
    </>
  );
};
