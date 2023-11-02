import { List } from "phosphor-react-native";

import { ListRoutes } from "./styles";

interface ListRoutesButtonProps {
  onPressRoute: () => void;
}

export const ListRoutesButton = ({ onPressRoute }: ListRoutesButtonProps) => {
  return (
    <>
      <ListRoutes onPress={onPressRoute}>
        <List size={24} color={"#fff"} />
      </ListRoutes>
    </>
  );
};
