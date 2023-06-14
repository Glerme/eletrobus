import { ScreenContentContainer } from "./styles";

interface ScreenContentProps {
  children: React.ReactNode;
}

export const ScreenContent = ({ children }: ScreenContentProps) => {
  return <ScreenContentContainer>{children}</ScreenContentContainer>;
};
