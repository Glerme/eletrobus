import { createDrawerNavigator } from "@react-navigation/drawer";

import { HouseSimple, Gear } from "phosphor-react-native";

import TabsRoutes from "./tab.routes";

import { SettingsStackScreen } from "./stack.routes";

const Drawer = createDrawerNavigator();

const isTopBarVisible = (route: any) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params
    ? route.params.screen
    : "homeTab";

  return !["mapTab"].includes(routeName);
};

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: isTopBarVisible(route),
        title: "",
      })}
    >
      <Drawer.Screen
        name="home"
        component={TabsRoutes}
        options={{
          drawerLabel: "Início",
          drawerIcon: ({ color, size }) => (
            <HouseSimple color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        component={SettingsStackScreen}
        options={{
          drawerLabel: "Configurações",
          drawerIcon: ({ color, size }) => <Gear color={color} size={size} />,
        }}
      />
    </Drawer.Navigator>
  );
}
