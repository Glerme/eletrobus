import { Box, Text } from "native-base";

import { IMarker } from "~/interfaces/IMap";

import { NavigationProps } from "~/routes";

import { Map } from "~/components/Map";
import { EStatusType } from "~/components/BusStatus/StatusInfo/EStatusType";

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
    status: EStatusType.EM_MOVIMENTO,
    tipo: "estudantes",
    favorite: true,
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
    status: EStatusType.CANCELADA,
    tipo: "circulares",
    favorite: false,
  },
];

export const MapScreen = ({ navigation, route }: NavigationProps<"Map">) => {
  return (
    <Box flex={1}>
      <Map markers={markers} />
    </Box>
  );
};
