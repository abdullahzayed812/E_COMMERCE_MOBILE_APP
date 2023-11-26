import React from "react";
import { FlatList } from "react-native";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { VoucherItem } from "../components/VoucherItem";
import { getData } from "../configs/apis";
import { VOUCHERS_LIST_ENDPOINT_URL } from "../constants/urls";
import { useTheme } from "../utils";

interface Voucher {
  id: number;
  title: string;
  price: number;
  min_spend: number;
  code: string;
  start_time: string;
  end_time: string;
  status: number;
  type: number;
}

const renderItem = ({ item }: { item: Voucher }) => {
  return (
    <VoucherItem
      id={item.id}
      title={item.title}
      minSpend={item.min_spend}
      code={item.code}
      endTime={item.end_time}
      status={item.status}
      price={item.price}
    />
  );
};

export const VouchersScreen: React.FC = () => {
  const { backgroundColor } = useTheme();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [vouchersList, setVouchersList] = React.useState<Voucher[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getData(VOUCHERS_LIST_ENDPOINT_URL);
        setVouchersList(response?.data?.data?.data);
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
      <Header screenName="Vouchers Screen" />
      <Container containerStyleProp={{ backgroundColor }}>
        <FlatList
          data={vouchersList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    </>
  );
};
