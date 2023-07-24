import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Box,
  HStack,
  Heading,
  IPressableProps,
  Pressable,
  Spacer,
  Text,
  View,
} from "native-base";
import { Star } from "phosphor-react-native";
import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from "react-native";

import { THEME } from "~/styles/theme";
import { formatDate } from "~/utils/format";
import { IRoute } from "../../interfaces/IRoute";
import { StatusInfo } from "../StatusInfo";

interface IProps extends TouchableNativeFeedbackProps {
  navigation: NativeStackNavigationProp<any>;
  item: IRoute;
}

export const ListItem = (props: IProps) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#d4d4d4", false)}
      {...props}
      onPress={() =>
        props.navigation.navigate("RouteDetails", {
          id: `${props.item?.id}`,
        })
      }
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
                color={props.item.favorite ? "#E9C25F" : "#9C9C9C"}
              />

              <Text color="coolGray.600" fontSize={"sm"} fontWeight={"500"}>
                {props.item.name}
              </Text>
            </HStack>
          </View>

          <HStack alignItems="center" space="1">
            <StatusInfo status={props.item.status} />
          </HStack>
        </HStack>
      </Box>
    </TouchableNativeFeedback>
  );
};
