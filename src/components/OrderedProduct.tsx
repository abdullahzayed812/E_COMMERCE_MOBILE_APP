import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TEXT_18 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { calcWidth } from "../configs/Sizes";
import { BORDER_RADIUS, SPACING } from "../constants/spacing";
import { FromWhereBox } from "./FromWhereBox";
import { Spacer } from "./Spacer";

interface Props {
  imageSource: { uri: string };
  title: string;
}

export const OrderedProduct: React.FC<Props> = ({ imageSource, title }) => {
  const [activeRadio, setActiveRadio] = React.useState<string>("From location");

  const handleRadioPress = (radioName: string) => {
    setActiveRadio(radioName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainInfoContainer}>
        {imageSource.uri ? (
          <Image source={imageSource} style={styles.image} />
        ) : null}
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <FromWhereBox
        activeRadio={activeRadio}
        handleRadioPress={handleRadioPress}
      />
      <Spacer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING,
  },
  mainInfoContainer: {
    ...GLOBAL_STYLES.alignCenter,
  },
  image: {
    width: calcWidth(70),
    height: calcWidth(70),
    borderRadius: BORDER_RADIUS,
    resizeMode: "contain",
  },
  title: {
    ...TEXT_18,
    width: calcWidth(230),
    fontWeight: "bold",
  },
});
