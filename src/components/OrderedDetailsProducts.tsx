import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING_VERTICAL } from "../constants/spacing";
import { OrderedProduct as OrderProductType } from "../redux/orders/types";
import { OrderedProductsSectionHeader } from "./OrderedProductsSectionHeader";
import { IMAGE_PREFIX_URL } from "../constants/urls";
import { OrderDetailsProduct } from "./OrderDetailsProduct";

interface Props {
  products: OrderProductType[];
}

export const OrderedDetailsProducts: React.FC<Props> = ({ products }) => {
  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <OrderedProductsSectionHeader />
        {products?.map((product) => (
          <OrderDetailsProduct
            key={product?.product_id}
            imageSource={{
              uri: `${IMAGE_PREFIX_URL}${product?.product?.image}`,
            }}
            title={product?.product?.title}
            shipTo="Location"
            deliveryFee={product?.shipping_price}
            quantity={product.quantity}
            bundleOffer={product?.bundle_offer}
            price={product?.product?.offered}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.shadowContainer,
    marginVertical: SPACING_VERTICAL / 4,
  },
});
