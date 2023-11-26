import { RouteProp } from "@react-navigation/native";
import React from "react";
import { Container } from "../components/Container";
import { DescriptionContainer } from "../components/DescriptionContainer";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { ProductDetailsActions } from "../components/ProductDetailsActions";
import { Slider } from "../components/Slider";
import { HomeStackParamList } from "../navigation/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProductDetails } from "../redux/productDetails/productDetailsSlice";
import { EmptyList } from "../components/EmptyList";
import { ScrollView } from "react-native-gesture-handler";
import { SPACING } from "../constants/spacing";
import { AddToWishListComparedList } from "../components/AddToWishListComparedList";
import { useTheme } from "../utils";

interface Props {
  route: RouteProp<HomeStackParamList, "ProductDetailsScreen">;
}

export const ProductDetailsScreen: React.FC<Props> = ({ route }) => {
  const dispatch = useAppDispatch();
  const { backgroundColor } = useTheme();

  const { productDetails, loading } = useAppSelector(
    (state) => state.productDetails,
  );

  const sliderImages: string[] | undefined =
    productDetails?.images !== undefined
      ? productDetails?.images?.map((item) => item.image)
      : [productDetails?.image];

  const { id } = route.params;

  React.useEffect(() => {
    (async () => {
      await getProductDetails(dispatch, id);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header screenName="Product Details" />
      {!productDetails.id ? (
        <EmptyList />
      ) : (
        <ScrollView
          contentContainerStyle={{ padding: SPACING, backgroundColor }}
        >
          <Slider sliderImages={sliderImages!} />
          <DescriptionContainer
            bundleDeal={productDetails.bundle_deal?.title}
            brand={productDetails.brand?.title}
            refundable={productDetails?.refundable}
          />
          <ProductDetailsActions
            selling={productDetails.selling}
            offered={productDetails.offered}
          />
          <AddToWishListComparedList productID={productDetails?.id} />
        </ScrollView>
      )}
    </>
  );
};
