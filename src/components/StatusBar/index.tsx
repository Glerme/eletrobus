import { memo } from "react";

import {
  StatusBar as ExpoStatusBar,
  StatusBarProps as ExpoStatusBarProps,
} from "expo-status-bar";

import { View } from "native-base";
import Constants from "expo-constants";
import { Platform } from "react-native";

interface StatusBarProps extends ExpoStatusBarProps {
  backgroundIos?: string;
}

export const StatusBar = memo(({ backgroundIos, ...rest }: StatusBarProps) => {
  return (
    <>
      <ExpoStatusBar
        backgroundColor={"transparent"}
        translucent
        animated
        style={"light"}
      />
      {Platform.OS === "ios" && (
        <View paddingTop={Constants.statusBarHeight} bg={"#0DAC86"} />
      )}
    </>
  );
});
