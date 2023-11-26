import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const calcWidth = (pixels: number) => {
  return widthPercentageToDP((pixels * 100) / 375);
};
const calcHeight = (pixels: number) => {
  return heightPercentageToDP((pixels * 100) / 812);
};

export { calcWidth, calcHeight, calcHeight as calcFont };
