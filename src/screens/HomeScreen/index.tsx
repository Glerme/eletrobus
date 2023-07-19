import { ScrollView } from "react-native-gesture-handler";

import { NavigationProps } from "~/routes";

import { Background } from "~/components/Layouts/Background";
import { Input } from "~/components/Form/Input";
import { ListRouteCards } from "~/components/ListRouteCards";
import { ScreenContent } from "~/components/Layouts/ScreenContent";
import RotasMock from "~/mock/RotasMock";
import { HStack, Text, View } from "native-base";
import { MapPin } from "phosphor-react-native";

export const HomeScreen = ({ navigation, route }: NavigationProps<"Home">) => {
  return (
    <Background>
      <ScrollView>
        <ScreenContent>
          <View mb={4}>
            <HStack space={1} alignItems={"center"} justifyContent={"center"}>
              <MapPin size={28} color="#ea3c10" weight="fill" />
              <Text fontSize={"lg"} fontWeight={"600"}>
                Pederneiras-SP
              </Text>
            </HStack>
          </View>
          <ListRouteCards description="Ônibus em tráfego" data={RotasMock} />
          <ListRouteCards description="Favoritos" data={RotasMock} />
          {/* <ListRouteCards description="Corridas cadastradas" data={RotasMock} /> */}
          {/* 🔍 Encontrar Rota */}
          {/* Descobrir */}
          {/* Todos e Estudante no card */}
        </ScreenContent>
      </ScrollView>
    </Background>
  );
};
