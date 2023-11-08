import { Platform, TouchableNativeFeedback } from "react-native";

import { Plus, Minus, X } from "phosphor-react-native";
import { Container, TextItem } from "./styles";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";
import { Box, HStack, Pressable, Text } from "native-base";
import { useState } from "react";
import { EStateRun } from "~/enum/EStateRun";
import { getColorFromState } from "~/utils/colorState";

export const StateButton = ({ busRoute, setBusRoute }: any) => {
  const [time, setTime] = useState<number>(0);

  return (
    <Container>
      <HStack>
        <TextItem onPress={() => {}}>
          <Text lineHeight={15} color="white">
            Estado
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
          <Box
            height={2}
            width={4}
            backgroundColor={`${getColorFromState(EStateRun.EmCorrida)}`}
          ></Box>
          <Text lineHeight={15}>{EStateRun.EmCorrida}</Text>
        </HStack>
      </HStack>
    </Container>
  );
};