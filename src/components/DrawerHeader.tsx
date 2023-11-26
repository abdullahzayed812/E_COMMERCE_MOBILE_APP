import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IMAGES } from "../configs/images";
import { calcWidth } from "../configs/Sizes";
import { HomeStackParamList } from "../navigation/types";
import { Spacer } from "./Spacer";
import { Logo } from "./Logo";

export const DrawerHeader: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handlePress = () => navigation.navigate("HomeScreen");

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Logo imageSource={IMAGES.logo2} />
      <Spacer />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: calcWidth(170),
    alignSelf: "center",
    resizeMode: "contain",
  },
});
