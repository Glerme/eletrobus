import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "~/pages/Login";

import { Home } from "~/pages/Passageiro/Home";

const Stack = createNativeStackNavigator();

export const LoginRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="login" component={Login} />
      {/* <Stack.Screen name="chooseUser" component={ChooseUser} /> */}
      {/* <Stack.Screen name="passageiro" component={<></>} /> */}
    </Stack.Navigator>
  );
};
