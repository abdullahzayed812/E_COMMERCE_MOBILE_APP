import i18next from "../configs/language";
import React, { Dispatch, SetStateAction } from "react";
import {
  I18nManager,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TEXT_18 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { saveLanguageApp } from "../configs/localStorage";
import { SPACING, SPACING_VERTICAL } from "../constants/spacing";
import { Button } from "./Button";
import { Spacer } from "./Spacer";
import RNRestart from "react-native-restart";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const LanguageModal: React.FC<Props> = ({ showModal, setShowModal }) => {
  const handleChangeLanguage = async (language: string) => {
    try {
      await saveLanguageApp(language);
      i18next
        .changeLanguage(language!)
        .then(() => I18nManager.forceRTL(language === "ar"));
      RNRestart.restart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal transparent animationType="fade" visible={showModal}>
      <Pressable onPress={() => setShowModal(false)} style={styles.overlay}>
        <Pressable style={styles.container}>
          <Text style={styles.text}>Choose Language</Text>
          <Spacer />
          <View style={styles.buttonsContainer}>
            <Button title="Arabic" onPress={() => handleChangeLanguage("ar")} />
            <Button
              title="English"
              onPress={() => handleChangeLanguage("en")}
            />
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
