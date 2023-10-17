import { Box, HStack, Pressable, Spacer, Text } from "native-base";
import { FavoriteButton } from "~/components/Form/FavoriteButton";

interface FavoritesCardsProps {
  onPressCard: () => void;
  data: {
    bus_stop_favorite: any[];
    description: string;
    id: string;
    images: string[];
    name: string;
    route_id: string | null;
  };
}

export const FavoritesCards = ({ onPressCard, data }: FavoritesCardsProps) => {
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
                    {data?.name}
                  </Text>
                </HStack>
              </HStack>

              <Spacer />
              <FavoriteButton
                favorite={data?.bus_stop_favorite?.length > 0}
                handlePress={() => {}}
                disabled
                size={18}
              />
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
};
