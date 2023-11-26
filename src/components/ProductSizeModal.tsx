import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../configs/colors/colors";
import { TEXT_16 } from "../configs/fonts";
import { GLOBAL_STYLES } from "../configs/globalStyle";
import { calcWidth } from "../configs/Sizes";
import { BORDER_RADIUS, SPACING } from "../constants/spacing";
import { ProductAttributesValues } from "../redux/productDetails/types";

interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  sizes: ProductAttributesValues[];
  setChooseButtonTitle: Dispatch<SetStateAction<string>>;
}

export const ProductSizesModal: React.FC<Props> = ({
  visible,
  setVisible,
  sizes,
  setChooseButtonTitle,
}) => {
  const handleChooseSizePress = (size: string) => {
    setChooseButtonTitle(size);
    setVisible(false);
  };
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Pressable style={styles.container} onPress={() => setVisible(false)}>
        <View style={styles.content}>
          {sizes?.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.sizeContainer}
              onPress={() => handleChooseSizePress(item.title)}
            >
              <Text style={styles.sizeText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.center,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  content: {
    width: calcWidth(300),
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
  },
  sizeContainer: {
    padding: SPACING,
    borderRadius: BORDER_RADIUS,
    borderColor: COLORS.lightBlue,
  },
  sizeText: {
    ...TEXT_16,
  },
});
