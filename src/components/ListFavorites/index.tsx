import { memo } from "react";

import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from "react-native";

import { Avatar, Box, HStack, Skeleton, Spacer, Text } from "native-base";

import { FavoriteButton } from "../Form/FavoriteButton";
import { FavoriteBusStopProps } from "~/interfaces/FavoriteBusStop.interface";

interface ListFavoritesProps extends TouchableNativeFeedbackProps {
  item?: FavoriteBusStopProps;
  onPress?: () => void;
  isLoading?: boolean;
}

export const ListFavorites = memo(
  ({ item, onPress, isLoading, ...rest }: ListFavoritesProps) => {
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
          <HStack space={4} alignItems={"center"}>
            <Avatar
              source={
                item?.bus_stop?.images
                  ? {
                      uri:
                        item?.bus_stop?.images[0] ?? item?.bus_stop?.images[1],
                    }
                  : require("~/assets/img/not-found.png")
              }
              size={"md"}
            />

            <Text color="coolGray.600" fontSize={"sm"} fontWeight={"500"}>
              {item?.bus_stop?.name}
            </Text>

            <Spacer />

            <FavoriteButton favorite={true} handlePress={() => {}} disabled />
          </HStack>
        </Box>
      </TouchableNativeFeedback>
    );
  }
);
