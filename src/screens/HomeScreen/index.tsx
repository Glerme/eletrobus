import { ScrollView } from "react-native-gesture-handler";

import { NavigationProps } from "~/routes";

import { Background } from "~/components/Layouts/Background";
import { Input } from "~/components/Form/Input";
import { ListRouteCards } from "~/components/ListRouteCards";
import { ScreenContent } from "~/components/Layouts/ScreenContent";
import RotasMock from "~/mock/RotasMock";

export const HomeScreen = ({ navigation, route }: NavigationProps<"Home">) => {
  return (
    <Background>
      <ScrollView>
        <ScreenContent>
          <Input />
          <ListRouteCards description="Favoritos" data={RotasMock} />
          <ListRouteCards description="Ônibus em tráfego" data={RotasMock} />
          <ListRouteCards description="Corridas cadastradas" data={RotasMock} />
        </ScreenContent>
      </ScrollView>
    </Background>
  );
};
