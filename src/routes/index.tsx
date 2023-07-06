import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DrawerNavigator } from "./drawer.routes";

import ROUTES from "~/constants/routes";

import { FavoritesScreen } from "~/screens/FavoritesScreen";
import { RouteDetailsScreen } from "~/screens/RouteDetailsScreen";

const Stack = createNativeStackNavigator();

const stacks = [
  {
    name: ROUTES.ROUTE_DETAILS,
    component: RouteDetailsScreen,
  },
  {
    name: ROUTES.FAVORITES,
    component: FavoritesScreen,
  },
];

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarStyle: "light",
        }}
        initialRouteName="DrawerNavigator"
      >
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{
            headerStyle: {
              backgroundColor: "#0DAC86",
            },
            statusBarStyle: "light",
            statusBarColor: "#0DAC86",
            contentStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerShadowVisible: false,
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        {stacks.map((stack, index) => (
          <Stack.Screen
            name={stack.name}
            component={stack.component}
            key={index}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "#0DAC86",
              },
              statusBarStyle: "light",
              statusBarColor: "#0DAC86",
              contentStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerShadowVisible: false,
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
