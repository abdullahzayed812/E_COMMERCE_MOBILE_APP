import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { IMAGES } from "../configs/images";
import { calcHeight, calcWidth } from "../configs/Sizes";
import { SPACING } from "../constants/spacing";

interface Props {
  translateX?: number;
  imageSource?: ImageSourcePropType;
}

export const Logo: React.FC<Props> = ({ translateX, imageSource }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>hong</Text>
      <View style={styles.oContainer}>
        <Text style={[styles.logoText, { lineHeight: 40 }]}>o</Text>
      </View>
    </View>
    // <Image
    //   source={!imageSource ? IMAGES.logo : imageSource}
    //   style={{
    //     width: calcWidth(100),
    //     height: calcHeight(100),
    //     resizeMode: "contain",
    //     transform: [
    //       { translateX: translateX ? calcWidth(translateX) : 0 },
    //       { scale: 1.3 },
    //     ],
    //   }}
    // />
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  logoText: {
    fontSize: 35,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  oContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    // padding: SPACING / 2,

    // paddingHorizontal: SPACING / 2,
    backgroundColor: "#e4bd23",
  },
});
