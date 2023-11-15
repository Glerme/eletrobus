import { Pressable } from "native-base";
import { Spinner, Star } from "phosphor-react-native";

import { ScaleTransformer } from "../ScaleTransformer";

interface FavoriteButtonProps {
  favorite: boolean;
  handlePress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  size?: number;
}

export const FavoriteButton = ({
  favorite,
  handlePress,
  disabled,
  isLoading,
  size = 22,
}: FavoriteButtonProps) => {
  return (
    <Pressable
      zIndex={1}
      onPress={isLoading ? undefined : handlePress}
      disabled={isLoading || disabled}
    >
      {({ isPressed }: any) => {
        return isLoading ? (
          <ScaleTransformer isPressed={isPressed}>
            <Spinner size={size} weight="fill" color={"#E9C25F"} />
          </ScaleTransformer>
        ) : (
          <ScaleTransformer isPressed={isPressed}>
            <Star
              size={size}
              weight="fill"
              color={favorite ? "#E9C25F" : "#9C9C9C"}
            />
          </ScaleTransformer>
        );
      }}
    </Pressable>
  );
};
