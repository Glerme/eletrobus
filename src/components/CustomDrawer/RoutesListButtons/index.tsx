import {
  DrawerContentComponentProps,
  DrawerItem,
} from "@react-navigation/drawer";
import { Box, Flex, Text } from "native-base";

import { Gear, HouseSimple, MapPinLine, Path } from "phosphor-react-native";

import { THEME } from "~/styles/theme";

interface RoutesListButtonsProps extends DrawerContentComponentProps {}

export const RoutesListButtons = (props: RoutesListButtonsProps) => {
  const routes = ["homeTab", "mapTab", "routesTab", "settingsTab"];

  const Icon = (route: string) => {
    switch (route) {
      case "homeTab":
        return <HouseSimple />;
      case "mapTab":
        return <MapPinLine size={24} />;
      case "routesTab":
        return <Path size={24} />;
      case "settingsTab":
        return <Gear size={24} />;
    }
  };

  const parsedLabelRoutes = (route: string) => {
    switch (route) {
      case "homeTab":
        return (
          <Text ml={-5} fontWeight={"bold"}>
            Início
          </Text>
        );
      case "mapTab":
        return (
          <Text ml={-5} fontWeight={"bold"}>
            Mapa
          </Text>
        );
      case "routesTab":
        return (
          <Text ml={-5} fontWeight={"bold"}>
            Rotas
          </Text>
        );
      case "settingsTab":
        return (
          <Text ml={-5} fontWeight={"bold"}>
            Configurações
          </Text>
        );
    }
  };

  return (
    <Box>
      {routes.map((route) => (
        <Flex key={route}>
          <DrawerItem
            {...props}
            key={route}
            label={() => parsedLabelRoutes(route)}
            onPress={() => props.navigation.navigate(route)}
            icon={() => Icon(route)}
            inactiveTintColor={THEME.colors.gray["700"]}
            activeTintColor={THEME.colors.primary["500"]}
          />
        </Flex>
      ))}
    </Box>
  );
};
