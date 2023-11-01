import { memo } from "react";

import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from "react-native";

import { Box, HStack, Skeleton, Text } from "native-base";

import { CourseProps } from "~/interfaces/Course.interface";

interface ListCoursesProps extends TouchableNativeFeedbackProps {
  item?: CourseProps;
  onPress?: () => void;
  isLoading?: boolean;
}

export const ListCourses = memo(
  ({ item, onPress, isLoading, ...rest }: ListCoursesProps) => {
    console.log(item);
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
              <Text color="coolGray.600" fontSize={"sm"} fontWeight={"500"}>
                {item?.route.name}
              </Text>
            </HStack>

            <HStack alignItems="center" space="1">
              <Text>Initial: {item?.initial_hour} </Text>
              <Text>Final: {item?.final_hour}</Text>
            </HStack>
          </HStack>
        </Box>
      </TouchableNativeFeedback>
    );
  }
);
