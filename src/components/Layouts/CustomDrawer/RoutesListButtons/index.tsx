import {
  DrawerContentComponentProps,
  DrawerItem,
} from "@react-navigation/drawer";
import { Box, Flex, Text } from "native-base";

import { HouseSimple } from "phosphor-react-native";

import { THEME } from "~/styles/theme";

interface RoutesListButtonsProps extends DrawerContentComponentProps {}

export const RoutesListButtons = (props: RoutesListButtonsProps) => {
  const routes = ["Home"];

  const Icon = (route: string) => {
    switch (route) {
      case "Home":
        return <HouseSimple />;
    }
  };

  const parsedLabelRoutes = (route: string) => {
    switch (route) {
      case "Home":
        return (
          <Text ml={-5} fontWeight={"bold"}>
            Início
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
