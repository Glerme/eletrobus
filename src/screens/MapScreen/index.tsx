import { ActivityIndicator } from "react-native";

import { Box, Center } from "native-base";
import { useQuery } from "@tanstack/react-query";

import { NavigationProps } from "~/routes";

import api from "~/services/axios";

import { BusStopInterface } from "~/interfaces/BusStop.interface";

import { Map } from "~/components/Map";
import { Alert } from "~/components/Alert";
import { SafeAreaView } from "~/components/Layouts/SafeAreaView";

import { THEME } from "~/styles/theme";

export const MapScreen = ({ navigation, route }: NavigationProps<"Map">) => {
  const pointId = route.params?.pointId ?? "";
  const routeId = route.params?.routeId ?? "";

  const {
    data: points,
    isLoading,
    isError,
    error,
  } = useQuery<BusStopInterface>({
    queryKey: ["bus-stop"],
    queryFn: async () => {
      const { data } = await api.get<BusStopInterface>(
        "/bus-stop/by-position?latitude=-22.371273&longitude=-48.7737459&range=300"
      );
      return data;
    },
  });

  if (isLoading) {
    return (
      <Box
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"gray.400"}
      >
        <Center flex={1}>
          <ActivityIndicator
            size={"large"}
            color={THEME.colors.primary["900"]}
          />
        </Center>
      </Box>
    );
  }

  if (isError) {
    console.error(error);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0DAC86" }}>
        <Box>
          <Alert status="error" />
        </Box>
        <Box flex={1}>
          <Map markers={[]} />
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0DAC86" }}>
        <Box flex={1}>
          <Map markers={points.data} pointId={pointId} routeId={routeId} />
        </Box>
      </SafeAreaView>
    </>
  );
};
