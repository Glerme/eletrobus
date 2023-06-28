import { Avatar, Box, IconButton, Spacer, useTheme } from "native-base";
import { ArrowLeft, List } from "phosphor-react-native";

import { THEME } from "~/styles/theme";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

interface HeaderProps extends NativeStackHeaderProps {
  openDrawer: () => void;
}

export const Header = ({
  openDrawer,
  route,
  navigation,
  options,
  back,
}: HeaderProps) => {
  console.log(
    "AQUI",
    JSON.stringify({ route, navigation, options, back }, null, 2)
  );

  const routesToHideDrawer = ["routeDetailScreen", "favoritesScreen"];

  const hideDrawer = routesToHideDrawer.includes(route.name);

  return (
    <Box
      display="flex"
      alignItems={"center"}
      p={2}
      flexDir={"row"}
      background={"#0DAC86"}
    >
      {hideDrawer ? (
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

          <Avatar
            w={"45px"}
            h={"45px"}
            source={{
              uri: "https://avatars.githubusercontent.com/u/60005589?v=4",
            }}
          />
        </>
      )}
    </Box>
  );
};
