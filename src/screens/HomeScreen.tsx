import React from "react";
import { ScrollView } from "react-native";
import { Banner } from "../components/Banner";
import { BannersList } from "../components/BannersList";
import { Container } from "../components/Container";
import { FeaturedBrandsList } from "../components/FeaturedBrandsList";
import { FeaturedCategoriesList } from "../components/FeaturedCategoriesList";
import { FeaturedProductsList } from "../components/FeaturedProductsList";
import { FlashSalesList } from "../components/FlashSalesList";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { OfferStore } from "../components/OfferStore";
import { ServicesList } from "../components/ServicesList";
import { Slider } from "../components/Slider";
import { TopSellingProductList } from "../components/TopSellingProductList";
import { TrendingProductsList } from "../components/TrendingProductsList";
import { getHomeData } from "../redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { EmptyList } from "../components/EmptyList";
import { useTheme } from "../utils";

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const { backgroundColor } = useTheme();

  const {
    loading,
    data: { slider },
  } = useAppSelector((state) => state.home);

  const sliderImages = slider.main.map((item) => item.image);

  React.useEffect(() => {
    (async () => {
      try {
        await getHomeData(dispatch);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header screenName="Home" />
      {!slider?.main[0]?.id ? (
        <EmptyList />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container containerStyleProp={{ backgroundColor }}>
            <Slider sliderImages={sliderImages} />
            <OfferStore />
            <ServicesList />
            <FlashSalesList />
            <BannersList />
            <FeaturedProductsList />
            <TrendingProductsList />
            <FeaturedCategoriesList />
            <FeaturedBrandsList />
            <TopSellingProductList />
            <Banner number={5} />
          </Container>
        </ScrollView>
      )}
    </>
  );
};
