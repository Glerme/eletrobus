import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MapScreen } from "~/pages/MapScreen";
import { HomeScreen } from "~/pages/HomeScreen";
import { RoutesScreen } from "~/pages/RoutesScreen";
import { ConfigurationScreen } from "~/pages/ConfigurationScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();
const RoutesStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const MapStackScreen = () => {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }}>
      <MapStack.Screen name="Mapa" component={MapScreen} />
    </MapStack.Navigator>
  );
};

const RoutesStackScreen = () => {
  return (
    <RoutesStack.Navigator screenOptions={{ headerShown: false }}>
      <RoutesStack.Screen name="Rotas" component={RoutesScreen} />
    </RoutesStack.Navigator>
  );
};

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen
        name="Configurações"
        component={ConfigurationScreen}
      />
    </SettingsStack.Navigator>
  );
};

export const AppRoutes = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="MapaStack" component={MapStackScreen} />
      <Tab.Screen name="RoutesStack" component={RoutesStackScreen} />
      <Tab.Screen name="ConfiguraçõesStack" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
};
