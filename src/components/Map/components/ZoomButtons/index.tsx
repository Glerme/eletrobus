import { Platform } from "react-native";

import { Plus, Minus } from "phosphor-react-native";
import { Container, IconItem } from "./styles";

interface ZoomButtonsProps {
  onZoomPress: (type: "in" | "out") => void;
}

export const ZoomButtons = ({ onZoomPress }: ZoomButtonsProps) => {
  return Platform.OS === "android" ? (
    <Container space={1}>
      <IconItem
        onPress={() => onZoomPress("in")}
        _pressed={{
          background: "white",
        }}
      >
        <Plus color="white" />
      </IconItem>
      <IconItem
        onPress={() => onZoomPress("out")}
        _pressed={{
          background: "white",
        }}
      >
        <Minus color="white" />
      </IconItem>
    </Container>
  ) : (
    <></>
  );
};
