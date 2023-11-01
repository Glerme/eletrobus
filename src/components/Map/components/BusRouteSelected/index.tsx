import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";
import { HStack, Alert as NBAlert, Text } from "native-base";

import { Container } from "./styles";

interface BusRouteSelectedInterface {
  busRoute: RoutesBusStopsInterface;
}

export const BusRouteSelected = ({ busRoute }: BusRouteSelectedInterface) => {
  return (
    <Container>
      <NBAlert colorScheme={"success"}>
        <HStack>
          <Text
            fontSize="md"
            fontWeight="bold"
            color="coolGray.800"
            maxW={"300px"}
          >
            {`Rota: ${busRoute.name}`}
          </Text>
        </HStack>
      </NBAlert>
    </Container>
  );
};
