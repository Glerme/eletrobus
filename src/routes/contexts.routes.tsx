import { AuthContextProvider } from "~/contexts/AuthContext";
import { LocationContextProvider } from "~/contexts/LocationContext";

interface ContextsProps {
  children: React.ReactNode;
}

export const Contexts = ({ children }: ContextsProps) => {
  return (
    <>
      <AuthContextProvider>{children}</AuthContextProvider>
    </>
  );
};
