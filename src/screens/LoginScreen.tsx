import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { Container } from "../components/Container";
import { FormButtons } from "../components/FormButtons";
import { FormContainer } from "../components/FormContainer";
import { FormInput } from "../components/FromInput";
import { HaveAccount } from "../components/HaveAccount";
import { Loading } from "../components/Loading";
import { postData } from "../configs/apis";
import { COLORS } from "../configs/colors/colors";
import { TEXT_16, TEXT_18 } from "../configs/fonts";
import { IMAGES } from "../configs/images";
import { saveToken, saveUser } from "../configs/localStorage";
import {
  validEmailPattern,
  validPasswordPattern,
} from "../constants/RegularExpressions";
import { SPACING, SPACING_VERTICAL } from "../constants/spacing";
import { LOGIN_ENDPOINT_URL, REGISTER_ENDPOINT_URL } from "../constants/urls";
import { RootStackParamList } from "../navigation/types";
import { useAppDispatch } from "../redux/hooks";
import { getCartCount, getUserData } from "../redux/user";
import {
  isInputsFilled,
  isValidInputValue,
  updateError,
  useTheme,
} from "../utils";
import { Logo } from "../components/Logo";

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

interface FormInputsDataPropType {
  name: "";
  email: string;
  password: string;
  confirmPassword: string;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { backgroundColor } = useTheme();

  const [formInputs, setFormInputs] = React.useState<FormInputsDataPropType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = React.useState<string>("");
  const [isLoginForm, setIsLoginForm] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { name, email, password, confirmPassword } = formInputs;

  const handleInputChange = (text: string, inputName: string) => {
    setFormInputs({ ...formInputs, [inputName]: text });
  };

  const onSubmitLogin = async () => {
    if (!isInputsFilled({ email, password }))
      return updateError("Inputs must be filled!", setError);
    if (!isValidInputValue(email, validEmailPattern))
      return updateError("Invalid Email!", setError);
    if (!isValidInputValue(password, validPasswordPattern))
      return updateError("At least one upper, lower and digit", setError);

    try {
      setIsLoading(true);

      const loginResponse = await postData(LOGIN_ENDPOINT_URL, {
        email,
        password,
      });
      const { token, user } = loginResponse?.data?.data;

      if (!token) {
        return toast.show(loginResponse?.data?.message, { type: "warning" });
      }

      await saveToken(token);
      await saveUser(user);
      await getUserData(dispatch);
      await getCartCount(dispatch);
      navigation.reset({ routes: [{ name: "DrawerStackScreen" }] });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitRegister = async () => {
    if (!isInputsFilled({ name, email, password, confirmPassword }))
      return updateError("Inputs must be filled!", setError);
    if (!isValidInputValue(email, validEmailPattern))
      return updateError("Invalid Email!", setError);
    if (!isValidInputValue(password, validPasswordPattern))
      return updateError("Invalid Password!", setError);
    if (password !== confirmPassword)
      return updateError("Password not match", setError);

    try {
      setIsLoading(true);

      const registerResponse = await postData(REGISTER_ENDPOINT_URL, {
        name,
        email,
        password,
      });

      if (registerResponse?.data?.data === email) {
        navigation.navigate("AuthStackScreen", {
          screen: "VerificationCode",
          params: { email },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Container containerStyleProp={{ ...styles.container, backgroundColor }}>
      <Logo />
      <FormContainer>
        <Text style={styles.formHeader}>Welcome to IShop</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {!isLoginForm ? (
          <FormInput
            label="Name"
            placeholder="Your Name"
            imageSource={IMAGES.email}
            value={name}
            onChangeText={(text: string) => handleInputChange(text, "name")}
          />
        ) : null}
        <FormInput
          label="Email"
          placeholder="Your Email"
          imageSource={IMAGES.email}
          value={email}
          onChangeText={(text: string) => handleInputChange(text, "email")}
        />
        <FormInput
          label="Password"
          placeholder="Your Password"
          imageSource={IMAGES.lock}
          value={password}
          onChangeText={(text: string) => handleInputChange(text, "password")}
        />
        {!isLoginForm ? (
          <FormInput
            label="Confirm Password"
            placeholder="Your Password"
            imageSource={IMAGES.lock}
            value={confirmPassword}
            onChangeText={(text: string) =>
              handleInputChange(text, "confirmPassword")
            }
          />
        ) : null}
        <FormButtons
          onSubmitLogin={onSubmitLogin}
          isLoginForm={isLoginForm}
          onSubmitRegister={onSubmitRegister}
        />
        <HaveAccount
          setIsLoginForm={setIsLoginForm}
          isLoginForm={isLoginForm}
        />
      </FormContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: SPACING,
    backgroundColor: COLORS.mediumGray,
  },
  logo: {
    marginBottom: SPACING,
  },
  formHeader: {
    ...TEXT_18,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    ...TEXT_16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: SPACING_VERTICAL,
    color: "red",
  },
});
