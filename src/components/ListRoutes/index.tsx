import { TouchableNativeFeedback } from "react-native";

import { Box, HStack, Text, VStack } from "native-base";

import { RoutesProps } from "~/interfaces/Routes.interface";
import { formatDatetime } from "~/utils/format";

interface ListRoutesProps {
  route: RoutesProps;
  disabled?: boolean;
  onPress: () => void;
}

export const ListRoutes = ({
  route,
  onPress,
  disabled,
  ...rest
}: ListRoutesProps) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#d4d4d4", false)}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      <Box
        borderBottomWidth="1"
        background="transparent"
        _dark={{
          borderColor: "muted.50",
        }}
        borderColor="primary.200"
        py="2"
        px="2"
      >
        <HStack py="2" justifyContent={"space-between"}>
          <VStack>
            <Text color="primary.500" fontSize={"lg"} fontWeight={"bold"}>
              {route?.name ?? "Rota não encontrada"}
            </Text>

            <VStack mt={1}>
              <Text color="coolGray.600" fontSize={"sm"} fontWeight={"bold"}>
                Horários
              </Text>

              {route?.course?.map((course, i) => (
                <VStack key={i}>
                  <Text
                    color="coolGray.600"
                    fontSize={"sm"}
                    fontWeight={"bold"}
                  >
                    Hora inicial:{" "}
                    {formatDatetime(new Date(course?.initial_hour))}
                  </Text>

                  <Text
                    color="coolGray.600"
                    fontSize={"sm"}
                    fontWeight={"bold"}
                  >
                    Hora final: {formatDatetime(new Date(course?.final_hour))}
                  </Text>
                </VStack>
              ))}
            </VStack>
          </VStack>
        </HStack>
      </Box>
    </TouchableNativeFeedback>
  );
};
