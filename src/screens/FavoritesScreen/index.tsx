import { useLayoutEffect } from "react";
import { Box, IconButton, Text, VStack } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { CaretLeft } from "phosphor-react-native";

import { Title } from "~/components/Title";
import { RouteCard } from "~/components/RouteCard";
import { Background } from "~/components/Background";
import { ScreenContent } from "~/components/ScreenContent";

import { THEME } from "~/styles/theme";

import { ROUTES_SCREENS } from "~/constants/routes";

import CorridasSalvasSvg from "~/assets/corridas-salvas.svg";

const mockedData = {
  id: 1,
  name: "Unip/Unesp",
  favorite: true,
  saida: new Date(),
  chegada: new Date(),
  status: true,
};

export const FavoritesScreen = ({}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Título da Tela",
      headerBackTitleVisible: false, // Ocultar o título de retorno
      headerStyle: {
        backgroundColor: "#0DAC86",
      },
      statusBarStyle: "light",
      statusBarColor: "#0DAC86",
      contentStyle: {
        elevation: 0, // Remover a borda do cabeçalho no Android
        shadowOpacity: 0, // Remover a borda do cabeçalho no iOS
        borderBottomWidth: 0, // Remover a borda do cabeçalho
      },
      headerShadowVisible: false, // applied here
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerLeft: () => (
        <IconButton
          onPress={() => navigation.goBack()}
          marginRight={"2"}
          marginLeft={"-14px"}
        >
          <CaretLeft color="white" />
        </IconButton>
      ),
    });
  }, [navigation]);

  return (
    <Background>
      <ScreenContent>
        <Title>Corridas salvas</Title>

        <Box alignItems={"center"} display={"flex"} mt={4}>
          <CorridasSalvasSvg />
          <Box display={"flex"} alignItems={"center"} mt={2}>
            <Text textAlign={"center"} color={THEME.colors.gray["900"]}>
              Confira as corridas que foram favoritadas por você abaixo:
            </Text>
          </Box>
        </Box>

        <VStack mb={10} mt={2} space={2}>
          <RouteCard
            route={mockedData}
            onPressCard={() =>
              navigation.navigate(ROUTES_SCREENS.ROUTE_DETAILS_SCREEN, {
                id: mockedData?.id,
              })
            }
          />
        </VStack>
      </ScreenContent>
    </Background>
  );
};
