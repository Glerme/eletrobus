import { ScrollView } from "react-native-gesture-handler";

import { NavigationProps } from "~/routes";

import { Background } from "~/components/Layouts/Background";
import { Input } from "~/components/Form/Input";
import { ListRouteCards } from "~/components/ListRouteCards";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

const mockedData = [
  {
    id: 1,
    name: "Unesp",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: true,
  },
  {
    id: 2,
    name: "UFSC",
    favorite: false,
    saida: new Date(),
    chegada: new Date(),
    status: true,
  },
  {
    id: 3,
    name: "USP",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: false,
  },
  {
    id: 4,
    name: "UFRJ",
    favorite: false,
    saida: new Date(),
    chegada: new Date(),
    status: true,
  },
  {
    id: 5,
    name: "PUC-RS",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: true,
  },
];

export const HomeScreen = ({ navigation, route }: NavigationProps<"Home">) => {
  return (
    <Background>
      <ScrollView>
        <ScreenContent>
          <Input />
          <ListRouteCards description="Favoritos" data={mockedData} />
          <ListRouteCards description="Ônibus em tráfego" data={mockedData} />
          <ListRouteCards
            description="Corridas cadastradas"
            data={mockedData}
          />
        </ScreenContent>
      </ScrollView>
    </Background>
  );
};
