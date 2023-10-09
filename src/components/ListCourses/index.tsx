import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from "react-native";

import { Box, HStack, Text } from "native-base";

import { CourseProps } from "~/interfaces/Course.interface";

interface IProps extends TouchableNativeFeedbackProps {
  item: CourseProps;
  onPress: () => void;
}

export const ListCourses = ({ item, onPress, ...rest }: IProps) => {
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
              {item.vehicle_id}
            </Text>
          </HStack>

          <HStack alignItems="center" space="1">
            <Text>Initial: {item?.initial_hour}</Text>
            <Text>Final: {item?.final_hour}</Text>
          </HStack>
        </HStack>
      </Box>
    </TouchableNativeFeedback>
  );
};
