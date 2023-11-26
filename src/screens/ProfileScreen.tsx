import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { FormInput } from "../components/FromInput";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Spacer } from "../components/Spacer";
import { postData } from "../configs/apis";
import { TEXT_14, TEXT_18 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING, SPACING_VERTICAL } from "../constants/spacing";
import { UPDATE_USER_PROFILE_ENDPOINT_URL } from "../constants/urls";
import { useAppSelector } from "../redux/hooks";
import { useTheme } from "../utils";

export const ProfileScreen: React.FC = () => {
  const toast = useToast();
  const { backgroundColor } = useTheme();

  const [name, setName] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const { userProfile } = useAppSelector((state) => state.user);

  const handlePress = async () => {
    try {
      setLoading(true);
      await postData(UPDATE_USER_PROFILE_ENDPOINT_URL, { name });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      toast.show("Your name updated successfully");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header screenName="Profile" />
      <Container containerStyleProp={{ ...styles.container, backgroundColor }}>
        <View style={styles.containerContent}>
          <Text style={styles.header}>My Profile</Text>
          <Spacer />
          <Text style={styles.text}>Email: {userProfile?.email}</Text>
          <Text style={styles.text}>Name: {userProfile?.name}</Text>
          <View style={styles.updateBox}>
            <FormInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder={userProfile?.name}
            />
            <Button
              title="Update Profile"
              containerStyle={styles.button}
              onPress={handlePress}
            />
          </View>
        </View>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.center,
  },
  containerContent: {
    width: "98%",
    ...GLOBAL_STYLES.shadowContainer,
  },
  header: {
    ...TEXT_18,
    fontWeight: "bold",
    padding: SPACING / 2,
  },
  text: {
    ...TEXT_14,
    fontWeight: "bold",
    padding: SPACING / 2,
  },
  updateBox: {
    padding: SPACING / 2,
    marginVertical: SPACING_VERTICAL,
  },
  button: {
    alignSelf: "center",
    marginTop: SPACING_VERTICAL / 2,
  },
});
