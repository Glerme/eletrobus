import { Box, IPressableProps, Pressable, Text } from "native-base";

import { THEME } from "~/styles/theme";

interface IProps extends IPressableProps {
  isActive?: boolean;
  item: {
    id: number;
    name: string;
  };
}

export const BoxButton = (props: IProps) => {
  return (
    <Pressable {...props}>
      {({ isPressed }) => (
        <Box
          bg={isPressed ? "coolGray.200" : "white"}
          maxW={150}
          minW={50}
          p="2"
          rounded="8"
          borderColor={
            props.isActive ? THEME.colors.primary["500"] : "coolGray.200"
          }
          borderWidth={1}
          style={{
            margin: 2,
            transform: [
              {
                scale: isPressed ? 0.96 : 1,
              },
            ],
          }}
        >
          <Text
            color={
              props.isActive
                ? THEME.colors.primary["500"]
                : THEME.colors.gray["800"]
            }
            fontSize="sm"
          >
            {props.item?.name}
          </Text>
        </Box>
      )}
    </Pressable>
  );
};
