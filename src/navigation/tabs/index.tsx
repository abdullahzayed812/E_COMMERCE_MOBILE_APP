import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { IMAGES } from "../../configs/images";
import { NotificationScreen } from "../../screens/NotificationScreen";
import { ProfileScreen } from "../../screens/ProfileScreen";
import { SearchScreen } from "../../screens/SearchScreen";
import { TabStackParamList } from "../types";
import { HomeStackScreen } from "../stacks/home";
import { COLORS } from "../../configs/colors/colors";
import { SPACING } from "../../constants/spacing";
import { useTheme } from "../../utils";

const TabStack = createBottomTabNavigator<TabStackParamList>();

export const TabStackScreen: React.FC = () => {
  const { backgroundColor } = useTheme();

  return (
    <TabStack.Navigator
      initialRouteName="HomeStackScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.mainColor,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: { padding: SPACING, backgroundColor },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeStackScreen") {
            iconName = focused ? IMAGES.activeHome : IMAGES.home;
          } else if (route.name === "ProfileScreen") {
            iconName = focused ? IMAGES.activeUser : IMAGES.user;
          } else if (route.name === "NotificationScreen") {
            iconName = focused ? IMAGES.activeBell : IMAGES.bell;
          } else if (route.name === "SearchScreen") {
            iconName = focused ? IMAGES.activeSearch : IMAGES.search;
          }
          return (
            <Image source={iconName} style={{ width: size, height: size }} />
          );
        },
      })}
    >
      <TabStack.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={{ tabBarLabel: "" }}
      />
      <TabStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ tabBarLabel: "" }}
      />
      <TabStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ tabBarLabel: "", tabBarBadge: 0 }}
      />
      <TabStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ tabBarLabel: "" }}
      />
    </TabStack.Navigator>
  );
};
