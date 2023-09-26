import { Box, Button, HStack, ScrollView, Text, VStack } from "native-base";
import { GlobeHemisphereWest, MagnifyingGlass } from "phosphor-react-native";
import LottieView from "lottie-react-native";

import { NavigationProps } from "~/routes";

import { routesMock } from "~/mock/RotasMock";

import { useAuth } from "~/contexts/AuthContext";

import { Background } from "~/components/Layouts/Background";
import { ListRouteCards } from "~/components/ListRouteCards";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";

export const HomeScreen = ({ navigation, route }: NavigationProps<"Home">) => {
  const { user } = useAuth();

  return (
    <Background>
      <ScreenContent>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack flex={1} justifyContent={"space-between"}>
            {user?.driver ? (
              <>
                <Box
                  display={"flex"}
                  justifyItems={"center"}
                  alignItems={"center"}
                >
                  <LottieView
                    autoPlay
                    loop
                    style={{
                      width: 300,
                      height: 300,
                    }}
                    source={require("~/assets/animations/driver.json")}
                  />
                </Box>

                <VStack alignItems="center" mb="3" mt="2" space={2}>
                  <Button
                    h={12}
                    w={"full"}
                    colorScheme="primary"
                    bg={THEME.colors.primary["500"]}
                    onPress={() => navigation.navigate("Routes")}
                  >
                    <HStack space={1} alignItems={"center"}>
                      <MagnifyingGlass size={20} color="white" />
                      <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
                        Iniciar rota
                      </Text>
                    </HStack>
                  </Button>

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
                        Buscar rotas
                      </Text>
                    </HStack>
                  </Button>
                </VStack>
              </>
            ) : (
              <>
                <ListRouteCards
                  description="Sairá em Breve"
                  data={routesMock}
                />
                <ListRouteCards
                  description="Ônibus em tráfego"
                  data={routesMock}
                />
                <ListRouteCards description="Favoritos" data={routesMock} />

                <VStack alignItems="center" mb="3" space={2}>
                  <Button
                    h={12}
                    w={"full"}
                    colorScheme="primary"
                    bg={THEME.colors.primary["500"]}
                    onPress={() => navigation.navigate("Routes")}
                  >
                    <HStack space={1} alignItems={"center"}>
                      <MagnifyingGlass size={20} color="white" />
                      <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
                        Buscar Rotas
                      </Text>
                    </HStack>
                  </Button>

                  <Button
                    h={12}
                    w={"full"}
                    bg={THEME.colors.secondary["500"]}
                    colorScheme="secondary"
                    onPress={() => navigation.navigate("Map", {})}
                  >
                    <HStack space={1} alignItems={"center"}>
                      <GlobeHemisphereWest size={20} color="white" />
                      <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
                        Descobrir
                      </Text>
                    </HStack>
                  </Button>
                </VStack>
              </>
            )}
          </VStack>
        </ScrollView>
      </ScreenContent>
    </Background>
  );
};
