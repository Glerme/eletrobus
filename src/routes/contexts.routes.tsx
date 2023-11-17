import { AuthContextProvider } from "~/contexts/AuthContext";

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
