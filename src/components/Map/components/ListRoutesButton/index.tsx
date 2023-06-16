import { MaterialIcons } from "@expo/vector-icons";

import { Container } from "./styles";

interface ListRoutesButtonProps {}

export const ListRoutesButton = ({}: ListRoutesButtonProps) => {
  return (
    <Container onPress={() => {}}>
      <MaterialIcons name="menu" size={24} color={"#fff"} />
    </Container>
  );
};
