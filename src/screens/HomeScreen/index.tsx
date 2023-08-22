import { Box, Button, HStack, ScrollView, Text, VStack } from "native-base";
import { GlobeHemisphereWest, MagnifyingGlass } from "phosphor-react-native";

import { NavigationProps } from "~/routes";

import { routesMock } from "~/mock/RotasMock";

import { Background } from "~/components/Layouts/Background";
import { ListRouteCards } from "~/components/ListRouteCards";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";

export const HomeScreen = ({ navigation, route }: NavigationProps<"Home">) => {
  return (
    <Background>
      <ScreenContent>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack flex={1} justifyContent="space-between">
            <ListRouteCards description="Sairá em Breve" data={routesMock} />
            <ListRouteCards description="Ônibus em tráfego" data={routesMock} />
            <ListRouteCards description="Favoritos" data={routesMock} />

            <Box alignItems="center" mb="3">
              <Button
                h={12}
                w={"full"}
                colorScheme="secondary"
                bg={THEME.colors.secondary["500"]}
                onPress={() => navigation.navigate("Routes")}
              >
                <HStack space={1} alignItems={"center"}>
                  <MagnifyingGlass size={20} color="white" />
                  <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
                    Buscar Rotas
                  </Text>
                </HStack>
              </Button>
            </Box>
            <Box alignItems="center">
              <Button
                h={12}
                w={"full"}
                bg={THEME.colors.primary["500"]}
                colorScheme="primary"
                onPress={() => navigation.navigate("Map")}
              >
                <HStack space={1} alignItems={"center"}>
                  <GlobeHemisphereWest size={20} color="white" />
                  <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
                    Descobrir
                  </Text>
                </HStack>
              </Button>
            </Box>
          </VStack>
        </ScrollView>
      </ScreenContent>
    </Background>
  );
};
