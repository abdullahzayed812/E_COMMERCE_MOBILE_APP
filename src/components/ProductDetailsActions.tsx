import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { SPACING, SPACING_VERTICAL } from "../constants/spacing";
import { useAppSelector } from "../redux/hooks";
import { ChooseProductQuantity } from "./ChooseProductQuantity";
import { ChooseProductSize } from "./ChooseProductSize";
import { ProductAddToCartOrBuyNow } from "./ProductAddToCartOrBuyNow";
import { ProductSalary } from "./ProductSalary";
import { ProductSizesModal } from "./ProductSizeModal";

interface Props {
  selling: number | undefined;
  offered: number | undefined;
}

export const ProductDetailsActions: React.FC<Props> = ({
  selling,
  offered,
}) => {
  const [quantity, setQuantity] = React.useState<number>(1);
  const [sizesModalVisible, setSizesModalVisible] =
    React.useState<boolean>(false);
  const [chooseButtonTitle, setChooseButtonTitle] =
    React.useState<string>("Choose");

  const { productDetails } = useAppSelector((state) => state.productDetails);

  const handleChangeQuantity = (buttonName: string) => {
    if (buttonName === "minus") {
      return quantity <= 1 ? null : setQuantity((q) => (q -= 1));
    } else {
      return setQuantity((q) => (q += 1));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ProductSalary selling={selling} offered={offered} />
      <ChooseProductSize
        setSizesModalVisible={setSizesModalVisible}
        chooseButtonTitle={chooseButtonTitle}
      />
      <ChooseProductQuantity
        quantity={quantity}
        handleChangeQuantity={handleChangeQuantity}
      />
      <ProductAddToCartOrBuyNow
        product_id={productDetails?.inventory[0]?.product_id}
        inventory_id={
          productDetails?.inventory[0]?.inventory_attributes[0].inventory_id
        }
        quantity={quantity}
        chooseButtonTitle={chooseButtonTitle}
      />
      <ProductSizesModal
        visible={sizesModalVisible}
        setVisible={setSizesModalVisible}
        sizes={productDetails?.attribute[0]?.values}
        setChooseButtonTitle={setChooseButtonTitle}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING,
    backgroundColor: COLORS.white,
  },
});
