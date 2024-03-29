import { memo } from "react";

import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from "react-native";

import { Box, HStack, Skeleton, Text } from "native-base";

import { CourseProps } from "~/interfaces/Course.interface";
import { FavoriteCourseProps } from "~/interfaces/FavoriteCourse.interface";

interface ListCoursesProps extends TouchableNativeFeedbackProps {
  item?: CourseProps | FavoriteCourseProps | any;
  onPress?: () => void;
  isLoading?: boolean;
}

export const ListCourses = memo(
  ({ item, onPress, isLoading, ...rest }: ListCoursesProps) => {
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
                {item.name ? item?.name : item?.route.name}
              </Text>
            </HStack>
          </HStack>
        </Box>
      </TouchableNativeFeedback>
    );
  }
);
