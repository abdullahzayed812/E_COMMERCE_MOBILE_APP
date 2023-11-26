import { RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Checkout } from "../components/Checkout";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { PaymentMethods } from "../components/PaymentMethods";
import { HomeStackParamList } from "../navigation/types";

interface Props {
  route: RouteProp<HomeStackParamList, "PaymentServicesScreen">;
}

export const PaymentServicesScreen: React.FC<Props> = ({ route }) => {
  const { checkedItemsCount, subtotalPrice, taxPrice } = route.params;

  return (
    <>
      <Header screenName="Payment Services Screen" />
      <Container containerStyleProp={styles.container}>
        <PaymentMethods totalAmount={subtotalPrice + taxPrice} />
        <Checkout
          checkedItemsCount={checkedItemsCount}
          subtotalPrice={subtotalPrice}
          taxPrice={taxPrice}
        />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
