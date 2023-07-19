import { ScrollView } from "react-native-gesture-handler";

import { NavigationProps } from "~/routes";

import { Background } from "~/components/Layouts/Background";
import { Input } from "~/components/Form/Input";
import { ListRouteCards } from "~/components/ListRouteCards";
import { ScreenContent } from "~/components/Layouts/ScreenContent";
import RotasMock from "~/mock/RotasMock";
import { Box, Button, HStack, Text, VStack, View } from "native-base";
import {
  GlobeHemisphereWest,
  MagnifyingGlass,
  MapPin,
} from "phosphor-react-native";
import { THEME } from "~/styles/theme";

export const HomeScreen = ({ navigation, route }: NavigationProps<"Home">) => {
  return (
    <Background>
      <ScreenContent>
        <VStack flex={1} justifyContent="space-between">
          <View>
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
          </View>
          <View>
            <Box alignItems="center" mb="4">
              <Button
                h={14}
                w={"full"}
                colorScheme="secondary"
                bg={THEME.colors.secondary["500"]}
                onPress={() => navigation.navigate("Routes")}
              >
                <HStack space={1} alignItems={"center"}>
                  <MagnifyingGlass color="white" />
                  <Text fontSize={"md"} fontWeight={"500"} color={"white"}>
                    Encontrar Rota
                  </Text>
                </HStack>
              </Button>
            </Box>
            <Box alignItems="center">
              <Button
                h={14}
                w={"full"}
                bg={THEME.colors.primary["500"]}
                colorScheme="primary"
                onPress={() => navigation.navigate("Map")}
              >
                <HStack space={1} alignItems={"center"}>
                  <GlobeHemisphereWest color="white" />
                  <Text fontSize={"md"} fontWeight={"500"} color={"white"}>
                    Descobrir
                  </Text>
                </HStack>
              </Button>
            </Box>
          </View>
        </VStack>
      </ScreenContent>
    </Background>
  );
};
