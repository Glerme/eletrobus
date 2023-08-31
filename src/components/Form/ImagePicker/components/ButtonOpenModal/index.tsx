import { ImageSourcePropType, TouchableOpacity } from "react-native";

import { Avatar, Box, Icon, VStack } from "native-base";

import { PencilSimple } from "phosphor-react-native";

import { THEME } from "~/styles/theme";

interface ButtonOpenModalProps {
  handleOpenModal: () => void;
  avatarUrl: ImageSourcePropType;
}

export const ButtonOpenModal = ({
  avatarUrl,
  handleOpenModal,
}: ButtonOpenModalProps) => {
  return (
    <Box w={"100%"} display={"flex"} alignItems={"center"}>
      <TouchableOpacity onPress={handleOpenModal}>
        <VStack space="5">
          <Avatar bg="lightBlue.400" source={avatarUrl} size="2xl">
            <Avatar.Badge
              bg="primary.500"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              size={"10"}
            >
              <Icon
                as={<PencilSimple size={22} color={THEME.colors.white} />}
              />
            </Avatar.Badge>
          </Avatar>
        </VStack>
      </TouchableOpacity>
    </Box>
  );
};
