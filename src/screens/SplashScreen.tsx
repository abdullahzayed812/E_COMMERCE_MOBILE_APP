import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, View, useWindowDimensions } from "react-native";
import { IMAGES } from "../configs/images";
import { RootStackParamList } from "../navigation/types";
import { useAppDispatch } from "../redux/hooks";
import { getCartCount, getUserData } from "../redux/user";
import PushNotification from "react-native-push-notification";
import { calcWidth } from "../configs/Sizes";
import { GLOBAL_STYLES } from "../configs/globalStyle";

interface Props {
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    getUserData(dispatch);
    getCartCount(dispatch);
    createNotificationChannel();

    const timerId = setTimeout(
      () =>
        navigation?.reset({
          routes: [
            {
              name: "DrawerStackScreen",
              state: {
                routes: [
                  {
                    name: "HomeStackScreen",
                    state: { routes: [{ name: "HomeScreen" }] },
                  },
                ],
              },
            },
          ],
        }),
      2000,
    );
    return () => clearTimeout(timerId);
  }, []);

  const createNotificationChannel = () => {
    PushNotification.createChannel(
      { channelId: "12345", channelName: "Channel Name" },
      (isCreated) => console.log(`Channel is created: ${isCreated}`),
    );
  };

  return (
    <View style={{ ...GLOBAL_STYLES.center, flex: 1 }}>
      <Image
        source={IMAGES.logo2}
        style={{ width: calcWidth(400), height: calcWidth(400) }}
      />
    </View>
  );
};
