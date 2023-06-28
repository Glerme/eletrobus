import { TouchableOpacity } from "react-native";
import { Avatar, Box, Flex, Text, View } from "native-base";

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import { SignOut } from "phosphor-react-native";

import { THEME } from "~/styles/theme";
import { RoutesListButtons } from "./RoutesListButtons";

export const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <View flex={1}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: THEME.colors.primary["500"],
        }}
      >
        <Box p={4}>
          <Avatar
            h={"80px"}
            w={"80px"}
            borderRadius={40}
            mb={2}
            source={{
              uri: "https://avatars.githubusercontent.com/u/55901431?v=4",
            }}
          />

          <Text color={THEME.colors.gray["100"]}>Jon doe</Text>
        </Box>

        <Box flex={1} background={THEME.colors.white} pt={5}>
          <RoutesListButtons {...props} />
        </Box>
      </DrawerContentScrollView>

      <Box p={2} borderTopWidth={1} borderTopColor={THEME.colors.gray["500"]}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <Flex flexDirection={"row"} alignItems={"center"}>
            <SignOut size={24} />
            <Text ml={"2"} fontSize={THEME.fontSizes["md"]} fontWeight={"bold"}>
              Sair
            </Text>
          </Flex>
        </TouchableOpacity>
      </Box>
    </View>
  );
};
