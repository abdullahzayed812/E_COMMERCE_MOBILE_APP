import React from "react";
import { Header } from "../components/Header";
import { Container } from "../components/Container";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../navigation/types";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { Loading } from "../components/Loading";
import { OrderAddress } from "../components/OrderAddress";
import { OrderDetailsStatus } from "../components/OrderDetailsStatus";
import { OrderedDetailsProducts } from "../components/OrderedDetailsProducts";
import { OrderDetailsBox } from "../components/OrderDetails";
import { getOrders } from "../redux/orders";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useTheme } from "../utils";

interface Props {
  route: RouteProp<HomeStackParamList, "OrderDetailsScreen">;
}

export const OrderDetailsScreen: React.FC<Props> = ({ route }) => {
  const dispatch = useAppDispatch();
  const { backgroundColor } = useTheme();

  React.useEffect(() => {
    (async () => {
      try {
        await getOrders(dispatch);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // const { orderID } = route.params;

  const { loading, orders } = useAppSelector((state) => state.orders);

  const orderDetails = orders[0];

  if (loading) return <Loading />;

  return (
    <>
      <Header screenName="Order Details" />
      <Container containerStyleProp={{ backgroundColor }}>
        <OrderDetailsBox
          order={orderDetails?.order}
          deliveryStatus={orderDetails?.status}
          orderMethod={orderDetails?.order_method}
          orderDate={orderDetails?.updated_at}
          orderAmount={orderDetails?.total_amount}
          paymentStatus={orderDetails?.payment_done}
        />
        <OrderAddress />
        <OrderDetailsStatus status={orderDetails?.status} />
        <OrderedDetailsProducts products={orderDetails?.ordered_products!} />
        {/* <Checkout /> */}
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.shadowContainer,
    flex: 1,
  },
});
