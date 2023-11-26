import React from "react";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { IMAGES } from "../configs/images";
import { Container } from "./Container";
import { GLOBAL_STYLES } from "../configs/globalStyle";

export const EmptyList: React.FC = () => {
  const { width } = useWindowDimensions();
  return (
    <Container containerStyleProp={styles.container}>
      <Image
        source={IMAGES.emptyList}
        style={{ resizeMode: "contain", width }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.center,
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
});
