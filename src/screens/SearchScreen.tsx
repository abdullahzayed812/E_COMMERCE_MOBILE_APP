import React from "react";
import { StyleSheet } from "react-native";
import { Container } from "../components/Container";
import { FormInput } from "../components/FromInput";
import { Header } from "../components/Header";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { SPACING_VERTICAL } from "../constants/spacing";
import { useTheme } from "../utils";

export const SearchScreen: React.FC = () => {
  const { backgroundColor } = useTheme();

  const [search, setSearch] = React.useState<string>("");

  return (
    <>
      <Header screenName="Search" />
      <Container containerStyleProp={{ ...styles.container, backgroundColor }}>
        <FormInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Search about products"
        />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.shadowContainer,
    marginTop: SPACING_VERTICAL / 2,
  },
});
