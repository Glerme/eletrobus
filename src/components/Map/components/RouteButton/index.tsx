import { Platform, TouchableNativeFeedback } from "react-native";

import { Plus, Minus, X } from "phosphor-react-native";
import { Container, TextItem } from "./styles";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";
import { Box, HStack, Text } from "native-base";

interface ZoomButtonsProps {
  onZoomPress: (type: "in" | "out") => void;
}

interface BusRouteSelectedInterface {
  busRoute: RoutesBusStopsInterface;
}
export const RouteButton = ({ busRoute }: BusRouteSelectedInterface) => {
  return (
    <Container>
      <HStack>
        <TextItem>
          <Text lineHeight={15} color="white">
            Rotas
          </Text>
          {/* <Plus color="white" /> */}
        </TextItem>
        <HStack
          space={2}
          alignItems={"center"}
          backgroundColor="white"
          borderBottomRightRadius={4}
          borderTopRightRadius={4}
          padding={2}
        >
          <Text lineHeight={15}>{busRoute.name}</Text>
          <TouchableNativeFeedback>
            <X size={14} color="#080808" />
          </TouchableNativeFeedback>
        </HStack>
      </HStack>
    </Container>
  );
};
