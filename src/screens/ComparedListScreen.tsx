import React from "react";
import { FlatList } from "react-native";
import { Container } from "../components/Container";
import { EmptyList } from "../components/EmptyList";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Product } from "../components/Product";
import { getData } from "../configs/apis";
import { COMPARED_LIST_ENDPOINT_URL } from "../constants/urls";
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

export const ComparedListScreen: React.FC = () => {
  const { backgroundColor } = useTheme();

  const [comparedList, setComparedList] = React.useState<FlashSaleItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getData(COMPARED_LIST_ENDPOINT_URL);
        const list = response?.data?.data?.data.map(
          (item: any) => item.product,
        );
        setComparedList(list);
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
      <Header screenName="Compare List Screen" />
      <Container containerStyleProp={{ backgroundColor }}>
        {comparedList?.length === 0 ? (
          <EmptyList />
        ) : (
          <FlatList
            data={comparedList}
            renderItem={renderItem}
            numColumns={2}
          />
        )}
      </Container>
    </>
  );
};
