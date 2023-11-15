import { TouchableNativeFeedback } from "react-native";

import { Box, HStack, Text } from "native-base";

import { RoutesProps } from "~/interfaces/Routes.interface";

interface ListRoutesProps {
  route: RoutesProps;
  disabled?: boolean;
  onPress: () => void;
}

export const ListRoutes = ({
  route,
  onPress,
  disabled,
  ...rest
}: ListRoutesProps) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#d4d4d4", false)}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      <Box
        borderBottomWidth="1"
        background="transparent"
        _dark={{
          borderColor: "muted.50",
        }}
        borderColor="primary.200"
        py="2"
        px="2"
      >
        <HStack py="2" justifyContent={"space-between"}>
          <HStack space={4} alignItems={"center"}>
            <Text color="coolGray.600" fontSize={"sm"} fontWeight={"500"}>
              {route?.name ?? "Rota não encontrada"}
            </Text>
          </HStack>
        </HStack>
      </Box>
    </TouchableNativeFeedback>
  );
};
