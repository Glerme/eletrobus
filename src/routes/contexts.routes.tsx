import { LocationContextProvider } from "~/contexts/LocationContext";

interface ContextsProps {
  children: React.ReactNode;
}

export const Contexts = ({ children }: ContextsProps) => {
  return <LocationContextProvider>{children}</LocationContextProvider>;
};
