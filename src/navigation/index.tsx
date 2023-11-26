import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "../screens/SplashScreen";
import { AuthStackScreen } from "./stacks/auth";
import { DrawerStackScreen } from "./stacks/drawer";
import { RootStackParamList } from "./types";
import { StatusBar } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { COLORS } from "../configs/colors/colors";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackScreen: React.FC = () => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={theme === "LIGHT" ? "dark-content" : "light-content"}
        backgroundColor={theme === "LIGHT" ? COLORS.white : COLORS.textDark}
      />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
        <RootStack.Screen
          name="DrawerStackScreen"
          component={DrawerStackScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
