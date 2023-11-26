import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { CartProduct } from "../components/CartProduct";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { HEADER, TEXT_16 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING, SPACING_VERTICAL } from "../constants/spacing";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { EmptyList } from "../components/EmptyList";
import { deleteData, getData } from "../configs/apis";
import {
  CART_PRODUCTS_ENDPOINT_URL,
  DELETE_CART_PRODUCT_ENDPOINT_URL,
} from "../constants/urls";
import type { CartProduct as Product } from "../redux/cart/cartSlice";
import { setCartCount } from "../redux/user";
import { Checkout } from "../components/Checkout";
import { AddressForm } from "../components/AddressFrom";
import { useToast } from "react-native-toast-notifications";
import { OrderedProductsModal } from "../components/OrderedProductsModal";
import { useTheme } from "../utils";

export const CartScreen: React.FC = () => {
  const toast = useToast();
  const { backgroundColor } = useTheme();

  const dispatch = useAppDispatch();

  const checkedItemsRef = React.useRef<number[]>([]);
  const uncheckedItemsRef = React.useRef<number[]>([]);

  const { cartCount } = useAppSelector((state) => state.user);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [cartProductList, setCartProductList] = React.useState<Product[]>([]);
  const [subtotalPrice, setSubtotalPrice] = React.useState<number>(0);
  const [taxPrice, setTaxPrice] = React.useState<number>(0);
  const [itemsCount, setItemsCount] = React.useState<number>(0);
  const [isAddressFormVisible, setIsAddressFormVisible] =
    React.useState<boolean>(false);
  const [checkoutButtonTitle, setCheckoutButtonTitle] = React.useState<string>(
    "Proceed to checkout",
  );
  const [selectedAddress, setSelectedAddress] = React.useState<{
    [index: string]: string | number;
  }>({});
  const [isOrderedProductsModalVisible, setIsOrderedProductsModalVisible] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getData(CART_PRODUCTS_ENDPOINT_URL);
        const { data } = response?.data;
        setCartProductList(data);
        calcSubtotalPrice(data);
        calcItemCount(data);
        calcTaxes(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        return;
      }
    })();
  }, []);

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteData(DELETE_CART_PRODUCT_ENDPOINT_URL, id);
      const filteredList = cartProductList.filter((item) => item.id !== id);
      setCartProductList(filteredList);
      calcItemCount(filteredList);
      calcSubtotalPrice(filteredList);
      calcTaxes(filteredList);
      dispatch(setCartCount(cartCount! - 1));
    } catch (error) {
      console.log(error);
    }
  };

  const calcItemCount = (productList: Product[]) => {
    const items = productList.reduce(
      (accumulator, current) =>
        current.selected === 1 ? (accumulator += 1) : (accumulator += 0),
      0,
    );
    setItemsCount(items);
  };

  const calcSubtotalPrice = (productList: Product[]) => {
    const totalPrice = productList.reduce(
      (accumulator, current) =>
        current.selected === 1
          ? (accumulator += +current.flash_product.offered)
          : (accumulator += 0),
      0,
    );
    setSubtotalPrice(totalPrice);
  };

  const calcTaxes = (productList: Product[]) => {
    const taxPrice = productList.reduce(
      (accumulator, current) =>
        current.selected === 1
          ? +(accumulator +=
              (+current.flash_product.tax_rules.price / 100) *
              +current.flash_product.offered).toFixed(2)
          : +(accumulator += 0).toFixed(2),
      0,
    );
    setTaxPrice(taxPrice);
  };

  const renderCartProducts =
    cartProductList?.length > 0 && !isAddressFormVisible ? (
      cartProductList?.map((item) => {
        item.selected === 1
          ? checkedItemsRef.current.push(item.id)
          : uncheckedItemsRef.current.push(item.id);

        return (
          <CartProduct
            key={item.id}
            id={item.id}
            image={item.flash_product.image}
            title={item.flash_product.title}
            price={item.flash_product.offered}
            quantity={item.quantity}
            product_id={item.product_id}
            inventory_id={item.inventory_id}
            handleDeleteProduct={handleDeleteProduct}
            selected={item.selected}
            taxPrice={item.flash_product.tax_rules.price}
            checkedItems={checkedItemsRef}
            uncheckedItems={uncheckedItemsRef}
            setSubtotalPrice={setSubtotalPrice}
            setItemsCount={setItemsCount}
            setTaxPrice={setTaxPrice}
          />
        );
      })
    ) : (
      <EmptyList />
    );

  const content = isAddressFormVisible ? (
    <AddressForm
      setSelectedAddress={setSelectedAddress}
      selectedAddress={selectedAddress}
    />
  ) : (
    renderCartProducts
  );

  const renderCheckoutBox = () => {
    const handlePress = () => {
      if (checkoutButtonTitle.includes("Proceed")) {
        setIsAddressFormVisible(true);
        setCheckoutButtonTitle("Set shipping options");
        return;
      }
      if (!selectedAddress.name) {
        return toast.show("Choose address first");
      }
      setIsOrderedProductsModalVisible(true);
    };

    return (
      <Checkout
        checkedItemsCount={itemsCount}
        subtotalPrice={subtotalPrice}
        taxPrice={taxPrice}
        checkoutButtonTitle={checkoutButtonTitle}
        handlePress={handlePress}
        selectedAddress={Boolean(selectedAddress.name)}
      />
    );
  };

  const renderOrderedProductsModal = () => {
    const orderedProductsList = cartProductList?.filter(
      (item) => item?.selected === 1,
    );
    return (
      <OrderedProductsModal
        orderedProductsList={orderedProductsList}
        isVisible={isOrderedProductsModalVisible}
        setIsVisible={setIsOrderedProductsModalVisible}
        selectedAddressID={selectedAddress.id}
        checkedItemsCount={itemsCount}
        subtotalPrice={subtotalPrice}
        taxPrice={taxPrice}
      />
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header screenName="Cart" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SPACING_VERTICAL,
          backgroundColor,
        }}
      >
        {content}
        {renderCheckoutBox()}
        {renderOrderedProductsModal()}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  productPrice: { ...HEADER, textAlign: "center" },
  totalPrice: {
    ...GLOBAL_STYLES.spaceBetween,
    padding: SPACING,
  },
  text: {
    ...TEXT_16,
    fontWeight: "bold",
  },
});
