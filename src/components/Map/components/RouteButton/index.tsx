import { Platform, TouchableNativeFeedback } from "react-native";

import { Plus, Minus, X } from "phosphor-react-native";
import { Container, TextItem } from "./styles";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";
import { Box, HStack, Pressable, Text } from "native-base";
import React from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { UserProps } from "~/interfaces/User.interface";

interface ZoomButtonsProps {
  onZoomPress: (type: "in" | "out") => void;
}

interface BusRouteSelectedInterface {
  busRoute: RoutesBusStopsInterface | null;
  cleanParams: () => void;
  user: UserProps | null;
  setBusRoute: React.Dispatch<RoutesBusStopsInterface | null>;
}

export const RouteButton = ({
  busRoute,
  cleanParams,
  user,
  setBusRoute,
}: BusRouteSelectedInterface) => {
  const navigation = useNavigation();

  const navigationToCourses = () => {
    if (user?.user.driver) navigation.navigate("Courses");
    else navigation.navigate("Points");
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
                setBusRoute(null);
                cleanParams();
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
