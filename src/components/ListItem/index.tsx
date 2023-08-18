import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from "react-native";

import { Box, HStack, Text, View } from "native-base";

import { Star } from "phosphor-react-native";

import { StatusInfo } from "../BusStatus/StatusInfo";

import { RouteInterface } from "~/interfaces/Route.interface";

interface IProps extends TouchableNativeFeedbackProps {
  item: RouteInterface;
  onPress: () => void;
}

export const ListItem = ({ item, onPress, ...rest }: IProps) => {
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
          <View>
            <HStack space={2} alignItems={"center"}>
              <Star
                size={14}
                weight="fill"
                color={item.favorite ? "#E9C25F" : "#9C9C9C"}
              />

              <Text color="coolGray.600" fontSize={"sm"} fontWeight={"500"}>
                {item.name}
              </Text>
            </HStack>
          </View>

          {item?.status && (
            <HStack alignItems="center" space="1">
              <StatusInfo statusCorrida={item.status} />
            </HStack>
          )}
        </HStack>
      </Box>
    </TouchableNativeFeedback>
  );
};
