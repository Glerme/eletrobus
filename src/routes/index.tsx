import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { Host } from "react-native-portalize";

import { DrawerNavigator } from "./drawer.routes";

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
  Map: { pointId?: string };
  CouseDetails: { id: string };
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
}[] = [
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
                }}
              />
            ))}
          </Stack.Navigator>
        </Host>
      </Contexts>
    </NavigationContainer>
  );
};
