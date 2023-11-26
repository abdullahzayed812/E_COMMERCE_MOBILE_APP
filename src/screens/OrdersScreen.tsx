import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Order } from "../components/Order";
import { SPACING } from "../constants/spacing";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getOrders } from "../redux/orders";
import { useTheme } from "../utils";

export const OrdersScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { backgroundColor } = useTheme();

  React.useEffect(() => {
    (async () => {
      await getOrders(dispatch);
    })();
  }, []);

  const { loading, orders } = useAppSelector((state) => state.orders);

  if (loading) return <Loading />;

  return (
    <>
      <Header screenName="Orders Screen" />
      <ScrollView contentContainerStyle={{ padding: SPACING, backgroundColor }}>
        {orders?.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </ScrollView>
    </>
  );
};
