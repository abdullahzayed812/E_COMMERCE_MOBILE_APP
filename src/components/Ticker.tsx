import { Animated, StyleSheet, Text, View } from "react-native";
import { calcFont } from "../configs/Sizes";

interface Props {
  scrollX: Animated.Value;
  sliderItemWidth: number;
  tickerList: string[];
  isDiscountBox?: boolean;
}

const TICKER_HEIGHT = 20;

export const Ticker: React.FC<Props> = ({
  scrollX,
  sliderItemWidth,
  tickerList,
  isDiscountBox,
}) => {
  const translateY = scrollX.interpolate({
    inputRange: [-sliderItemWidth, 0, sliderItemWidth],
    outputRange: [
      isDiscountBox ? TICKER_HEIGHT / 2 : TICKER_HEIGHT,
      0,
      isDiscountBox ? -TICKER_HEIGHT / 2 : -TICKER_HEIGHT,
    ],
  });
  return (
    <View style={[styles.tickerContainer, { top: isDiscountBox ? 10 : 30 }]}>
      <View
        style={{
          height: isDiscountBox ? TICKER_HEIGHT / 2 : TICKER_HEIGHT,
          overflow: "hidden",
        }}
      >
        <Animated.View style={{ transform: [{ translateY }] }}>
          {/* <Text style={styles.tickerText}>Summer Overcoat</Text>
          <Text style={styles.tickerText}>Cardigan Summer</Text>
          <Text style={styles.tickerText}>Cardigan Crogues</Text> */}
          {tickerList.map((text, index) => (
            <Text
              key={index}
              style={{
                fontSize: isDiscountBox ? TICKER_HEIGHT / 2 : TICKER_HEIGHT,
                lineHeight: isDiscountBox ? TICKER_HEIGHT / 2 : TICKER_HEIGHT,
                fontWeight: "bold",
              }}
            >
              {text}
            </Text>
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tickerContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    // backgroundColor: "red",
  },
});
