import LottieView from "lottie-react-native";
import {
  Box,
  Center,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { MapPinLine, Path, Star } from "phosphor-react-native";

import { NavigationProps } from "~/routes";

import { useAuth } from "~/contexts/AuthContext";

import { Button } from "~/components/Form/Button";
import { Avatar } from "~/components/Form/Avatar";
import { StatusBar } from "~/components/StatusBar";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";

export const HomeScreen = ({ navigation, route }: NavigationProps<"Home">) => {
  const { user } = useAuth();

  return (
    <>
      <StatusBar />
      <Background>
        {user?.user ? (
          <HStack alignItems="center" space={2} mx={1} p={1}>
            <Avatar
              bg="blue.500"
              size="md"
              source={
                user?.user?.avatar
                  ? {
                      uri: user?.user?.avatar,
                    }
                  : require("~/assets/img/avatar-not-found.png")
              }
            />
            <VStack>
              <Text fontSize="sm" fontWeight="bold" color={"white"}>
                Seja bem vindo(a)!
              </Text>
              <Text fontSize="xl" fontWeight="bold" color={"white"}>
                {user?.user?.name}
              </Text>
            </VStack>
          </HStack>
        ) : (
          <HStack alignItems="center" space={2} mx={1} p={1}>
            <VStack>
              <Text fontSize="xl" fontWeight="bold" color={"white"}>
                Seja bem vindo(a)!
              </Text>
            </VStack>
          </HStack>
        )}

        <ScreenContent>
          {user?.user?.driver ? (
            <ScrollView>
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
                  onPress={() =>
                    navigation.navigate("Map", {
                      pointId: undefined,
                      routeId: undefined,
                    })
                  }
                  title="Mapa"
                  leftIcon={
                    <Icon as={<MapPinLine size={20} color="white" />} />
                  }
                  fontColor="white"
                />

                <Button
                  h={12}
                  w={"full"}
                  colorScheme="secondary"
                  bg={THEME.colors.secondary["500"]}
                  onPress={() => navigation.navigate("Courses")}
                  leftIcon={<Icon as={<Path size={20} color="white" />} />}
                  fontColor="white"
                  title="Percursos"
                />
              </VStack>
            </ScrollView>
          ) : (
            <ScrollView>
              <VStack flex={1}>
                <Center ml={"20"}>
                  <LottieView
                    autoPlay
                    loop={false}
                    style={{
                      width: 300,
                      height: 300,
                    }}
                    source={require("~/assets/animations/home.json")}
                  />
                </Center>

                <VStack alignItems="center" mb="3" mt="2" space={2}>
                  <Button
                    h={12}
                    w={"full"}
                    colorScheme="primary"
                    bg={THEME.colors.primary["500"]}
                    onPress={() =>
                      navigation.navigate("Map", {
                        pointId: undefined,
                        routeId: undefined,
                      })
                    }
                    title="Mapa"
                    fontColor="white"
                    leftIcon={
                      <Icon as={<MapPinLine size={20} color="white" />} />
                    }
                  />

                  <Button
                    h={12}
                    w={"full"}
                    colorScheme="secondary"
                    bg={THEME.colors.secondary["500"]}
                    onPress={() => navigation.navigate("Points")}
                    leftIcon={<Icon as={<Path size={20} color="white" />} />}
                    title="Pontos"
                    fontColor="white"
                  />

                  {user?.user && (
                    <Button
                      h={12}
                      w={"full"}
                      colorScheme="secondary"
                      bg={THEME.colors.secondary["500"]}
                      onPress={() => navigation.navigate("Favorites")}
                      leftIcon={<Icon as={<Star size={20} color="white" />} />}
                      title="Favoritos"
                      fontColor="white"
                    />
                  )}
                </VStack>
              </VStack>
            </ScrollView>
          )}
        </ScreenContent>
      </Background>
    </>
  );
};
