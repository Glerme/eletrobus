import React from "react";
import {
  SafeAreaView as RNSafeAreaView,
  SafeAreaViewProps as RNSafeAreaViewProps,
} from "react-native-safe-area-context";

interface SafeAreaViewProps extends RNSafeAreaViewProps {
  children: React.ReactNode;
}

export const SafeAreaView = ({ children, ...rest }: SafeAreaViewProps) => {
  return (
    <RNSafeAreaView style={{ flex: 1 }} {...rest}>
      {children}
    </RNSafeAreaView>
  );
};
