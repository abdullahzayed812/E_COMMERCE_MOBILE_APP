import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { postData } from "../configs/apis";
import { COLORS } from "../configs/colors/colors";
import { TEXT_16 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { calcWidth } from "../configs/Sizes";
import {
  SPACING,
  SPACING_HORIZONTAL,
  SPACING_VERTICAL,
} from "../constants/spacing";
import {
  CART_ACTION_ENDPOINT_URL,
  IMAGE_PREFIX_URL,
  CHANGE_SELECTED_CART_PRODUCT_ENDPOINT_URL,
} from "../constants/urls";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCartCount } from "../redux/user";
import { Button } from "./Button";
import { ChangeQuantity } from "./ChangeQuantity";
import { CheckBox } from "./CheckBox";
import { Loading } from "./Loading";

interface Props {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  inventory_id: number;
  product_id: number;
  handleDeleteProduct(id: number): void;
  selected: number;
  taxPrice: number;
  checkedItems: MutableRefObject<number[]>;
  uncheckedItems: MutableRefObject<number[]>;
  setSubtotalPrice: Dispatch<SetStateAction<number>>;
  setItemsCount: Dispatch<SetStateAction<number>>;
  setTaxPrice: Dispatch<SetStateAction<number>>;
}

export const CartProduct: React.FC<Props> = React.memo(
  ({
    id,
    title,
    image,
    price,
    quantity,
    inventory_id,
    product_id,
    handleDeleteProduct,
    selected,
    taxPrice,
    checkedItems,
    uncheckedItems,
    setSubtotalPrice,
    setItemsCount,
    setTaxPrice,
  }) => {
    const dispatch = useAppDispatch();

    const toast = useToast();

    const [updatedQuantity, setUpdatedQuantity] =
      React.useState<number>(quantity);
    const [isSelected, setIsSelected] = React.useState<boolean>(selected === 1);
    const [loading, setLoading] = React.useState<boolean>(false);

    const { user, cartCount } = useAppSelector((state) => state.user);

    const handleChangeQuantity = async (operationType: string) => {
      if (operationType === "minus") {
        if (updatedQuantity <= 1) {
          return toast.show("At least one item", { type: "warning" });
        }
        setUpdatedQuantity((q) => (q -= 1));
        dispatch(setCartCount(+cartCount! - 1));
        try {
          await postData(CART_ACTION_ENDPOINT_URL, {
            product_id: id,
            inventory_id,
            quantity: -1,
            user_id: user?.id,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        setUpdatedQuantity((q) => (q += 1));
        dispatch(setCartCount(+cartCount! + 1));
        try {
          await postData(CART_ACTION_ENDPOINT_URL, {
            product_id,
            inventory_id,
            quantity: 1,
            user_id: user?.id,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    const handleSelectItem = async (productID: number) => {
      setIsSelected(!isSelected);
      if (isSelected) {
        uncheckedItems.current.push(productID);
        const uncheckedSet = new Set(uncheckedItems.current);

        const checkedList = checkedItems.current.filter(
          (id) => id !== productID,
        );
        const checkedSet = new Set(checkedList);

        setSubtotalPrice((prevState) => prevState - +price);
        setItemsCount((prevState) => prevState - 1);
        setTaxPrice(
          (prevState) => +(prevState - +((taxPrice / 100) * price)).toFixed(2),
        );
        try {
          setLoading(true);
          await postData(CHANGE_SELECTED_CART_PRODUCT_ENDPOINT_URL, {
            checked: [...checkedSet],
            unchecked: [...uncheckedSet],
          });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
          return;
        }
      }
      checkedItems.current.push(productID);
      const checkedSet = new Set(checkedItems.current);

      const uncheckedList = uncheckedItems.current.filter(
        (id) => id !== productID,
      );
      const uncheckedSet = new Set(uncheckedList);

      setItemsCount([...checkedSet].length);
      setSubtotalPrice((prevState) => prevState + +price);
      setTaxPrice(
        (prevState) => +(prevState + +((taxPrice / 100) * price)).toFixed(2),
      );

      try {
        await postData(CHANGE_SELECTED_CART_PRODUCT_ENDPOINT_URL, {
          checked: [...checkedSet],
          unchecked: [...uncheckedSet],
        });
      } catch (error) {
        console.log(error);
      } finally {
        return;
      }
    };

    if (loading) return <Loading />;

    return (
      <View style={styles.container}>
        <View style={{}}>
          <Image
            source={{ uri: `${IMAGE_PREFIX_URL}${image}` }}
            style={styles.image}
          />
          <CheckBox
            isSelected={isSelected}
            handleSelectItem={() => handleSelectItem(id)}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.buttons}>
            <ChangeQuantity
              quantity={updatedQuantity}
              handleChangeQuantity={handleChangeQuantity}
            />
            <Button
              title="Delete"
              onPress={() => handleDeleteProduct(id)}
              containerStyle={{ marginLeft: SPACING_HORIZONTAL }}
            />
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>Product Price</Text>
            <Text style={styles.price}>
              ${price} * {updatedQuantity} = ${price * updatedQuantity}
            </Text>
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: SPACING,
    marginVertical: SPACING_VERTICAL,
    borderWidth: 2,
    borderColor: COLORS.lightBlue,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginRight: SPACING_HORIZONTAL,
  },
  titleContainer: {
    ...TEXT_16,
    marginBottom: SPACING_VERTICAL / 2,
  },
  title: {
    ...TEXT_16,
    width: calcWidth(250),
  },
  buttons: {
    ...GLOBAL_STYLES.alignCenter,
    marginTop: SPACING * 2,
  },
  price: {
    ...TEXT_16,
    fontWeight: "bold",
    marginTop: SPACING_VERTICAL,
    textAlign: "right",
  },
  priceContainer: {
    ...GLOBAL_STYLES.spaceBetween,
  },
});
