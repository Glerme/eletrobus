import { MaterialIcons } from "@expo/vector-icons";

import { Container } from "./styles";

interface MyLocationButtonProps {
  getCurrentPosition: () => void;
}

export const MyLocationButton = ({
  getCurrentPosition,
}: MyLocationButtonProps) => {
  return (
    <Container onPress={getCurrentPosition}>
      <MaterialIcons name="my-location" size={24} color={"#fff"} />
    </Container>
  );
};
