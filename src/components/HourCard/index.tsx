import { Box, Heading, Text } from "native-base";
import { HourContainer } from "./styles";

interface HourCardProps {
  isToday: boolean;
}

export const HourCard = ({ isToday }: HourCardProps) => {
  return (
    <HourContainer borderRadius={"full"} margin={2} isToday={isToday}>
      <Box display={"flex"} alignItems={"center"} mt={-2} mb={1}>
        <Text fontSize={"sm"} fontWeight={600}>
          21/05
        </Text>
        <Text fontSize={"sm"} fontWeight={600}>
          Hoje
        </Text>
      </Box>

      <Box display={"flex"} alignItems={"center"}>
        <Text fontSize={11} fontWeight={"500"} color={"gray.700"}>
          Saída: 8h
        </Text>
        <Text fontSize={11} fontWeight={"500"} color={"gray.700"}>
          Chegada: 15h
        </Text>
      </Box>
    </HourContainer>
  );
};
