import { memo } from "react";

import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from "react-native";

import { Avatar, Box, HStack, Skeleton, Text } from "native-base";

import { BusStopProps } from "~/interfaces/BusStop.interface";
import { RouteInterface } from "~/interfaces/Route.interface";

import { StatusInfo } from "../BusStatus/StatusInfo";
import { FavoriteButton } from "../Form/FavoriteButton";

interface ListBusStopsProps extends TouchableNativeFeedbackProps {
  item?: BusStopProps;
  onPress?: () => void;
  isLoading?: boolean;
}

export const ListBusStops = memo(
  ({ item, onPress, isLoading, ...rest }: ListBusStopsProps) => {
    return isLoading ? (
      <TouchableNativeFeedback disabled {...rest}>
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
              <Skeleton endColor="primary.50" size="50px" rounded="full" />

              <Skeleton endColor="primary.50" h={5} />
            </HStack>
          </HStack>
        </Box>
      </TouchableNativeFeedback>
    ) : (
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
                {item?.name}
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
  }
);