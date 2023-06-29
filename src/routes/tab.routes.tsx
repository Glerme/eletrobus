import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeStackScreen,
  MapStackScreen,
  RoutesStackScreen,
  SettingsStackScreen,
} from "./stack.routes";

import { Header } from "~/components/Header";

const App = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

export const TabNavigator = ({ navigation }: { navigation: any }) => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      header: (props) => (
        <Header {...props} openDrawer={() => navigation?.openDrawer()} />
      ),
    })}
    initialRouteName="Home"
  >
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Mapa" component={MapStackScreen} />
    <Tabs.Screen name="Routes" component={RoutesStackScreen} />
    <Tabs.Screen name="Settings" component={SettingsStackScreen} />
  </Tabs.Navigator>
);

export const TabRoutes = () => {
  return (
    <App.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
          gestureEnabled: true,
        };
      }}
      initialRouteName="TabBar"
    >
      <App.Screen name="TabBar" component={TabNavigator} />
    </App.Navigator>
  );
};

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import { House, Gear, MapPinLine, Path } from "phosphor-react-native";

// import {
//   HomeStackScreen,
//   MapStackScreen,
//   RoutesStackScreen,
//   SettingsStackScreen,
// } from "./stack.routes";

// import { ROUTES_TAB } from "~/constants/routes";
// import { CustomTabBar } from "~/components/CustomTabBar";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { HomeScreen } from "~/screens/HomeScreen";

// const Tab = createBottomTabNavigator();
// const RootStack = createNativeStackNavigator();

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
