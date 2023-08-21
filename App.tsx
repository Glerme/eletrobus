import "react-native-gesture-handler";
import { Platform } from "react-native";

import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

import { GestureHandlerRootView } from "react-native-gesture-handler";

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
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar
              backgroundColor={Platform.OS === "android" ? "transparent" : ""}
              style={"light"}
              translucent={Platform.OS === "android" ? true : false}
            />
            {fontsLoaded ? <Routes /> : <Loading />}
          </GestureHandlerRootView>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
