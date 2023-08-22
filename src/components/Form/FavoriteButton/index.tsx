import { Box, Pressable } from "native-base";

import { Star } from "phosphor-react-native";

interface FavoriteButtonProps {
  favorite: boolean;
  handlePress: () => void;
  disabled?: boolean;
  size?: number;
}

export const FavoriteButton = ({
  favorite,
  handlePress,
  disabled,
  size = 22,
}: FavoriteButtonProps) => {
  return (
    <Pressable zIndex={1} onPress={handlePress} disabled={disabled}>
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
              size={size}
              weight="fill"
              color={favorite ? "#E9C25F" : "#9C9C9C"}
            />
          </Box>
        );
      }}
    </Pressable>
  );
};
