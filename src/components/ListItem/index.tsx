import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from "react-native";

import { Avatar, Box, HStack, Text } from "native-base";

import { BusStopProps } from "~/interfaces/BusStop.interface";
import { RouteInterface } from "~/interfaces/Route.interface";

import { StatusInfo } from "../BusStatus/StatusInfo";
import { FavoriteButton } from "../Form/FavoriteButton";

interface IProps extends TouchableNativeFeedbackProps {
  item: BusStopProps;
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
          <HStack space={4} alignItems={"center"}>
            <Avatar
              source={{
                uri: item?.images[0] ?? "",
              }}
              size={"md"}
            />

            {/* <FavoriteButton
                favorite={item.favorite}
                handlePress={() => {}}
                size={14}
                disabled
              /> */}

            <Text color="coolGray.600" fontSize={"sm"} fontWeight={"500"}>
              {item.name}
            </Text>
          </HStack>

          {/* {item?.status && (
            <HStack alignItems="center" space="1">
              <StatusInfo statusCorrida={item.status} />
            </HStack>
          )} */}
        </HStack>
      </Box>
    </TouchableNativeFeedback>
  );
};
