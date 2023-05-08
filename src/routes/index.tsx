import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { LoginRoutes } from "./login.routes";

export const Routes = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [user, setUser] = useState<FirebaseAuthTypes.User>();

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged((response) => {
  //     setUser(response);
  //     setIsLoading(false);
  //   });

  //   return subscriber;
  // }, []);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <NavigationContainer>
      {false ? <AppRoutes /> : <LoginRoutes />}
    </NavigationContainer>
  );
};
