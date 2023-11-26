import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { HomeStackParamList } from "../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { HEADER, TEXT_14 } from "../configs/fonts";
import { SPACING_HORIZONTAL, SPACING_VERTICAL } from "../constants/spacing";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  routeName: any;
}

export const ListHeader: React.FC<Props> = ({ title, routeName }) => {
  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleShowAll = () => navigation.navigate(routeName);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleShowAll}>
        <Text style={styles.showAllText}>{t("show_all")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.spaceBetween,
    marginVertical: SPACING_VERTICAL / 2,
    paddingHorizontal: SPACING_HORIZONTAL,
  },
  title: {
    ...HEADER,
    marginBottom: SPACING_VERTICAL / 2,
  },
  showAllText: {
    ...TEXT_14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
