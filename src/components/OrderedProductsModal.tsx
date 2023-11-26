import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { Dispatch, SetStateAction } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { postData } from "../configs/apis";
import { COLORS } from "../configs/colors/colors";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { BORDER_RADIUS, SPACING, SPACING_VERTICAL } from "../constants/spacing";
import {
  IMAGE_PREFIX_URL,
  UPDATE_SHIPPING_ENDPOINT_URL,
} from "../constants/urls";
import { HomeStackParamList } from "../navigation/types";
import { CartProduct } from "../redux/cart/cartSlice";
import { Button } from "./Button";
import { Loading } from "./Loading";
import { ModalHeader } from "./ModalHeader";
import { OrderedProduct } from "./OrderedProduct";
import { Spacer } from "./Spacer";

interface Props {
  orderedProductsList: CartProduct[];
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  selectedAddressID: number | string;
  checkedItemsCount: number;
  subtotalPrice: number;
  taxPrice: number;
}

export const OrderedProductsModal: React.FC<Props> = ({
  orderedProductsList,
  isVisible,
  setIsVisible,
  selectedAddressID,
  checkedItemsCount,
  subtotalPrice,
  taxPrice,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleProceedToCheckout = async () => {
    // request body take shipping place as first item in
    // shipping places in shipping rule for complete this step only now
    const cart = orderedProductsList.map((item) => ({
      shipping_place: item.flash_product.shipping_rule.shipping_places[0],
      cart: item.id,
      shipping_type: 1,
    }));

    try {
      setLoading(true);

      const response = await postData(UPDATE_SHIPPING_ENDPOINT_URL, {
        cart,
        selected_address: selectedAddressID,
      });

      if (response?.data?.data[0]?.id) {
        navigation.navigate("PaymentServicesScreen", {
          checkedItemsCount,
          subtotalPrice,
          taxPrice,
        });
      } else {
        console.log("Something went wring");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <Pressable style={styles.overlay} onPress={() => setIsVisible(false)}>
        <Pressable style={styles.container}>
          <ModalHeader title="Ordered Products" />
          <Spacer />
          <View style={styles.productsContainer}>
            {orderedProductsList?.map((item) => (
              <OrderedProduct
                key={item.id}
                imageSource={{
                  uri: `${IMAGE_PREFIX_URL}${item.flash_product.image}`,
                }}
                title={item.flash_product.title}
              />
            ))}
          </View>
          <Button
            title="Proceed to checkout"
            onPress={handleProceedToCheckout}
            containerStyle={styles.button}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...GLOBAL_STYLES.center,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  container: {
    width: "90%",
    borderRadius: BORDER_RADIUS,
    paddingVertical: SPACING_VERTICAL / 2,
    backgroundColor: COLORS.white,
  },
  productsContainer: {
    padding: SPACING / 2,
  },
  button: {
    alignSelf: "center",
    marginBottom: SPACING_VERTICAL,
  },
});
