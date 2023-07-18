import { Box } from "native-base";
import { Map } from "~/components/Map";

import { NavigationProps } from "~/routes";

export const MapScreen = ({ navigation, route }: NavigationProps<"Map">) => {
  return (
    <Box flex={1}>
      <Map />
    </Box>
  );
};
