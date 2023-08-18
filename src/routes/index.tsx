import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { DrawerNavigator } from "./drawer.routes";

import { ProfileScreen } from "~/screens/ProfileScreen";
import { FavoritesScreen } from "~/screens/FavoritesScreen";
import { RouteDetailsScreen } from "~/screens/RouteDetailsScreen";
import { Host } from "react-native-portalize";

// Tipagem das telas e parâmetros
export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  RouteDetails: { id: string };
  Favorites: undefined;
  Routes: undefined;
  Settings: undefined;
  Map: undefined;
};

// Tipagem das props de navegação
// { navigation, routes }
export type NavigationProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator();

const stacks: {
  name: keyof RootStackParamList;
  component: React.ComponentType<any>;
}[] = [
  {
    name: "RouteDetails",
    component: RouteDetailsScreen,
  },
  {
    name: "Favorites",
    component: FavoritesScreen,
  },
  {
    name: "Profile",
    component: ProfileScreen,
  },
];

export const Routes = () => {
  return (
    <NavigationContainer>
      <Host>
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
      </Host>
    </NavigationContainer>
  );
};
