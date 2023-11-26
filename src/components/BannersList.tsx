import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, SPACING_VERTICAL } from "../constants/spacing";
import { IMAGE_PREFIX_URL } from "../constants/urls";
import { SliderItemDataPropType } from "../redux/home/types";
import { useAppSelector } from "../redux/hooks";
import { calcHeight } from "../configs/Sizes";
import PushNotification from "react-native-push-notification";

export const BannersList: React.FC = () => {
  const { banners } = useAppSelector((state) => state.home.data);
  const bannerListItems: SliderItemDataPropType[] = banners.slice(1, 4);

  const handleNotification = (bannerName: string) => {
    PushNotification.localNotification({
      channelId: "12345",
      title: bannerName,
      message: "test",
    });
    // PushNotification.getChannels((channel_ids) => console.log(channel_ids));
  };

  return (
    <View style={styles.container}>
      {bannerListItems.map((banner) => (
        <TouchableOpacity
          key={banner.id}
          onPress={() => handleNotification(banner.title)}
        >
          <Image
            key={banner.id}
            source={{ uri: `${IMAGE_PREFIX_URL}${banner.image}` }}
            style={styles.image}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING_VERTICAL,
    elevation: 10,
  },
  image: {
    height: calcHeight(200),
    marginBottom: SPACING_VERTICAL,
    borderRadius: BORDER_RADIUS,
    resizeMode: "contain",
  },
});
