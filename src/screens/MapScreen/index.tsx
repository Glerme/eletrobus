import { useEffect } from "react";

import { Box } from "native-base";

import { NavigationProps } from "~/routes";

import { useLocation } from "~/contexts/LocationContext";

import { Map } from "~/components/Map";
import { SafeAreaView } from "~/components/Layouts/SafeAreaView";

export const MapScreen = ({ navigation, route }: NavigationProps<"Map">) => {
  const pointId = route.params?.pointId ?? "";
  const routeId = route.params?.routeId ?? "";
  const courseId = route.params?.courseId ?? "";
  // console.log(route.params, "route");

  const { requestLocationPermissions } = useLocation();

  useEffect(() => {
    (async () => await requestLocationPermissions())();
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0DAC86" }}>
        <Box flex={1}>
          <Map pointId={pointId} routeId={routeId} courseId={courseId} />
        </Box>
      </SafeAreaView>
    </>
  );
};
