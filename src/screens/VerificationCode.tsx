import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { postData } from "../configs/apis";
import { COLORS } from "../configs/colors/colors";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import {
  BORDER_RADIUS,
  SPACING,
  SPACING_HORIZONTAL,
  SPACING_VERTICAL,
} from "../constants/spacing";
import { VERIFY_CODE_ENDPOINT_URL } from "../constants/urls";
import { AuthStackParamList } from "../navigation/types";
import { useTheme } from "../utils";

interface Props {
  navigation: NativeStackNavigationProp<AuthStackParamList, "VerificationCode">;
  route: RouteProp<AuthStackParamList, "VerificationCode">;
}

export const VerificationCode: React.FC<Props> = ({ navigation, route }) => {
  const toast = useToast();
  const { backgroundColor, color } = useTheme();

  const collectedValue = React.useRef("");
  const inputsRef = React.useRef<TextInput[]>([]);

  const { email } = route.params;

  const handleChange = (inputValue: string, index: number) => {
    if (inputValue.length !== 0) {
      inputsRef?.current[index + 1]?.focus();
      collectedValue.current += inputValue;
      return;
    }
    inputsRef?.current[index - 1]?.focus();
    collectedValue.current = collectedValue.current.slice(
      0,
      collectedValue.current.length - 1,
    );
    return;
  };

  const handleBackspacePress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    const { nativeEvent } = event;

    if (nativeEvent.key === "Backspace") {
      handleChange("", index);
    }
  };

  const handleSubmit = async () => {
    if (collectedValue.current.length < 4) {
      return toast.show("You must fill all inputs", { type: "danger" });
    }

    const verifyCodeResponse = await postData(VERIFY_CODE_ENDPOINT_URL, {
      email,
      collectedValue,
    });

    const { message } = verifyCodeResponse?.data;

    if (message.includes("Invalid Code.")) {
      return toast.show(message, { type: "warning" });
    }

    return navigation.navigate("LoginScreen");
  };

  return (
    <>
      <Header screenName="Verification Code" />
      <Container
        containerStyleProp={{
          justifyContent: "center",
          flex: 1,
          backgroundColor,
        }}
      >
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            {[...Array(4).keys()].map((item) => (
              <TextInput
                ref={(ref) =>
                  ref && !inputsRef.current.includes(ref)
                    ? (inputsRef.current = [...inputsRef.current, ref])
                    : null
                }
                key={item.toString()}
                style={[styles.input, { color }]}
                maxLength={1}
                contextMenuHidden
                selectTextOnFocus
                keyboardType="decimal-pad"
                onChangeText={(text) => handleChange(text, item)}
                onKeyPress={(event) => handleBackspacePress(event, item)}
              />
            ))}
          </View>
          <Button
            title="Verify"
            onPress={handleSubmit}
            containerStyle={styles.button}
          />
        </View>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SPACING,
    borderRadius: BORDER_RADIUS,
  },
  inputContainer: {
    ...GLOBAL_STYLES.alignCenter,
    justifyContent: "space-around",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: BORDER_RADIUS,
    textAlign: "center",
    paddingHorizontal: SPACING_HORIZONTAL / 2,
  },
  button: {
    alignSelf: "center",
    marginTop: SPACING_VERTICAL * 2,
  },
});
