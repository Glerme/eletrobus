import React from "react";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

interface SafeAreaViewProps {
  children: React.ReactNode;
}

export const SafeAreaView = ({ children }: SafeAreaViewProps) => {
  return <RNSafeAreaView>{children}</RNSafeAreaView>;
};
