import { createDrawerNavigator } from "@react-navigation/drawer";
import { TabNavigator } from "./tab.routes";

import ROUTES from "~/constants/routes";

import { CustomDrawer } from "~/components/Layouts/CustomDrawer";

import { THEME } from "~/styles/theme";

export const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: THEME.colors.primary["500"],
        drawerActiveTintColor: THEME.colors.white,

        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name={ROUTES.HOME_DRAWER} component={TabNavigator} />
    </Drawer.Navigator>
  );
};
