import React from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { FromWhereItem } from "./FromWhereItem";

interface Props {
  activeRadio: string;
  handleRadioPress(radioName: string): void;
}

export const FromWhereBox: React.FC<Props> = ({
  activeRadio,
  handleRadioPress,
}) => {
  return (
    <View style={styles.container}>
      <FromWhereItem
        title="From location"
        activeRadio={activeRadio}
        handleRadioPress={handleRadioPress}
      />
      <FromWhereItem
        title="From pickup place"
        activeRadio={activeRadio}
        handleRadioPress={handleRadioPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.alignCenter,
  },
});
