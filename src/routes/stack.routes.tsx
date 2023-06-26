import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FavoritesScreen } from "~/screens/FavoritesScreen";
import { HomeScreen } from "~/screens/HomeScreen";
import { MapScreen } from "~/screens/MapScreen";
import { RouteDetailsScreen } from "~/screens/RouteDetailsScreen";
import { RoutesScreen } from "~/screens/RoutesScreen";
import { SettingsScreen } from "~/screens/SettingsScreen";

const HomeStack = createNativeStackNavigator();
const RoutesStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="favoritesScreen"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="routeDetailScreen"
        component={RouteDetailsScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export const RoutesStackScreen = () => {
  return (
    <RoutesStack.Navigator>
      <RoutesStack.Screen
        name="routesScreen"
        component={RoutesScreen}
        options={{ headerShown: false }}
      />
      <RoutesStack.Screen name="favoritesScreen" component={FavoritesScreen} />
      <RoutesStack.Screen
        name="routeDetailScreen"
        component={RouteDetailsScreen}
        options={{ headerShown: false }}
      />
    </RoutesStack.Navigator>
  );
};

export const MapStackScreen = () => {
  return (
    <MapStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MapStack.Screen
        name="mapScreen"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </MapStack.Navigator>
  );
};

export const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="settingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
};
