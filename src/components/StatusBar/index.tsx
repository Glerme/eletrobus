import {
  StatusBar as ExpoStatusBar,
  StatusBarProps as ExpoStatusBarProps,
} from "expo-status-bar";
import { Platform } from "react-native";

import { StatusBarBackground } from "./style";

interface StatusBarProps extends ExpoStatusBarProps {
  backgroundIos?: string;
}

export const StatusBar = ({ backgroundIos, ...rest }: StatusBarProps) => {
  return Platform.OS === "android" ? (
    <ExpoStatusBar
      backgroundColor={"transparent"}
      style={"light"}
      translucent
      animated
      {...rest}
    />
  ) : (
    <StatusBarBackground backgroundIos={backgroundIos}>
      <ExpoStatusBar style={"light"} animated {...rest} />
    </StatusBarBackground>
  );
};
