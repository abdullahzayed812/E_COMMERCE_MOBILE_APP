import React from "react";
import { Text, View } from "react-native";
import { IMAGE_PREFIX_URL } from "../constants/urls";
import { OrderedProduct } from "../redux/orders/types";
import { OrderProduct } from "./OrderProduct";

interface Props {
  products: OrderedProduct[];
}

export const OrderProducts: React.FC<Props> = ({ products }) => {
  return (
    <View>
      {products?.map((product) => (
        <OrderProduct
          key={product?.product_id}
          imageSource={{ uri: `${IMAGE_PREFIX_URL}${product?.product?.image}` }}
          title={product?.product?.title}
          quantity={product?.quantity}
          price={product?.product?.offered}
        />
      ))}
    </View>
  );
};
