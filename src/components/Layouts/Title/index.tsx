import { IterfaceHeadingProps } from "native-base/lib/typescript/components/primitives/Heading/types";

import { Box } from "native-base";
import { ContainerHeading, TextDetail } from "./styles";

interface TitleProps extends IterfaceHeadingProps {
  children: React.ReactNode;
  bottomColor?: string;
  bottomWidth?: string;
}

export const Title = ({
  children,
  bottomColor,
  bottomWidth,
  ...rest
}: TitleProps) => {
  return (
    <Box>
      <ContainerHeading {...rest}>{children}</ContainerHeading>
      <TextDetail bottomColor={bottomColor} bottomWidth={bottomWidth} />
    </Box>
  );
};
