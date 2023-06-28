import { Box } from "native-base";
import { Map } from "~/components/Map";

export const MapScreen = (props: any) => {
  return (
    <Box flex={1}>
      <Map />
    </Box>
  );
};
