import { memo } from "react";

import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from "react-native";

import { Box, HStack, Skeleton, Text } from "native-base";

import { getColorFromState } from "~/utils/getColorFromState";
import { IStatus } from "~/interfaces/Status.interface";

interface IListStatusItem extends TouchableNativeFeedbackProps {
  item?: IStatus;
  onPress?: () => void;
  isLoading?: boolean;
}

export const ListStatusItem = memo(
  ({ item, onPress, isLoading, ...rest }: IListStatusItem) => {
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
      item && (
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
                <Box
                  height={4}
                  width={4}
                  borderRadius={100}
                  backgroundColor={`${getColorFromState(item.status)}`}
                ></Box>
                <Text color="coolGray.600" fontSize={"sm"} fontWeight={"500"}>
                  {item.status}
                </Text>
              </HStack>
            </HStack>
          </Box>
        </TouchableNativeFeedback>
      )
    );
  }
);
