import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "~/pages/Login";
import { PHome } from "~/pages/PHome";

const Stack = createNativeStackNavigator();

export const LoginRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="PHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="PHome" component={PHome} />
      {/* <Stack.Screen name="chooseUser" component={ChooseUser} /> */}
      {/* <Stack.Screen name="passageiro" component={<></>} /> */}
    </Stack.Navigator>
  );
};
