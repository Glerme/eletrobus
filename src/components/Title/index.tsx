import { IterfaceHeadingProps } from "native-base/lib/typescript/components/primitives/Heading/types";

import { ContainerHeading } from "./styles";

interface TitleProps extends IterfaceHeadingProps {
  children: React.ReactNode;
  bottomColor?: string;
}

export const Title = ({ children, bottomColor, ...rest }: TitleProps) => {
  return (
    <ContainerHeading {...rest} bottomColor={bottomColor}>
      {children}
    </ContainerHeading>
  );
};
