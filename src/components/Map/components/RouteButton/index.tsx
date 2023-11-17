import React from "react";

import { X } from "phosphor-react-native";
import { HStack, Pressable, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { UserProps } from "~/interfaces/User.interface";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";

import { RootStackParamList } from "~/routes";

import { Container, TextItem } from "./styles";

interface ZoomButtonsProps {
  onZoomPress: (type: "in" | "out") => void;
}

interface BusRouteSelectedInterface {
  busRoute: RoutesBusStopsInterface | null;
  cleanParams: () => void;
  user: UserProps | null;
  setBusRoute: React.Dispatch<RoutesBusStopsInterface | null>;
  isRunning: boolean;
}

export const RouteButton = ({
  isRunning,
  busRoute,
  cleanParams,
  user,
  setBusRoute,
}: BusRouteSelectedInterface) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "Map", undefined>
    >();

  const navigationToCourses = () => {
    if (user?.user.driver) navigation.navigate("Courses");
    else navigation.navigate("Points");
  };
  return (
    <Container>
      <HStack>
        {busRoute?.name && (
          <>
            <TextItem
              onPress={() => {
                navigationToCourses();
              }}
              isRounded={busRoute ? false : true}
            >
              <Text lineHeight={15} color="white">
                Rotas
              </Text>
            </TextItem>

            <Pressable
              disabled={isRunning}
              onPress={() => {
                setBusRoute(null);
                cleanParams();
              }}
            >
              <HStack
                space={2}
                alignItems={"center"}
                backgroundColor="white"
                borderBottomRightRadius={4}
                borderTopRightRadius={4}
                padding={2}
              >
                <Text lineHeight={15}>{busRoute.name}</Text>
                {!isRunning && <X size={14} color="#080808" />}
              </HStack>
            </Pressable>
          </>
        )}
      </HStack>
    </Container>
  );
};
