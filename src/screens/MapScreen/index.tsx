import { Box } from "native-base";
import { Map } from "~/components/Map";
import { IMarker } from "~/interfaces/IMap";

import { NavigationProps } from "~/routes";

const markers: IMarker[] = [
  {
    id: "1",
    title: "Casa",
    description: "Minha casa",
    coordinate: {
      latitude: -22.35172,
      longitude: -48.779252,
    },
    type: "point",
  },
  {
    id: "2",
    title: "onibus",
    description: "onibus 2",
    coordinate: {
      latitude: -22.352,
      longitude: -48.779252,
    },
    type: "bus",
  },
];

export const MapScreen = ({ navigation, route }: NavigationProps<"Map">) => {
  return (
    <Box flex={1}>
      <Map markers={markers} />
    </Box>
  );
};
