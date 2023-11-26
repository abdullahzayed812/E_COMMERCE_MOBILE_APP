import React from "react";
import { Header } from "../components/Header";
import { Container } from "../components/Container";
import { StyleSheet, Text, View } from "react-native";
import { FormContainer } from "../components/FormContainer";
import { FormInput } from "../components/FromInput";
import { Button } from "../components/Button";
import { isInputsFilled, updateError, useTheme } from "../utils";
import { postData } from "../configs/apis";
import { CONTACT_US_ENDPOINT_URL } from "../constants/urls";
import { useToast } from "react-native-toast-notifications";
import { Loading } from "../components/Loading";
import { TEXT_16, TEXT_18 } from "../configs/fonts";
import { SPACING_VERTICAL } from "../constants/spacing";
import { GLOBAL_STYLES } from "../configs/globalStyle";

interface InputsValue {
  [index: string]: string;
}

export const ContactScreen: React.FC = () => {
  const toast = useToast();
  const { backgroundColor } = useTheme();

  const [formInputs, setFormInputs] = React.useState<InputsValue>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const { name, email, subject, message } = formInputs;

  const handleInputChange = (text: string, inputName: string) => {
    setFormInputs({ ...formInputs, [inputName]: text });
  };

  const handleSubmit = async () => {
    if (!isInputsFilled({ email, name, subject, message }))
      return updateError("Inputs must be filled!", setError);

    try {
      setLoading(true);

      const response = await postData(CONTACT_US_ENDPOINT_URL, {
        name,
        email,
        subject,
        message,
      });

      if (response?.data?.data === true) {
        toast.show(
          "We have received your message. We are going to contact you as soon as possible.",
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header screenName="Contact Us Screen" />
      <Container containerStyleProp={{ backgroundColor }}>
        <Text style={styles.headerText}>Love to hear from you</Text>
        <Text style={styles.descriptionText}>
          Feel free to contact us. We will get back to as soon as we can.
        </Text>
        <View>
          <FormContainer>
            {error ? (
              <Text style={{ textAlign: "center", color: "#f00" }}>
                {error}
              </Text>
            ) : null}
            <FormInput
              label="Name"
              placeholder="Your Name"
              value={name}
              onChangeText={(text) => handleInputChange(text, "name")}
            />
            <FormInput
              label="Email"
              placeholder="Your Email"
              value={email}
              onChangeText={(text) => handleInputChange(text, "email")}
            />
            <FormInput
              label="Subject"
              placeholder="Subject"
              value={subject}
              onChangeText={(text) => handleInputChange(text, "subject")}
            />
            <FormInput
              label="Message"
              placeholder="Message"
              value={message}
              onChangeText={(text) => handleInputChange(text, "message")}
            />
            <Button
              title="Submit"
              onPress={handleSubmit}
              containerStyle={styles.button}
            />
          </FormContainer>
        </View>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    ...TEXT_18,
    fontSize: 30,
    fontWeight: "bold",
  },
  descriptionText: {
    ...TEXT_16,
    marginVertical: SPACING_VERTICAL / 2,
  },
  button: {
    ...GLOBAL_STYLES.center,
    marginVertical: SPACING_VERTICAL,
  },
});
