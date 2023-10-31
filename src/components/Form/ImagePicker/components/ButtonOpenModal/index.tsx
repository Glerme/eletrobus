import { ImageSourcePropType, TouchableOpacity } from "react-native";

import { Avatar, Box, Icon, Skeleton, VStack } from "native-base";

import { PencilSimple } from "phosphor-react-native";

import { THEME } from "~/styles/theme";

interface ButtonOpenModalProps {
  handleOpenModal: () => void;
  avatarUrl: ImageSourcePropType;
  isLoading?: boolean;
}

export const ButtonOpenModal = ({
  avatarUrl,
  handleOpenModal,
  isLoading,
}: ButtonOpenModalProps) => {
  return (
    <Box w={"100%"} display={"flex"} alignItems={"center"}>
      <TouchableOpacity onPress={handleOpenModal} disabled={isLoading}>
        <VStack space="5">
          {isLoading ? (
            <Skeleton endColor="primary.500" size="32" rounded="full" />
          ) : (
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
          )}
        </VStack>
      </TouchableOpacity>
    </Box>
  );
};
