import { ContainerCard } from "./styles";

interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return <ContainerCard>{children}</ContainerCard>;
};
