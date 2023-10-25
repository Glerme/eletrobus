import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";
import { Alert as NBAlert, Text } from "native-base";

import { Container } from "./styles";

interface BusRouteSelectedInterface {
  busRoute: RoutesBusStopsInterface;
}

export const BusRouteSelected = ({ busRoute }: BusRouteSelectedInterface) => {
  console.log(busRoute);

  return (
    <Container>
      <NBAlert colorScheme={"success"}>
        <Text
          fontSize="md"
          fontWeight="bold"
          color="coolGray.800"
          maxW={"300px"}
        >
          {`Rota: ${busRoute.name}`}
        </Text>
      </NBAlert>
    </Container>
  );
};
