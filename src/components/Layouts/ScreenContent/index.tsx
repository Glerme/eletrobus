import { ScreenContentContainer } from "./styles";
import { InterfaceViewProps } from "native-base/lib/typescript/components/basic/View/types";

interface ScreenContentProps extends InterfaceViewProps {
  children: React.ReactNode;
}

export const ScreenContent = ({ children, ...rest }: ScreenContentProps) => {
  return <ScreenContentContainer {...rest}>{children}</ScreenContentContainer>;
};
