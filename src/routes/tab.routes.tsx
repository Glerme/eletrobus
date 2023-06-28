import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { House, Gear, MapPinLine, Path } from "phosphor-react-native";

import {
  HomeStackScreen,
  MapStackScreen,
  RoutesStackScreen,
  SettingsStackScreen,
} from "./stack.routes";

import { THEME } from "~/styles/theme";
import { ROUTES_TAB } from "~/constants/routes";
import { Platform } from "react-native";
import { CustomTabBar } from "~/components/CustomTabBar";

const Tab = createBottomTabNavigator();

export default function TabsRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          marginBottom: Platform.OS === "ios" ? 38 : 24,
          marginHorizontal: 24,
          backgroundColor: "#171626",
          borderTopWidth: 0,

          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 8,
          borderRadius: 8,
        },
        tabBarActiveBackgroundColor: THEME.colors.primary["500"],
        tabBarActiveTintColor: THEME.colors.white,
        tabBarInactiveTintColor: THEME.colors.gray["700"],
        tabBarItemStyle: {
          borderRadius: 8,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name={ROUTES_TAB.HOME_TAB}
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <House color={color} size={size} weight="fill" />;
            }

            return <House color={color} size={size} weight="regular" />;
          },
        }}
      />

      <Tab.Screen
        name={ROUTES_TAB.MAP_TAB}
        component={MapStackScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <MapPinLine color={color} size={size} weight="fill" />;
            }

            return <MapPinLine color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name={ROUTES_TAB.ROUTES_TAB}
        component={RoutesStackScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Path color={color} size={size} weight="fill" />;
            }

            return <Path color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name={ROUTES_TAB.SETTINGS_TAB}
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Gear color={color} size={size} weight="fill" />;
            }

            return <Gear color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
