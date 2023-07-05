import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TabNavigator } from "./tab.routes";

import { RouteDetailsScreen } from "~/screens/RouteDetailsScreen";
import { FavoritesScreen } from "~/screens/FavoritesScreen";

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

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TabNavigator"
        screenOptions={{
          title: "",
        }}
      >
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        {stacks.map((stack, index) => (
          <Stack.Screen
            name={stack.name}
            component={stack.component}
            key={index}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
