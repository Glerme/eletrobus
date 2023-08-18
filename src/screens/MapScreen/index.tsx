import { MapInterface } from "~/interfaces/Map.interface";

import { Box } from "native-base";

import { NavigationProps } from "~/routes";

import { Map } from "~/components/Map";
import { routesMock } from "~/mock/RotasMock";

export const MapScreen = ({ navigation, route }: NavigationProps<"Map">) => {
  return (
    <Box flex={1}>
      <Map markers={routesMock} />
    </Box>
  );
};
