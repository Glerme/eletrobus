import { TouchableWithoutFeedback } from "react-native";

import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Avatar, Box, IconButton, Spacer } from "native-base";
import { ArrowLeft, List } from "phosphor-react-native";

import { ROUTES_SCREENS } from "~/constants/routes";

import { THEME } from "~/styles/theme";

interface HeaderProps extends NativeStackHeaderProps {
  openDrawer: () => void;
}

export const Header = ({ openDrawer, route, navigation }: HeaderProps) => {
  const routesToShowGoBack = [
    ROUTES_SCREENS.ROUTE_DETAILS_SCREEN,
    ROUTES_SCREENS.FAVORITES_SCREEN,
  ];

  const showGoBack = routesToShowGoBack.includes(route.name);

  return (
    <Box
      display="flex"
      alignItems={"center"}
      p={2}
      flexDir={"row"}
      background={"#0DAC86"}
    >
      {showGoBack ? (
        <>
          <IconButton
            icon={<ArrowLeft size={24} color={THEME.colors.white} />}
            onPress={() => navigation.goBack()}
          />
        </>
      ) : (
        <>
          <IconButton
            icon={<List size={24} color={THEME.colors.white} />}
            onPress={openDrawer}
          />

          <Spacer />

          <TouchableWithoutFeedback onPress={() => console.log("AQUI")}>
            <Avatar
              w={"45px"}
              h={"45px"}
              source={{
                uri: "https://avatars.githubusercontent.com/u/60005589?v=4",
              }}
            />
          </TouchableWithoutFeedback>
        </>
      )}
    </Box>
  );
};
