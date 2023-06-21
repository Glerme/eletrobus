import { ScreenContentContainer } from "./styles";

interface ScreenContentProps {
  children: React.ReactNode;
}

export const ScreenContent = ({ children }: ScreenContentProps) => {
  return (
    <ScreenContentContainer
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScreenContentContainer>
  );
};
