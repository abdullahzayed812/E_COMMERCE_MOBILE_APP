import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { Dispatch, SetStateAction } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { TEXT_18 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { removeToken, removeUser } from "../configs/localStorage";
import { SPACING, SPACING_VERTICAL } from "../constants/spacing";
import { RootStackParamList } from "../navigation/types";
import { useAppDispatch } from "../redux/hooks";
import { getUser, getUserProfile, setCartCount } from "../redux/user";
import { Button } from "./Button";
import { Spacer } from "./Spacer";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const LogoutModal: React.FC<Props> = ({ showModal, setShowModal }) => {
  const dispatch = useAppDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const logout = async () => {
    try {
      dispatch(getUser(undefined!));
      dispatch(getUserProfile(undefined!));
      dispatch(setCartCount(undefined!));
      await removeUser();
      await removeToken();
      navigation.navigate("SplashScreen");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal transparent animationType="fade" visible={showModal}>
      <Pressable onPress={() => setShowModal(false)} style={styles.overlay}>
        <Pressable style={styles.container}>
          <Text style={styles.text}>Are you sure to logout from app</Text>
          <Spacer />
          <View style={styles.buttonsContainer}>
            <Button title="Yes" onPress={logout} />
            <Button title="No" onPress={() => setShowModal(false)} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...GLOBAL_STYLES.center,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  container: {
    ...GLOBAL_STYLES.shadowContainer,
    width: "96%",
  },
  buttonsContainer: {
    ...GLOBAL_STYLES.alignCenter,
    alignSelf: "center",
    gap: 50,
    marginVertical: SPACING_VERTICAL,
  },
  text: {
    ...TEXT_18,
    fontWeight: "bold",
    textAlign: "center",
    padding: SPACING / 2,
  },
});
