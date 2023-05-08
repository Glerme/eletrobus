import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ChooseUser } from "../pages/ChooseUser";
import { Login } from "~/pages/Login";

const Stack = createNativeStackNavigator();

export const LoginRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="chooseUser"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="chooseUser" component={ChooseUser} />
      <Stack.Screen name="login" component={Login} />
      {/* <Stack.Screen name="passageiro" component={<></>} /> */}
    </Stack.Navigator>
  );
};
