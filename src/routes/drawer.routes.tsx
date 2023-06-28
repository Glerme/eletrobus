import { createDrawerNavigator } from "@react-navigation/drawer";

import { HouseSimple } from "phosphor-react-native";

import TabsRoutes from "./tab.routes";

import { Header } from "~/components/Header";
import { CustomDrawer } from "~/components/CustomDrawer";

import { THEME } from "~/styles/theme";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        title: "",
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="TabsRoutes"
        component={TabsRoutes}

        // options={{
        //   drawerLabel: "Início",
        //   drawerIcon: ({ color, size }) => (
        //     <HouseSimple color={color} size={size} />
        //   ),
        //   drawerLabelStyle: {
        //     marginLeft: -16,
        //   },
        //   drawerActiveTintColor: THEME.colors.primary["500"],
        //   drawerInactiveTintColor: THEME.colors.gray["700"],
        // }}
      />
    </Drawer.Navigator>
  );
}
