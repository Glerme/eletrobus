import { Platform, TouchableNativeFeedback } from "react-native";

import { Plus, Minus, X } from "phosphor-react-native";
import { Container, TextItem } from "./styles";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";
import { Box, HStack, Pressable, Text } from "native-base";
import React from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface ZoomButtonsProps {
  onZoomPress: (type: "in" | "out") => void;
}

interface BusRouteSelectedInterface {
  busRoute: RoutesBusStopsInterface | null;
  setBusRoute: React.Dispatch<RoutesBusStopsInterface | null>;
}

interface Params {
  routeId?: string;
}
export const RouteButton = ({
  busRoute,
  setBusRoute,
}: BusRouteSelectedInterface) => {
  const navigation = useNavigation();

  const newStack: any = navigation.dispatch((state) => {
    // Copie o estado atual
    const routes = state.routes.slice();

    // Encontre a rota atual
    const currentRoute = routes[routes.length - 1];
    const params: Params = currentRoute.params;
    // Remova o parâmetro 'paramToRemove' da rota atual
    if (params && params.routeId) {
      delete params.routeId;
    }

    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1, // Define o índice para a última rota
    });
  });
  const navigationToCourses = () => {
    navigation.navigate("Courses");
  };
  return (
    <Container>
      <HStack>
        <TextItem
          onPress={() => {
            navigationToCourses();
          }}
          isRounded={busRoute ? false : true}
        >
          <Text lineHeight={15} color="white">
            Rotas
          </Text>
          {/* <Plus color="white" /> */}
        </TextItem>
        {busRoute?.name && (
          <HStack
            space={2}
            alignItems={"center"}
            backgroundColor="white"
            borderBottomRightRadius={4}
            borderTopRightRadius={4}
            padding={2}
          >
            <Text lineHeight={15}>{busRoute.name}</Text>
            <Pressable
              onPress={() => {
                console.log("teste");
                setBusRoute(null);
                navigation.dispatch(newStack);
                // routeId = undefined;
              }}
            >
              <X size={14} color="#080808" />
            </Pressable>
          </HStack>
        )}
      </HStack>
    </Container>
  );
};
