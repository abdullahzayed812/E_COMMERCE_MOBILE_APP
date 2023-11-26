import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_16, TEXT_18 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { IMAGES } from "../configs/images";
import { calcWidth } from "../configs/Sizes";
import { SPACING_HORIZONTAL, SPACING_VERTICAL } from "../constants/spacing";
import { Button } from "./Button";

interface Props {
  setIsLoginForm: Dispatch<SetStateAction<boolean>>;
  isLoginForm: boolean;
}

export const HaveAccount: React.FC<Props> = ({
  setIsLoginForm,
  isLoginForm,
}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
          {isLoginForm ? "Don't have an account" : "Already have account"}?{" "}
        </Text>
        <Button
          title={isLoginForm ? "Create an account" : "Sign In"}
          titleStyle={{ color: COLORS.mainColor }}
          onPress={() => setIsLoginForm(!isLoginForm)}
          underline
          outline
        />
      </View>
      <Text style={styles.or}>OR</Text>
      <Button
        title="Login with google"
        imageSource={IMAGES.google}
        titleStyle={{ color: COLORS.gray }}
        onPress={() => {}}
        containerStyle={{
          ...styles.oAuthButton,
          marginBottom: SPACING_VERTICAL * 1.3,
          backgroundColor: COLORS.lightBlue,
        }}
      />
      <Button
        title="Login with facebook"
        imageSource={IMAGES.facebook}
        containerStyle={styles.oAuthButton}
        onPress={() => {}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.alignCenter,
    justifyContent: "center",
    marginVertical: SPACING_VERTICAL * 2,
  },
  text: {
    ...TEXT_16,
    marginRight: SPACING_HORIZONTAL / 2,
  },
  or: {
    ...TEXT_18,
    textAlign: "center",
    marginBottom: SPACING_VERTICAL,
    color: COLORS.black,
  },
  oAuthContainer: {
    ...GLOBAL_STYLES.spaceBetween,
  },
  oAuthButton: {
    width: calcWidth(250),
    alignSelf: "center",
    backgroundColor: COLORS.blue,
  },
});
