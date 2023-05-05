import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Routes from "./src/routes";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
