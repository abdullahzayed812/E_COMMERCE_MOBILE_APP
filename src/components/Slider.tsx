import React from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { BORDER_RADIUS, SPACING_HORIZONTAL } from "../constants/spacing";
import { IMAGE_PREFIX_URL } from "../constants/urls";
import { Pagination } from "./Pagination";
import { calcHeight, calcWidth } from "../configs/Sizes";
import { Ticker } from "./Ticker";

interface Props {
  sliderImages: string[];
}

export const Slider: React.FC<Props> = ({ sliderImages }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const SLIDER_ITEM_WIDTH = calcWidth(340);

  const renderItem = ({ item: image }: { item: string }) => {
    return (
      <View style={[styles.imageContainer, { width: SLIDER_ITEM_WIDTH }]}>
        {image ? (
          <Image
            source={{ uri: `${IMAGE_PREFIX_URL}${image}` }}
            style={styles.image}
          />
        ) : null}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={sliderImages}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ elevation: 10 }}
        onScroll={(event) => {
          Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })(event);
        }}
        horizontal
        pagingEnabled
      />
      <Pagination
        dots={sliderImages}
        scrollX={scrollX}
        sliderItemWidth={SLIDER_ITEM_WIDTH}
      />
      <Ticker
        scrollX={scrollX}
        sliderItemWidth={SLIDER_ITEM_WIDTH}
        tickerList={["Summer Overcoat", "Cardigan Summer", "Cardigan Crogues"]}
      />
      <Ticker
        scrollX={scrollX}
        sliderItemWidth={SLIDER_ITEM_WIDTH}
        tickerList={[
          "This month ofr 23%",
          "This month ofr 28%",
          "This month ofr 20%",
        ]}
        isDiscountBox
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: calcHeight(250),
    borderRadius: BORDER_RADIUS,
    marginRight: SPACING_HORIZONTAL / 2,
  },
  image: {
    height: calcHeight(250),
    borderRadius: BORDER_RADIUS,
    resizeMode: "contain",
  },
});
