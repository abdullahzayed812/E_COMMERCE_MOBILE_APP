import React, { useTransition } from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { IMAGES } from "../configs/images";
import {
  BORDER_RADIUS,
  SPACING_HORIZONTAL,
  SPACING_VERTICAL,
} from "../constants/spacing";
import { ServiceItem } from "./ServiceItem";
import { calcWidth } from "../configs/Sizes";
import { useTranslation } from "react-i18next";
import { useTheme } from "../utils";

interface ServiceItemPropType {
  imageSource: ImageSourcePropType;
  title: string;
  description: string;
}

export const ServicesList: React.FC = () => {
  const { t } = useTranslation();

  const { backgroundColor } = useTheme();

  const SERVICE_LIST_DATA: ServiceItemPropType[] = [
    {
      imageSource: IMAGES.deliveryTruck,
      title: t("rapid_shipping"),
      description: t("with_a_short_period_of_time"),
    },
    {
      imageSource: IMAGES.creditCard,
      title: t("secure_transaction"),
      description: t("check_securely"),
    },
    {
      imageSource: IMAGES.customerCare,
      title: t("24/7_support"),
      description: t("ready_to_pickup_calls"),
    },
    {
      imageSource: IMAGES.bundling,
      title: t("bundle_offer"),
      description: t("on_many_products"),
    },
  ];
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {SERVICE_LIST_DATA.map((item) => (
        <ServiceItem
          key={item.title}
          imageSource={item.imageSource}
          title={item.title}
          description={item.description}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
    paddingHorizontal: SPACING_HORIZONTAL,
    paddingVertical: SPACING_VERTICAL,
    borderRadius: BORDER_RADIUS,
    elevation: 10,
  },
});
