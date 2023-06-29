import { createDrawerNavigator } from "@react-navigation/drawer";

import TabsRoutes from "./tab.routes";

import { CustomDrawer } from "~/components/CustomDrawer";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        title: "",
      }}
      // drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="TabRoutes" component={TabsRoutes} />
    </Drawer.Navigator>
  );
}
