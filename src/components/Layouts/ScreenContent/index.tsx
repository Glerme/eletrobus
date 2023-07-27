import { InterfaceScrollViewProps } from "native-base/lib/typescript/components/basic/ScrollView/types";
import { ScreenContentContainer } from "./styles";

interface ScreenContentProps extends InterfaceScrollViewProps {
  children: React.ReactNode;
}

export const ScreenContent = ({ children, ...rest }: ScreenContentProps) => {
  return (
    <ScreenContentContainer nestedScrollEnabled {...rest}>
      {children}
    </ScreenContentContainer>
  );
};
