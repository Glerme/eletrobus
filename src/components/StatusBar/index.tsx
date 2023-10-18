import {
  StatusBar as ExpoStatusBar,
  StatusBarProps as ExpoStatusBarProps,
} from "expo-status-bar";
import { Platform } from "react-native";

import { StatusBarBackground } from "./style";

interface StatusBarProps extends ExpoStatusBarProps {
  propsIos?: any;
}

export const StatusBar = ({ propsIos, ...rest }: StatusBarProps) => {
  return Platform.OS === "android" ? (
    <ExpoStatusBar
      backgroundColor={"transparent"}
      style={"light"}
      translucent
      animated
      {...rest}
    />
  ) : (
    <StatusBarBackground {...propsIos}>
      <ExpoStatusBar style={"light"} animated {...rest} />
    </StatusBarBackground>
  );
};
