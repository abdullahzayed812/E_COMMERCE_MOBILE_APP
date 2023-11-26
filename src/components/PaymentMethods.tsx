import React from "react";
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_18 } from "../configs/fonts";
import { IMAGES } from "../configs/images";
import { BORDER_RADIUS, SPACING_VERTICAL } from "../constants/spacing";
import { Button } from "./Button";
import { Container } from "./Container";
import { PaymentMethodItem } from "./PaymentMethodItem";
import { Spacer } from "./Spacer";
import CryptoJS, { enc } from "crypto-js";
import { postData } from "../configs/apis";
import { CONFIRM_ORDER_ENDPOINT_URL } from "../constants/urls";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../navigation/types";
import { Loading } from "./Loading";
import { useToast } from "react-native-toast-notifications";

interface Props {
  totalAmount: number;
}

interface PaymentMethods {
  title: string;
  image: ImageSourcePropType;
  paymentMethod: number;
}

const PAYMENT_METHODS: PaymentMethods[] = [
  { title: "Stripe", image: IMAGES.stripe, paymentMethod: 3 },
  { title: "Flutterwave", image: IMAGES.flutterWave, paymentMethod: 5 },
  { title: "Razorpay", image: IMAGES.razorpay, paymentMethod: 1 },
  { title: "Paypal", image: IMAGES.paypal, paymentMethod: 4 },
  { title: "Iyzico", image: IMAGES.iyzico, paymentMethod: 10 },
];

export const PaymentMethods: React.FC<Props> = ({ totalAmount }) => {
  const toast = useToast();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<HomeStackParamList, "PaymentServicesScreen">
    >();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState<number>(2);

  const [loading, setLoading] = React.useState<boolean>(false);

  const confirmOrder = async () => {
    const data: { [index: string]: string | number } = {
      order_method: selectedPaymentMethod,
      voucher: "",
      time_zone: "",
      user_token: "",
    };

    let key = CryptoJS.enc.Hex.parse("0123456470abcdef0123456789abcdef");
    let iv = CryptoJS.enc.Hex.parse("abcdef1876343516abcdef9876543210");

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv,
      padding: CryptoJS.pad.ZeroPadding,
    }).toString();

    try {
      setLoading(true);

      if (selectedPaymentMethod === 4) {
        // navigate to payment third_party webview
        navigation.navigate("PaymentScreen", { totalAmount });
      } else if (selectedPaymentMethod === 2) {
        const response = await postData(CONFIRM_ORDER_ENDPOINT_URL, {
          data: encrypted,
        });

        const { id: orderID } = response?.data?.data;

        if (orderID) {
          return navigation.navigate("OrderDetailsScreen", { orderID });
        }
      } else {
        toast.show("Selected service not integrated yet.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <Container containerStyleProp={styles.container}>
      <Text style={TEXT_18}>Select payment method</Text>
      <Spacer />
      <View style={styles.paymentMethodsContainer}>
        {PAYMENT_METHODS.map((item) => (
          <PaymentMethodItem
            key={item.title}
            title={item.title}
            image={item.image}
            paymentMethod={item.paymentMethod}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
        ))}
        <PaymentMethodItem
          title="Cash on delivery"
          image={IMAGES.cash}
          paymentMethod={2}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
        <Button title="Confirm order" onPress={confirmOrder} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    marginBottom: SPACING_VERTICAL,
    elevation: 10,
    backgroundColor: COLORS.white,
  },
  paymentMethodsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 20,
  },
});
