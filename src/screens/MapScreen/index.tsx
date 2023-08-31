import { Box } from "native-base";

import { NavigationProps } from "~/routes";

import { routesMock } from "~/mock/RotasMock";

import { Map } from "~/components/Map";
import { SafeAreaView } from "~/components/Layouts/SafeAreaView";

export const MapScreen = ({ navigation, route }: NavigationProps<"Map">) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0DAC86" }}>
        <Box flex={1}>
          <Map markers={routesMock} />
        </Box>
      </SafeAreaView>
    </>
  );
};
