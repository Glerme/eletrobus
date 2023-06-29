import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteDetailsScreen } from "~/screens/RouteDetailsScreen";
import { HomeScreen } from "~/screens/HomeScreen";
import { MapScreen } from "~/screens/MapScreen";
import { RoutesScreen } from "~/screens/RoutesScreen";
import { SettingsScreen } from "~/screens/SettingsScreen";
import { FavoritesScreen } from "~/screens/FavoritesScreen";

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const stacks = [
  {
    name: "RouteDetailsScreen",
    component: RouteDetailsScreen,
  },
  {
    name: "FavoritesScreen",
    component: FavoritesScreen,
  },
];

export const TabNavigator = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
    })}
    initialRouteName="Home"
  >
    <Tabs.Screen name="Home" component={HomeScreen} />
    <Tabs.Screen name="Mapa" component={MapScreen} />
    <Tabs.Screen name="Routes" component={RoutesScreen} />
    <Tabs.Screen name="Settings" component={SettingsScreen} />
  </Tabs.Navigator>
);

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        {stacks.map((stack) => (
          <Stack.Screen name={stack.name} component={stack.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
