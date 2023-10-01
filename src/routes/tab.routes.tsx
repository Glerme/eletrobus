import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { House, Gear, MapPinLine, Path, List } from "phosphor-react-native";

import { HomeScreen } from "~/screens/HomeScreen";
import { MapScreen } from "~/screens/MapScreen";
import { PointsScreen } from "~/screens/PointsScreen";
import { SettingsScreen } from "~/screens/SettingsScreen";

import { THEME } from "~/styles/theme";

const Tabs = createBottomTabNavigator();

export const TabNavigator = ({}) => {
  const navigation = useNavigation<any>();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: THEME.colors.primary["500"],
        tabBarInactiveTintColor: THEME.colors.gray["700"],
        tabBarStyle: {
          backgroundColor: THEME.colors.white,
        },
        // unmountOnBlur: true, // ver dps se isso esta deixando lento
      }}
      initialRouteName={"Home"}
    >
      <Tabs.Screen
        name={"Home"}
        component={HomeScreen as any}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0DAC86",
            borderWidth: 0,
            elevation: 0,
          },
          headerTintColor: THEME.colors.white,
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.openDrawer() as any}
                style={{ marginLeft: 15 }}
              >
                <List size={24} color={THEME.colors.white} />
              </TouchableOpacity>
            );
          },
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size, focused }) => (
            <House
              color={color}
              size={size}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name={"Map"}
        component={MapScreen as any}
        options={{
          headerShown: false,
          tabBarLabel: "Mapa",
          tabBarIcon: ({ color, size, focused }) => (
            <MapPinLine
              color={color}
              size={size}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name={"Points"}
        component={PointsScreen as any}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0DAC86",
            borderWidth: 0,
            elevation: 0,
          },
          headerTintColor: THEME.colors.white,
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.openDrawer() as any}
                style={{ marginLeft: 15 }}
              >
                <List size={24} color={THEME.colors.white} />
              </TouchableOpacity>
            );
          },
          tabBarLabel: "Pontos",
          tabBarIcon: ({ color, size, focused }) => (
            <Path
              color={color}
              size={size}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name={"Settings"}
        component={SettingsScreen as any}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0DAC86",
            borderWidth: 0,
            elevation: 0,
          },
          headerTintColor: THEME.colors.white,
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.openDrawer() as any}
                style={{ marginLeft: 15 }}
              >
                <List size={24} color={THEME.colors.white} />
              </TouchableOpacity>
            );
          },
          tabBarLabel: "Configurações",
          tabBarIcon: ({ color, size, focused }) => (
            <Gear
              color={color}
              size={size}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
