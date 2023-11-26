import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_16 } from "../configs/fonts";
import { BORDER_RADIUS, SPACING, SPACING_VERTICAL } from "../constants/spacing";
import { HomeStackParamList, RootStackParamList } from "../navigation/types";
import { useAppSelector } from "../redux/hooks";
import { LanguageModal } from "./LanguageModal";
import { LogoutModal } from "./LogoutModal";

interface Props {
  title: string;
  routeName: any;
}

export const DrawerItem: React.FC<Props> = ({ title, routeName }) => {
  const homeNavigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const authNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [showLogoutModal, setShowLogoutModal] = React.useState<boolean>(false);
  const [showLanguageModal, setShowLanguageModal] =
    React.useState<boolean>(false);

  const { user } = useAppSelector((state) => state.user);

  const handlePress = () => {
    if (title === "Login") {
      return authNavigation.navigate("AuthStackScreen", {
        screen: "LoginScreen",
      });
    } else if (title === "Logout") {
      return setShowLogoutModal(true);
    } else if (title === "Language") {
      return setShowLanguageModal(true);
    } else {
      if (!user?.email) {
        return authNavigation.navigate("AuthStackScreen", {
          screen: "LoginScreen",
        });
      }
      return homeNavigation.navigate(routeName);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.container, { backgroundColor: COLORS.mediumGray }]}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
      <LogoutModal
        showModal={showLogoutModal}
        setShowModal={setShowLogoutModal}
      />
      <LanguageModal
        showModal={showLanguageModal}
        setShowModal={setShowLanguageModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING / 2,
    marginVertical: SPACING_VERTICAL / 4,
    borderRadius: BORDER_RADIUS / 2,
  },
  text: {
    ...TEXT_16,
    fontWeight: "bold",
    color: COLORS.darkGray,
  },
});
