import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Header } from "~/components/Header";

import { FavoritesScreen } from "~/screens/FavoritesScreen";
import { HomeScreen } from "~/screens/HomeScreen";
import { MapScreen } from "~/screens/MapScreen";
import { RouteDetailsScreen } from "~/screens/RouteDetailsScreen";
import { RoutesScreen } from "~/screens/RoutesScreen";
import { SettingsScreen } from "~/screens/SettingsScreen";

export type HomeStackParamList = {
  home: undefined;
  favoritesScreen: undefined;
  routeDetailScreen: undefined;
  routesScreen: undefined;
  mapScreen: undefined;
  settingsScreen: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

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
        name="home"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: "",
        }}
      />
      <Stack.Screen name="favoritesScreen" component={FavoritesScreen} />
      <Stack.Screen name="routeDetailScreen" component={RouteDetailsScreen} />
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
        name="routesScreen"
        component={RoutesScreen}
        options={{
          headerShown: true,
          title: "",
        }}
      />
      <Stack.Screen name="favoritesScreen" component={FavoritesScreen} />
      <Stack.Screen name="routeDetailScreen" component={RouteDetailsScreen} />
    </Stack.Navigator>
  );
};

export const MapStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="mapScreen"
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
        name="settingsScreen"
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
