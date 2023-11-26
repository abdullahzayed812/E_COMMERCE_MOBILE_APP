import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/src/types";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerItem } from "./DrawerItem";
import { ThemeBox } from "./ThemeBox";

interface Props {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
}

export interface DrawerItem {
  title: string;
  backgroundColor: string;
  subListBackgroundColor: string;
  subList: { title: string }[];
}

export const CustomDrawerContent: React.FC<Props> = (props: Props) => {
  const { userProfile } = useAppSelector((state) => state.user);

  return (
    <DrawerContentScrollView>
      <DrawerHeader />
      <DrawerItem title="Orders" routeName="OrdersScreen" />
      <DrawerItem title="Wish List" routeName="WishListScreen" />
      <DrawerItem title="Compared List" routeName="ComparedListScreen" />
      <DrawerItem title="Vouchers" routeName="VouchersScreen" />
      <DrawerItem title="Profile" routeName="ProfileScreen" />
      <DrawerItem title="Language" routeName="Language" />
      <DrawerItem title="Contact us" routeName="ContactScreen" />
      {!userProfile?.email ? (
        <>
          <DrawerItem title="Login" routeName="Login" />
        </>
      ) : null}
      {userProfile?.email ? (
        <>
          <DrawerItem title="Logout" routeName="Logout" />
        </>
      ) : null}
      <DrawerItem title="Help" routeName="HelpScreen" />
      <ThemeBox />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({});
