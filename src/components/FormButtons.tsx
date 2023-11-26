import React from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING_HORIZONTAL, SPACING_VERTICAL } from "../constants/spacing";
import { Button } from "./Button";

interface Props {
  onSubmitLogin: () => void;
  onSubmitRegister: () => void;
  isLoginForm: boolean;
}

export const FormButtons: React.FC<Props> = ({
  onSubmitLogin,
  onSubmitRegister,
  isLoginForm,
}) => {
  const onSubmit = async () => {
    if (isLoginForm) onSubmitLogin();
    else onSubmitRegister();
  };

  return (
    <View
      style={[
        styles.container,
        { justifyContent: !isLoginForm ? "center" : "space-between" },
      ]}
    >
      {isLoginForm ? (
        <Button title="Forgot Password" onPress={() => {}} outline underline />
      ) : null}
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.spaceBetween,
    paddingLeft: SPACING_HORIZONTAL / 2,
    marginTop: SPACING_VERTICAL,
  },
});
