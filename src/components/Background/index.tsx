import { Container, Content, BackgroundHeader } from "./styles";

interface BackgroundProps {
  children: React.ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return (
    <Container>
      <BackgroundHeader colors={["#0DAC86", "#0DAC87"]} />
      <Content>{children}</Content>
    </Container>
  );
};
