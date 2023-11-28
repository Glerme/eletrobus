import { Platform } from "react-native";

import { Plus, Minus } from "phosphor-react-native";
import { Container, IconItem } from "./styles";
import { Center, IconButton, VStack } from "native-base";

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
        variant={"solid"}
        _icon={{
          as: <Plus color="white" />,
          name: "plus",
        }}
      />
      <IconItem
        onPress={() => onZoomPress("out")}
        _pressed={{
          background: "white",
        }}
        variant={"solid"}
        _icon={{
          as: <Minus color="white" />,
          name: "minus",
        }}
      />
    </Container>
  ) : (
    <></>
  );
};
