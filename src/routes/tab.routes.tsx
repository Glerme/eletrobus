import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { House, Gear, MapPinLine, Path } from "phosphor-react-native";
import { ROUTES_TAB } from "~/constants/routes";

import { HomeScreen } from "~/screens/HomeScreen";
import { MapScreen } from "~/screens/MapScreen";
import { RoutesScreen } from "~/screens/RoutesScreen";
import { SettingsScreen } from "~/screens/SettingsScreen";

const Tabs = createBottomTabNavigator();

export const TabNavigator = ({}) => (
  <Tabs.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Home"
  >
    <Tabs.Screen
      name={ROUTES_TAB.HOME_TAB}
      component={HomeScreen}
      options={{
        tabBarLabel: "Início",
        tabBarIcon: ({ color, size, focused }) => (
          <House
            color={color}
            size={size}
            weight={focused ? "fill" : "regular"}
          />
        ),
      }}
    />

    <Tabs.Screen
      name={ROUTES_TAB.MAP_TAB}
      component={MapScreen}
      options={{
        tabBarLabel: "Mapa",
        tabBarIcon: ({ color, size, focused }) => (
          <MapPinLine
            color={color}
            size={size}
            weight={focused ? "fill" : "regular"}
          />
        ),
      }}
    />

    <Tabs.Screen
      name={ROUTES_TAB.ROUTES_TAB}
      component={RoutesScreen}
      options={{
        tabBarLabel: "Rotas",
        tabBarIcon: ({ color, size, focused }) => (
          <Path
            color={color}
            size={size}
            weight={focused ? "fill" : "regular"}
          />
        ),
      }}
    />

    <Tabs.Screen
      name={ROUTES_TAB.SETTINGS_TAB}
      component={SettingsScreen}
      options={{
        tabBarLabel: "Configurações",
        tabBarIcon: ({ color, size, focused }) => (
          <Gear
            color={color}
            size={size}
            weight={focused ? "fill" : "regular"}
          />
        ),
      }}
    />
  </Tabs.Navigator>
);

// export const RootStackScreen = () => {
//   return (
//     <RootStack.Navigator
//       initialRouteName="TabsRoutes"
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <RootStack.Screen name="TabsRoutes" component={TabsRoutes} />
//       <RootStack.Screen name="Home" component={HomeStackScreen} />
//     </RootStack.Navigator>
//   );
// };

// export const TabsRoutes = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         unmountOnBlur: true,
//       }}
//       // tabBar={(props) => <CustomTabBar {...props} />}
//     >
//       <Tab.Screen
//         name={ROUTES_TAB.HOME_TAB}
//         component={HomeStackScreen}
//         options={{
//           tabBarIcon: ({ color, size, focused }) => (
//             <House
//               color={color}
//               size={size}
//               weight={focused ? "fill" : "regular"}
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name={ROUTES_TAB.MAP_TAB}
//         component={MapStackScreen}
//         options={{
//           tabBarIcon: ({ color, size, focused }) => (
//             <MapPinLine
//               color={color}
//               size={size}
//               weight={focused ? "fill" : "regular"}
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name={ROUTES_TAB.ROUTES_TAB}
//         component={RoutesStackScreen}
//         options={{
//           tabBarIcon: ({ color, size, focused }) => (
//             <Path
//               color={color}
//               size={size}
//               weight={focused ? "fill" : "regular"}
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name={ROUTES_TAB.SETTINGS_TAB}
//         component={SettingsStackScreen}
//         options={{
//           tabBarIcon: ({ color, size, focused }) => (
//             <Gear
//               color={color}
//               size={size}
//               weight={focused ? "fill" : "regular"}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };
