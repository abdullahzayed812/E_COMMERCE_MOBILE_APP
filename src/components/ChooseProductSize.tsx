import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../configs/colors/colors";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { Button } from "./Button";

interface Props {
  setSizesModalVisible: Dispatch<SetStateAction<boolean>>;
  chooseButtonTitle: string;
}

export const ChooseProductSize: React.FC<Props> = ({
  setSizesModalVisible,
  chooseButtonTitle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Size</Text>
      <Button
        title={chooseButtonTitle}
        onPress={() => setSizesModalVisible(true)}
        containerStyle={{ backgroundColor: COLORS.gray }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.productDetailsButtonContainer,
  },
  text: {
    ...GLOBAL_STYLES.productDetailsOptionText,
  },
});
