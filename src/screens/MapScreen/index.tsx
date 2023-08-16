import { Box } from "native-base";
import { Map } from "~/components/Map";
import { IMarker } from "~/interfaces/IMap";

import { NavigationProps } from "~/routes";

const markers: IMarker[] = [
  {
    id: "1",
    title: "Casa",
    description: "Minha casa",
    image: "https://images.pexels.com/lib/api/pexels.png",
    coordinate: {
      latitude: -22.37074,
      longitude: -48.771654,
    },
    type: "point",
  },
  {
    id: "2",
    title: "onibus",
    description: "onibus 2",
    coordinate: {
      latitude: -22.372185,
      longitude: -48.772031,
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
