import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Box,
  HStack,
  Heading,
  IPressableProps,
  Pressable,
  Text,
} from "native-base";
import { Star } from "phosphor-react-native";
import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from "react-native";

import { THEME } from "~/styles/theme";

interface IProps extends TouchableNativeFeedbackProps {
  navigation: NativeStackNavigationProp<any>;
  item: {
    id: number;
    name: string;
    favorite: boolean;
  };
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
        <HStack space={2} alignItems={"center"} py="2">
          <Star
            size={14}
            weight="fill"
            color={props.item.favorite ? "#E9C25F" : "#9C9C9C"}
          />

          <Heading
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            size="sm"
          >
            {props.item.name}
          </Heading>
        </HStack>
      </Box>
    </TouchableNativeFeedback>
  );
};
