import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { Host } from "react-native-portalize";

import { TabNavigator } from "./tab.routes";

import { LoginScreen } from "~/screens/LoginScreen";
import { ProfileScreen } from "~/screens/ProfileScreen";
import { FavoritesScreen } from "~/screens/FavoritesScreen";
import { PointDetailsScreen } from "~/screens/PointDetailsScreen";
import { CourseDetailsScreen } from "~/screens/CourseDetailsScreen";

import { Contexts } from "./contexts.routes";

// Tipagem das telas e parâmetros
export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  PointDetails: { id: string };
  Favorites: undefined;
  Points: undefined;
  Settings: undefined;
  Map: { pointId?: string; routeId?: string };
  CouseDetails: { id: string };
  Login: undefined;
};

// Tipagem das props de navegação
// { navigation, routes }
export type NavigationProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator();

const stacks: {
  name: keyof RootStackParamList;
  component: React.ComponentType<any>;
  label: string;
  options?: NativeStackNavigationOptions;
}[] = [
  {
    name: "Login",
    component: LoginScreen,
    label: "Login",
    options: {
      statusBarStyle: "light",
      statusBarColor: "#4d34dd",
      headerBackButtonMenuEnabled: true,
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#4d34dd",
      },
    },
  },
  {
    name: "PointDetails",
    component: PointDetailsScreen,
    label: "Detalhes do ponto",
  },
  {
    name: "Favorites",
    component: FavoritesScreen,
    label: "Favoritos",
  },
  {
    name: "Profile",
    component: ProfileScreen,
    label: "Perfil",
  },
  {
    name: "CouseDetails",
    component: CourseDetailsScreen,
    label: "Rotas",
  },
];

export const Routes = () => {
  return (
    <NavigationContainer>
      <Contexts>
        <Host>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="TabNavigator"
          >
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{
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
                  title: stack.label,
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
                  ...stack.options,
                }}
              />
            ))}
          </Stack.Navigator>
        </Host>
      </Contexts>
    </NavigationContainer>
  );
};
