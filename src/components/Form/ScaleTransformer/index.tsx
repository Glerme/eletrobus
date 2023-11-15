import { Box } from "native-base";

export const ScaleTransformer = ({
  isPressed,
  children,
}: {
  isPressed: boolean;
  children: React.ReactNode;
}) => {
  const scale = isPressed ? 0.8 : 1;

  return (
    <Box
      p={2}
      style={{
        transform: [{ scale }],
      }}
    >
      {children}
    </Box>
  );
};
