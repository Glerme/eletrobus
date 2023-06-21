import { Box, Heading, Text } from "native-base";
import { HourContainer } from "./styles";

interface HourCardProps {
  isToday: boolean;
}

export const HourCard = ({ isToday }: HourCardProps) => {
  return (
    <HourContainer borderRadius={"full"} margin={2} isToday={isToday}>
      <Box display={"flex"} alignItems={"center"} mb={1}>
        <Heading fontSize={"md"}>21/05</Heading>
        <Heading fontSize={"md"}>Hoje</Heading>
      </Box>

      <Box display={"flex"} alignItems={"center"}>
        <Text fontSize={"12px"} fontWeight={"bold"} color={"gray.700"}>
          Saída: 8:00
        </Text>
        <Text fontSize={"12px"} fontWeight={"bold"} color={"gray.700"}>
          Chegada: 15:00
        </Text>
      </Box>
    </HourContainer>
  );
};
