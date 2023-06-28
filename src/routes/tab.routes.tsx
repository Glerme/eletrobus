import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { House, Gear, MapPinLine, Path } from "phosphor-react-native";

import {
  HomeStackScreen,
  MapStackScreen,
  RoutesStackScreen,
  SettingsStackScreen,
} from "./stack.routes";

import { THEME } from "~/styles/theme";

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
          backgroundColor: "#171626",
          borderTopWidth: 0,

          bottom: 14,
          left: 14,
          right: 14,
          elevation: 0,
          borderRadius: 8,
        },
        tabBarActiveBackgroundColor: THEME.colors.primary["500"],
        tabBarActiveTintColor: THEME.colors.white,
        tabBarInactiveTintColor: THEME.colors.gray["700"],
        tabBarItemStyle: {
          borderRadius: 8,
        },
      }}
    >
      <Tab.Screen
        name="homeTab"
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
        name="mapTab"
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
        name="routesTab"
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
        name="settingsTab"
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
