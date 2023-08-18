import { NavigationArrow } from "phosphor-react-native";

import { Container } from "./styles";

interface MyLocationButtonProps {
  getCurrentPosition: () => void;
}

export const MyLocationButton = ({
  getCurrentPosition,
}: MyLocationButtonProps) => {
  return (
    <Container onPress={getCurrentPosition}>
      <NavigationArrow size={24} color={"#fff"} />
    </Container>
  );
};
