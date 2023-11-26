import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React from "react";
import { useToast } from "react-native-toast-notifications";
import WebView from "react-native-webview";
import { Loading } from "../components/Loading";
import { getData, postData } from "../configs/apis";
import { loadToken } from "../configs/localStorage";
import {
  BASE_URL,
  CAPTURE_PAYMENT_END_POINT_URL,
  PAYMENT_INTEGRATION_ENDPOINT_URL,
} from "../constants/urls";
import { HomeStackParamList } from "../navigation/types";

interface Props {
  navigation: NativeStackNavigationProp<HomeStackParamList, "PaymentScreen">;
  route: RouteProp<HomeStackParamList, "PaymentScreen">;
}

export const PaymentScreen: React.FC<Props> = ({ navigation, route }) => {
  const toast = useToast();

  const [paymentWebviewURL, setPaymentWebviewURL] = React.useState<string>("");
  const [orderId, setOrderId] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const { totalAmount } = route.params;

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const accessToken = await loadToken();

        const response = await getData(
          PAYMENT_INTEGRATION_ENDPOINT_URL,
          undefined,
          { amount: Math.trunc(totalAmount) },
        );
        // const response = await axios.get(
        //   `${PAYMENT_INTEGRATION_ENDPOINT_URL}?amount=${Math.trunc(
        //     totalAmount,
        //   )}`,
        //   {
        //     baseURL: BASE_URL,
        //     headers: {
        //       "Content-Type": "application/json",
        //       "X-Requested-With": "XMLHttpRequest",
        //       Authorization: `Bearer ${accessToken}`,
        //       // Language: language === "ar" ? language : "",
        //     },
        //     timeout: 3000,
        //   },
        // );
        console.log(response);
        const { approvalLink, orderId } = response?.data?.data;

        if (approvalLink) {
          setPaymentWebviewURL(approvalLink);
          setOrderId(orderId);
        } else {
          toast.show("No URL to open.");
          navigation.goBack();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleNavigationStateChange = async (receivedData: any) => {
    console.log(receivedData?.url);

    if (receivedData?.url.includes("youtube")) {
      toast.show("Payment failed please try again.");
      navigation.goBack();
    } else if (receivedData?.url.includes("google")) {
      toast.show("Payment succeeded.");
      try {
        await postData(`${CAPTURE_PAYMENT_END_POINT_URL}${orderId}`, undefined);
      } catch (error) {
        console.log(error);
      }
      navigation.navigate("OrderDetailsScreen");
    }
  };

  if (loading) return <Loading />;

  return (
    <WebView
      source={{ uri: paymentWebviewURL }}
      style={{ flex: 1 }}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
};
