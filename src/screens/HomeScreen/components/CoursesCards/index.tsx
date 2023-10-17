import { Box, HStack, Pressable, Spacer, Text, VStack } from "native-base";
import { formatDatetime } from "~/utils/format";

interface CoursesCardsProps {
  onPressCard: () => void;
  data: {
    course_current_position: any[];
    final_hour: string;
    id: string;
    initial_hour: string;
    name: string;
  };
}

export const CoursesCards = ({ onPressCard, data }: CoursesCardsProps) => {
  return (
    <Pressable marginY={1} onPress={onPressCard}>
      {({ isPressed }: any) => {
        return (
          <Box
            minW="72"
            bg={"white"}
            p="3"
            shadow={"0"}
            rounded="8"
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
          >
            <HStack alignItems="center" mb="1">
              <HStack alignItems="center" space={1}>
                <HStack space={2} alignItems="center">
                  <Text fontSize="sm" fontWeight={"500"} color="gray.900">
                    {/* {data?.name} */}
                    {data?.id}
                  </Text>
                </HStack>
              </HStack>
            </HStack>

            <HStack alignItems="center" mb="1">
              <VStack>
                <Text fontSize="sm" fontWeight={"500"} color="gray.900">
                  Inicio: {formatDatetime(new Date(data?.initial_hour))}
                </Text>

                <Text fontSize="sm" fontWeight={"500"} color="gray.900">
                  Fim: {formatDatetime(new Date(data?.final_hour))}
                </Text>
              </VStack>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
};
