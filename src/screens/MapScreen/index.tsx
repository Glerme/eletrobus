import { ActivityIndicator } from "react-native";

import { Box } from "native-base";
import { useQuery } from "@tanstack/react-query";

import { NavigationProps } from "~/routes";

import { api } from "~/services/axios";

import { BusStopInterface } from "~/interfaces/BusStop.interface";

import { Map } from "~/components/Map";
import { ErrorAlert } from "~/components/ErrorAlert";
import { SafeAreaView } from "~/components/Layouts/SafeAreaView";

import { THEME } from "~/styles/theme";

export const MapScreen = ({ navigation, route }: NavigationProps<"Map">) => {
  const { data, isLoading, isError, error } = useQuery<BusStopInterface[]>({
    queryKey: ["bus-stop"],
    queryFn: async () => {
      const { data } = await api.get<BusStopInterface[]>("/bus-stop");
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
        <ActivityIndicator size={"large"} color={THEME.colors.primary["900"]} />
      </Box>
    );
  }

  if (isError) {
    console.error(error);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0DAC86" }}>
        <Box>
          <ErrorAlert error={error} />
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
          <Map markers={data} />
        </Box>
      </SafeAreaView>
    </>
  );
};
