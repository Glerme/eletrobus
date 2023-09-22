import { TouchableNativeFeedback } from "react-native";

import { Box, HStack, Text } from "native-base";

import { BusStopInterface } from "~/interfaces/BusStop.interface";

interface ListRoutesProps {
  route: BusStopInterface;
  onPress: () => void;
}

export const ListRoutes = ({ route, onPress, ...rest }: ListRoutesProps) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#d4d4d4", false)}
      onPress={onPress}
      {...rest}
    >
      <Box
        borderBottomWidth="1"
        background="transparent"
        _dark={{
          borderColor: "muted.50",
        }}
        borderColor="muted.200"
        py="2"
        px="2"
      >
        <HStack py="2" justifyContent={"space-between"}>
          <HStack space={4} alignItems={"center"}>
            <Text color="coolGray.600" fontSize={"sm"} fontWeight={"500"}>
              {route?.name}
            </Text>
          </HStack>
        </HStack>
      </Box>
    </TouchableNativeFeedback>
  );
};
