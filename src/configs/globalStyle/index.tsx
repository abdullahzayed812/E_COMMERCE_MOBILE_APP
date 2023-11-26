import { StyleSheet } from "react-native";
import {
  BORDER_RADIUS,
  SPACING,
  SPACING_HORIZONTAL,
  SPACING_VERTICAL,
} from "../../constants/spacing";
import { COLORS } from "../colors/colors";
import { TEXT_18 } from "../fonts";
import { calcHeight, calcWidth } from "../Sizes";

export const GLOBAL_STYLES = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  alignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  offerContainer: {
    width: calcWidth(165),
    height: calcHeight(200),
    borderRadius: BORDER_RADIUS,
  },
  offerImage: {
    width: calcWidth(165),
    height: calcHeight(200),
    borderRadius: BORDER_RADIUS,
    resizeMode: "contain",
  },
  productDetailsButtonContainer: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING_VERTICAL * 2,
  },
  productDetailsOptionText: {
    ...TEXT_18,
    marginRight: SPACING_HORIZONTAL * 2,
  },
  spacer: {
    height: 1,
    backgroundColor: COLORS.gray,
    marginVertical: SPACING_VERTICAL,
  },
  shadowContainer: {
    marginVertical: SPACING_VERTICAL,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
    elevation: 10,
  },
});
