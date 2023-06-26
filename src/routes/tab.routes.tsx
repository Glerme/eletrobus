import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HouseSimple, Gear, MapTrifold, Path } from "phosphor-react-native";

import {
  HomeStackScreen,
  MapStackScreen,
  RoutesStackScreen,
  SettingsStackScreen,
} from "./stack.routes";

const Tab = createBottomTabNavigator();

export default function TabsRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, unmountOnBlur: true }}>
      <Tab.Screen
        name="homeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => (
            <HouseSimple color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="mapTab"
        component={MapStackScreen}
        options={{
          tabBarLabel: "Mapa",
          tabBarIcon: ({ color, size }) => (
            <MapTrifold color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="routesTab"
        component={RoutesStackScreen}
        options={{
          tabBarLabel: "Rotas",
          tabBarIcon: ({ color, size }) => <Path color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="settingsTab"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: "Configurações",
          tabBarIcon: ({ color, size }) => <Gear color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
