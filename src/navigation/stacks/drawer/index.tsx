import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import { CustomDrawerContent } from "../../../components/CustomDrawerContent";
import { COLORS } from "../../../configs/colors/colors";
import { TEXT_14 } from "../../../configs/fonts";
import { calcWidth } from "../../../configs/Sizes";
import { SPACING } from "../../../constants/spacing";
import { useTheme } from "../../../utils";
import { TabStackScreen } from "../../tabs";
import { DrawerStackParamList } from "../../types";

const Drawer = createDrawerNavigator<DrawerStackParamList>();

export const DrawerStackScreen = () => {
  const { backgroundColor } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        overlayColor: "transparent",
        drawerStyle: { ...styles.drawerStyle, backgroundColor },
        drawerItemStyle: styles.drawerItemStyle,
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerActiveBackgroundColor: COLORS.gray,
        drawerActiveTintColor: COLORS.lightBlue,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="TabStackScreen" component={TabStackScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerStyle: {
    width: calcWidth(200),
    padding: SPACING / 2,
  },
  drawerItemStyle: {
    // padding: 10
  },
  drawerLabelStyle: {
    ...TEXT_14,
  },
});
