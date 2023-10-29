import { Platform, TouchableNativeFeedback } from "react-native";

import { Plus, Minus, X } from "phosphor-react-native";
import { Container, TextItem } from "./styles";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";
import { Box, HStack, Pressable, Text } from "native-base";
import { useState } from "react";

export const StateButton = ({ busRoute, setBusRoute }: any) => {
  const [time, setTime] = useState<number>(0);

  return (
    <Container>
      <HStack
        space={2}
        alignItems={"center"}
        backgroundColor="white"
        borderRadius={4}
        borderWidth={1}
        borderColor={"gray.400"}
        padding={2}
      >
        <Text lineHeight={15}>Estado</Text>
      </HStack>
    </Container>
  );
};
