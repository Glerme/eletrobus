import { Platform } from "react-native";

export const logOnlyOniOS = (message: string) => {
  if (Platform.OS === "ios") {
    console.log(`IOS Message: ${message}`);
  }
};
