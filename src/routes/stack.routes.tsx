import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Header } from "~/components/Header";

import { FavoritesScreen } from "~/screens/FavoritesScreen";
import { HomeScreen } from "~/screens/HomeScreen";
import { MapScreen } from "~/screens/MapScreen";
import { RouteDetailsScreen } from "~/screens/RouteDetailsScreen";
import { RoutesScreen } from "~/screens/RoutesScreen";
import { SettingsScreen } from "~/screens/SettingsScreen";

import { ROUTES_SCREENS } from "~/constants/routes";

const Stack = createNativeStackNavigator();

export const HomeStackScreen = ({ navigation }: { navigation: any }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => (
          <Header {...props} openDrawer={() => navigation?.openDrawer()} />
        ),
      }}
    >
      <Stack.Screen
        name={ROUTES_SCREENS.HOME_SCREEN}
        component={HomeScreen}
        options={{
          headerShown: true,
          title: "",
        }}
      />
      <Stack.Screen
        name={ROUTES_SCREENS.FAVORITES_SCREEN}
        component={FavoritesScreen}
      />
      <Stack.Screen
        name={ROUTES_SCREENS.ROUTE_DETAILS_SCREEN}
        component={RouteDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export const RoutesStackScreen = ({ navigation }: { navigation: any }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => (
          <Header {...props} openDrawer={() => navigation?.openDrawer()} />
        ),
      }}
    >
      <Stack.Screen
        name={ROUTES_SCREENS.ROUTES_SCREEN}
        component={RoutesScreen}
        options={{
          headerShown: true,
          title: "",
        }}
      />
      <Stack.Screen
        name={ROUTES_SCREENS.FAVORITES_SCREEN}
        component={FavoritesScreen}
      />
      <Stack.Screen
        name={ROUTES_SCREENS.ROUTE_DETAILS_SCREEN}
        component={RouteDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export const MapStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ROUTES_SCREENS.MAP_SCREEN}
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const SettingsStackScreen = ({ navigation }: { navigation: any }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES_SCREENS.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          headerShown: true,
          title: "",
          header: (props) => (
            <Header {...props} openDrawer={() => navigation?.openDrawer()} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
