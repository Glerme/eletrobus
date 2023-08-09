import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";

import { Routes } from "./src/routes";

import { Loading } from "~/components/Loading";

import { THEME } from "./src/styles/theme";

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NativeBaseProvider theme={THEME}>
          {fontsLoaded ? (
            <>
              <StatusBar
                style="light"
                translucent
                backgroundColor="transparent"
                animated
              />
              <Routes />
            </>
          ) : (
            <Loading />
          )}
        </NativeBaseProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
