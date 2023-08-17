import { Box, Pressable } from "native-base";

import { Star } from "phosphor-react-native";

interface FavoriteButtonProps {
  favorite: boolean;
  handlePress: () => void;
}

export const FavoriteButton = ({
  favorite,
  handlePress,
}: FavoriteButtonProps) => {
  return (
    <Pressable zIndex={1} onPress={handlePress}>
      {({ isPressed }: any) => {
        return (
          <Box
            p={2}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.8 : 1,
                },
              ],
            }}
          >
            <Star
              size={22}
              weight="fill"
              color={favorite ? "#E9C25F" : "#9C9C9C"}
            />
          </Box>
        );
      }}
    </Pressable>
  );
};
