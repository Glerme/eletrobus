import { Box, Button, HStack, Text, VStack, View } from "native-base";
import {
  GlobeHemisphereWest,
  MagnifyingGlass,
  MapPin,
} from "phosphor-react-native";

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
            <ListRouteCards description="Ônibus em tráfego" data={routesMock} />
            <ListRouteCards description="Favoritos" data={routesMock} />
          </View>
          <View>
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
          </View>
        </VStack>
      </ScreenContent>
    </Background>
  );
};
