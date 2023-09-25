import { Alert as NBAlert, Text } from "native-base";

interface AlertProps {
  status?: "error" | "success" | "warning" | "info";
  text?: string;
}

export const Alert = ({ text, status = "error" }: AlertProps) => {
  return (
    <NBAlert colorScheme={status} status={status}>
      <NBAlert.Icon size={22} />
      <Text fontSize="md" fontWeight="medium" color="coolGray.800">
        {text ??
          "Erro ao carregar os dados, por favor tente novamente mais tarde."}
      </Text>
    </NBAlert>
  );
};
